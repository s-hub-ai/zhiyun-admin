<template>
	<el-card class="box-card">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<span>{{ id == null ? '新增客服咨询' : '编辑客服咨询' }}</span>
			<el-divider></el-divider>
			<div style="max-width: 900px">
				<el-form-item label="客服二维码" required>
					<cl-upload :value="ruleForm.qrCode" :filePath="ruleForm.qrCode" class="avatar-uploader" :size="[150, 150]" icon="el-icon-plus" accept="*" :on-success="qrCodeUploadSuccess"></cl-upload>
					<span style="color: #909399">注：限上传一张,建议图片大小150*150</span>
				</el-form-item>
				<el-form-item label="咨询文案" required>
					<el-input type="textarea" placeholder="请输入内容" :rows="6" v-model="ruleForm.consultText" maxlength="800" show-word-limit> </el-input>
				</el-form-item>

				<el-form-item label="状态">
					<el-switch
						size="large"
						active-text="启用"
						inactive-text="停用"
						v-model="ruleForm.startStatus"
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
	</el-card>
</template>

<script>
export default {
	computed: {
		id() {
			return this.$route.query.id;
		}
	},
	data() {
		return {
			ruleForm: {
				sort: 1,
				startStatus: 0
			},
			rules: {
				bannerName: [{ required: true, message: '请输入轮播图名称', trigger: 'blur' }]
			}
		};
	},
	methods: {
		qrCodeUploadSuccess() {}
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
