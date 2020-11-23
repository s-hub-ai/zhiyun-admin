<template>
	<div class="cl-upload__wrap">
		<!-- 文件空间 -->
		<cl-upload-space ref="space" :accept="accept" :limit="limit" @confirm="onSpaceConfirm" v-if="isSpace">
			<slot></slot>
		</cl-upload-space>

		<!-- 默认上传 -->
		<div
			v-else
			class="cl-upload"
			:class="[
				`cl-upload--${listType}`,
				{
					'is-multiple': multiple
				}
			]"
		>
			<!-- 默认 -->
			<el-input class="cl-upload__hidden" type="hidden" v-model="value"></el-input>

			<el-upload
				action=""
				:accept="_accept"
				:multiple="multiple"
				:limit="limit"
				:data="data"
				:name="name"
				:drag="drag"
				:list-type="listType"
				:file-list="fileList"
				:show-file-list="_showFileList"
				:auto-upload="autoUpload"
				:disabled="disabled"
				:headers="{
					Authorization: token,
					...headers
				}"
				:http-request="
					(e) => {
						httpRequest(e);
					}
				"
				:on-remove="_onRemove"
				:on-preview="onPreview"
				:on-success="onSuccess"
				:on-error="onError"
				:on-progress="onProgress"
				:on-change="onChange"
				:on-exceed="onExceed"
				:before-upload="beforeUpload"
				:before-remove="beforeRemove"
				:style="_style"
				v-loading="_loading"
			>
				<slot>
					<template v-if="listType == 'picture-card'">
						<i :class="['cl-upload__icon', icon]"></i>
						<span class="cl-upload__text" v-if="text">{{ text }}</span>
					</template>

					<template v-else-if="listType == 'file'">
						<el-button size="mini" type="primary" :loading="loading">点击上传</el-button>
					</template>

					<template v-else>
						<div class="cl-upload__cover" v-if="_urls[0]">
							<img v-if="_urls[0].type == 'image'" :src="_urls[0].url" />

							<span v-else>{{ _urls[0].name }}</span>
						</div>

						<template v-else>
							<i :class="['cl-upload__icon', icon]"></i>
							<span class="cl-upload__text" v-if="text">{{ text }}</span>
						</template>
					</template>
				</slot>
			</el-upload>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';

export default {
	props: {
		value: [Array, String],
		size: {
			type: [Array, String, Number],
			default: '128px'
		},
		icon: {
			type: String,
			default: 'el-icon-upload'
		},
		text: {
			type: String,
			default: '选择文件'
		},
		accept: String,
		multiple: Boolean,
		limit: Number,
		data: Object,
		isSpace: Boolean,
		name: {
			type: String,
			default: 'file'
		},
		drag: Boolean,
		listType: {
			type: String,
			default: 'default'
		},
		showFileList: Boolean,
		autoUpload: {
			type: Boolean,
			default: true
		},
		disabled: Boolean,
		headers: Object,
		onRemove: Function,
		onPreview: Function,
		onSuccess: Function,
		onError: Function,
		onProgress: Function,
		onChange: Function,
		onExceed: Function,
		beforeUpload: Function,
		beforeRemove: Function
	},

	data() {
		return {
			fileList: [],
			urls: [],
			loading: false
		};
	},

	computed: {
		...mapGetters(['token']),

		_showFileList() {
			switch (this.listType) {
				case 'picture-card':
				case 'file':
					return true;
				default:
					return false;
			}
		},

		_accept() {
			switch (this.listType) {
				case 'picture-card':
					return 'image/*';
				default:
					return '*';
			}
		},

		_loading() {
			return this.listType == 'default' ? this.loading : false;
		},

		_urls() {
			const format = {
				image: ['bmp', 'jpg', 'png', 'tif', 'gif', 'svg']
			};

			return this.urls.map((e) => {
				let arr = e.url.split('.');
				let suf = _.last(arr);
				e.type = format.image.includes(suf) ? 'image' : 'image';
				return e;
			});
		},

		_style() {
			let arr = [];

			if (_.isArray(this.size)) {
				arr = this.size;
			} else {
				arr = [this.size, this.size];
			}

			const [height, width] = arr.map((e) => (_.isNumber(e) ? `${e}px` : e));

			return this.listType == 'default'
				? {
						height,
						width
				  }
				: {};
		}
	},

	watch: {
		value: {
			immediate: true,
			handler: 'parseValue'
		}
	},

	methods: {
		// 解析参数
		parseValue(value) {
			let list = [];

			if (this.multiple) {
				if (value instanceof Array) {
					list = value;
				} else {
					list = (value || '').split(',');
				}
			} else {
				if (value) {
					list = [value];
				}
			}

			// 比较数据，避免重复动画
			if (list.join(',') !== this.urls.map((e) => e.url).join(',')) {
				this.fileList = list.filter(Boolean).map((url) => {
					return {
						url,
						uid: url
					};
				});

				// 设置 URLS
				this.urls = _.clone(this.fileList);
				console.log(this.urls);
			}
		},

		// 返回事件
		emit() {
			const urls = this.urls
				.map((e) => e.url)
				.filter(Boolean)
				.join(',');

			this.$emit('input', urls);
			this.$emit('change', urls);
		},

		// 移除文件
		_onRemove(file, fileList) {
			this.urls = this.urls.filter((e) => e.uid != file.uid);
			this.emit();

			// 移除文件钩子
			if (this.onRemove) {
				this.onRemove(file, this.urls);
			}
		},

		// 重设上传请求
		httpRequest(req) {
			this.loading = true;

			this.$service.common
				.ossUpload(req.file)
				.then((url) => {
					const data = {
						url,
						name: req.file.name,
						uid: req.file.uid
					};

					if (this.multiple) {
						this.urls.push(data);
					} else {
						this.urls = [data];
					}

					this.emit();

					// 上传成功钩子
					if (this.onSuccess) {
						this.onSuccess(url, req.file, this.urls);
					}
				})
				.catch((err) => {
					console.error('upload error', err);
					this.$message.error(err);

					// 上传失败钩子
					if (this.onError) {
						this.onError(err, req.file);
					}
				})
				.done(() => {
					this.loading = false;
				});
		},

		// 打开文件空间
		openSpace() {
			this.$refs['space'].open();
		},

		// 确认图片
		onSpaceConfirm(urls) {
			this.$emit('input', urls);
			this.$emit('change', urls);
		}
	}
};
</script>

<style lang="scss" scoped>
.cl-upload {
	display: flex;
	flex-wrap: wrap;

	&__hidden {
		height: 0;
		width: 0;
	}

	&.is-multiple {
		.cl-upload__wrap {
			margin-right: 10px;
		}
	}

	&--default {
		::v-deep.el-upload {
			display: flex;
			align-items: center;
			justify-content: center;
			border: 1px dashed #d9d9d9;
			border-radius: 6px;
			cursor: pointer;
			position: relative;
			overflow: hidden;
			height: 100%;

			&:hover {
				border-color: #409eff;
			}

			.cl-upload__cover {
				img {
					display: block;
					height: 100%;
					width: 100%;
				}
			}

			i {
				font-size: 28px;
				color: #8c939d;
			}
		}
	}

	&--picture-card {
		::v-deep.el-upload {
			.cl-upload__icon {
				position: relative;
				top: 4px;
			}
		}
	}

	&__icon + span {
		margin-left: 5px;
	}

	&__text {
		font-size: 14px;
	}
}
</style>
