<template>
	<el-card class="box-card">
		<el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<span>消息详情</span>
			<el-divider></el-divider>
			<div style="max-width: 900px">
				<el-form-item label="消息标题:">
					<span>{{ ruleForm.messageTitle }}</span>
				</el-form-item>
				<el-form-item label="消息内容:">
					<span>{{ ruleForm.messageContent }}</span>
				</el-form-item>
				<el-form-item class="form-item" label="推送方式:">
					<span>{{ ruleForm.pushMethod }}</span>
				</el-form-item>
				<el-form-item class="form-item" label="推送时间">
					<span>{{ ruleForm.pushTime }}</span>
				</el-form-item>
			</div>
			<p style="margin-top: 45px">推送用户列表</p>
			<el-divider></el-divider>
			<div style="display: flex; justify-content: space-between; align-items: start">
				<el-form-item class="form-item-tag" label="已选择用户">
					<el-tag type="success">推送的用户</el-tag>
					<el-tag type="success">推送的用户</el-tag>
					<el-tag type="success">推送的用户</el-tag>
					<el-tag type="success">推送的用户</el-tag>
					<el-tag type="success">推送的用户</el-tag>
					<el-tag type="success">推送的用户</el-tag>
					<el-tag type="success">推送的用户</el-tag>
				</el-form-item>
				<el-button type="primary" size="small">继续推送</el-button>
			</div>
		</el-form>
	</el-card>
</template>

<script>
export default {
	data() {
		return {
			ruleForm: {}
		};
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
.form-item-tag {
	max-width: 800px;
	::v-deep .el-tag {
		margin-right: 10px;
	}
}
</style>
