<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		<div style="max-width: 900px">
			<el-form-item label="客服二维码" prop="qrCode">
				<cl-upload :value="ruleForm.qrCode" :filePath="ruleForm.qrCode" class="avatar-uploader" :size="[150, 150]" icon="el-icon-plus" accept="*" :on-success="qrCodeUploadSuccess"></cl-upload>
				<span style="color: #909399">注：限上传一张,建议图片大小150*150</span>
			</el-form-item>
			<el-form-item label="咨询文案" prop="consultText">
				<el-input type="textarea" placeholder="请输入内容" :rows="6" v-model="ruleForm.consultText" maxlength="800" show-word-limit> </el-input>
			</el-form-item>

			<el-form-item label="状态">
				<el-switch
					size="large"
					active-text="启用"
					inactive-text="停用"
					v-model="ruleForm.enableStatus"
					:active-value="1"
					:inactive-value="0"
					active-color="#13ce66"
					inactive-color="#ff4949"
				></el-switch
			></el-form-item>
			<el-form-item style="text-align: center">
				<el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</div>
	</el-form>
</template>

<script>
export default {
	data() {
		return {
			ruleForm: {
				qrCode: '',
				cusultText: '',
				enableStatus: 0
			},
			rules: {
				qrCode: [{ required: true, message: '请上传客服二维码', trigger: 'blur' }],
				cusultText: [{ required: true, message: '请输入咨询文案', trigger: 'blur' }]
			}
		};
	},
	methods: {
		qrCodeUploadSuccess(res) {
			if (res) {
				this.ruleForm.qrCode = res;
			}
		},
		async getEditInfo(id) {
			try {
				let res = await this.$service.app.consult.info({ id });
				this.ruleForm = res;
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
						await this.$service.app.consult.add(params);

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
