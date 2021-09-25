<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		<div style="max-width: 900px">
			<el-form-item label="名称" prop="bannerName">
				<el-input v-model="ruleForm.bannerName" placeholder="请输入轮播图名称"></el-input>
			</el-form-item>
			<el-form-item label="位置" prop="bannerShowLocation">
				<el-select v-model="ruleForm.bannerShowLocation" placeholder="请选择">
					<el-option
						v-for="item in [
							{ value: 1, text: '首页' },
							{ value: 2, text: '商城' },
							{ value: 3, text: '球票' }
						]"
						:key="item.value"
						:label="item.text"
						:value="item.value"
					>
					</el-option>
				</el-select>
			</el-form-item>
			<div style="display: flex">
				<el-form-item class="form-item" label="URL">
					<el-select v-model="ruleForm.bannerLinkType" placeholder="请选择">
						<el-option
							v-for="item in [
								{ value: 1, text: '内部链接' },
								{ value: 2, text: '外部链接' }
							]"
							:key="item.value"
							:label="item.text"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item class="form-item" label-width="10px">
					<el-input v-model="ruleForm.bannerLinkUrl" placeholder="请填写链接地址">
						<!--<template slot="prepend">https://</template>-->
					</el-input>
				</el-form-item>
			</div>
			<el-form-item label="图片" prop="bannerImg">
				<cl-upload
					:value="ruleForm.bannerImg"
					:filePath="ruleForm.bannerImg"
					class="avatar-uploader"
					:size="[150, 350]"
					icon="el-icon-plus"
					accept="*"
					:on-success="bannerImgUploadSuccess"
				></cl-upload>
				<span style="color: #909399">注：限上传一张,建议图片大小350*150</span>
			</el-form-item>
			<el-form-item label="排序" prop="sort" required>
				<el-input-number v-model="ruleForm.sort" :min="1"></el-input-number>
				<span style="color: #909399; padding-left: 10px">注：数字越小,轮播图越靠前</span></el-form-item
			>
			<el-form-item label="状态" required>
				<el-radio-group v-model="ruleForm.enableStatus">
					<el-radio :label="0">关闭</el-radio>
					<el-radio :label="1">开启</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item style="text-align: center">
				<el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</div>
	</el-form>
</template>

<script>
export default {
	computed: {},
	data() {
		return {
			ruleForm: {
				bannerName: '',
				bannerShowLocation: '',
				bannerLinkType: 1,
				bannerLinkUrl: '',
				bannerImg: '',
				enableStatus: 0,
				sort: 1
			},
			rules: {
				bannerName: [{ required: true, message: '请输入轮播图名称', trigger: 'blur' }],
				bannerShowLocation: [{ required: true, message: '请选择轮播图位置', trigger: 'change' }],
				bannerImg: [{ required: true, message: '请上传轮播图图片', trigger: 'blur' }]
			}
		};
	},
	methods: {
		async getEditInfo(id) {
			try {
				let res = await this.$service.app.carousel.info({ id });
				this.ruleForm = res;
				this.enableStatus = res.enableStatus;
			} catch (error) {
				this.$message.error(error);
			}
		},
		//
		submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					try {
						let params = {
							...this.ruleForm
							
						};
						if (params.id) {
							await this.$service.app.carousel.update(params);
						} else {
							await this.$service.app.carousel.add(params);
						}

						this.$emit('update:addDialogShow', false);
					} catch (error) {
						this.$message.error(error);
					}
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		bannerImgUploadSuccess(res) {
			if (res) {
				this.ruleForm.bannerImg = res;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.box-card {
	overflow-y: auto;
}
.form-item {
	::v-deep .el-input {
		min-width: 300px;
	}
}
</style>
