<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		<h3>活动信息</h3>
		<el-form-item label="活动封面">
			<cl-upload :value="ruleForm.commodityCover" class="avatar-uploader" :size="[150, 150]" icon="el-icon-plus" accept="*" :on-success="commodityCoverUploadSuccess"></cl-upload>
		</el-form-item>
	</el-form>
</template>

<script>
export default {
	data() {
		return {
			ruleForm: {}
		};
	},
	methods: {}
};
</script>

<style></style>
