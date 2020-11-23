<template>
	<div class="goods-spec-upsert">
		<div
			class="goods-spec-upsert__item"
			v-for="(item, index) in vlist"
			:key="index"
			:class="{
				'is-error': item.error
			}"
		>
			<div class="goods-spec-upsert__item-label">
				<el-input
					size="mini"
					v-model="item.label"
					clearable
					maxlength="20"
					placeholder="规格名称（颜色）"
				></el-input>
			</div>

			<div class="goods-spec-upsert__item-list">
				<el-tag
					v-for="(child, cIndex) in item.children"
					:key="cIndex"
					size="small"
					effect="dark"
					closable
					@close="itemRemove(item, cIndex)"
					>{{ child }}</el-tag
				>

				<div class="goods-spec-upsert__item-add">
					<el-input
						size="mini"
						v-model="item.text"
						placeholder="规格属性（白色）"
						@keydown.enter.native="itemAdd(item)"
					></el-input>
					<el-button
						size="mini"
						type="success"
						:disabled="!item.text"
						@click="itemAdd(item)"
						>添加</el-button
					>
				</div>
			</div>

			<i class="el-icon-error" @click="remove(index)"></i>
		</div>

		<div class="goods-spec-upsert__append">
			<el-button size="mini" @click="append">添加规格</el-button>
			<el-button
				v-if="createBtn"
				:disabled="list.length == 0"
				size="mini"
				type="success"
				@click="onCreate"
				>立即生成</el-button
			>
		</div>
	</div>
</template>

<script>
import _ from "lodash";

export default {
	name: "goods-spec-edit",
	ref: "goods-spec-edit",
	props: ["createBtn", "value"],

	data() {
		return {
			list: []
		};
	},

	watch: {
		value: {
			immediate: true,
			handler(val) {
				this.list = _.cloneDeep(val || []);
			}
		}
	},

	computed: {
		vlist() {
			return this.list.map((e) => {
				e.error = e.error === null ? null : !e.label || e.children.length === 0;
				return e;
			});
		}
	},

	methods: {
		// 添加规格属性
		itemAdd(item) {
			if (!item.children.includes(item.text)) {
				item.children.push(item.text);
				item.text = "";
			} else {
				this.$message.warning("属性已存在");
			}
		},

		// 移除规格下属性
		itemRemove(item, index) {
			item.children.splice(index, 1);
		},

		// 移除规格
		remove(index) {
			this.$confirm("确认要移除该条规格码？", "提示", {
				type: "warning"
			})
				.then(() => {
					this.list.splice(index, 1);
				})
				.catch(() => null);
		},

		// 追加数据
		append() {
			this.list.push({
				label: "",
				value: "",
				text: "",
				children: [],
				error: null
			});
		},

		// 清空数据
		clear() {
			this.list = [];
		},

		// 输入校验，数据获取的唯一方法
		validate() {
			let pass = true;

			// if (this.list.length === 0) {
			// 	this.$message.error("商品规格不能为空");
			// 	return false;
			// }

			this.list.map((e, i) => {
				e.error = !e.label || e.children.length === 0;

				if (e.error) {
					pass = false;
				}
			});

			return pass
				? this.list.map((e, i) => {
						return {
							label: e.label,
							value: `spec_${i}`,
							children: e.children
						};
				  })
				: null;
		},

		// 内容按钮创建事件
		onCreate() {
			const d = this.validate();

			if (d) {
				this.$message.success("生成成功");
				this.$emit("create", d);
			} else {
				this.$message.warning("请填写完整");
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.goods-spec-upsert {
	&__item {
		display: inline-block;
		border: 1px solid #eee;
		padding: 5px 10px;
		margin: 0 10px 10px 0;
		border-radius: 3px;
		position: relative;

		&-label {
			.el-input {
				width: 150px;
			}
		}

		&-list {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			margin-top: 5px;

			.el-tag {
				margin: 5px 10px 5px 0;
			}
		}

		&-add {
			.el-input {
				width: 160px;
			}

			.el-button {
				margin-left: 5px;
			}
		}

		.el-icon-error {
			display: none;
			position: absolute;
			right: 5px;
			top: 5px;
			font-size: 18px;
			color: #f56c6c;
			cursor: pointer;
		}

		&:hover {
			.el-icon-error {
				display: inline;
			}
		}

		&.is-append {
			border-style: dashed;
		}

		&.is-error {
			border-color: #f56c6c;
		}
	}

	&__append {
	}
}
</style>
