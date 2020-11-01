<template>
	<el-card class="box-card">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<span>新增消息</span>
			<el-divider></el-divider>
			<div style="max-width: 900px">
				<el-form-item label="消息标题" prop="messageTitle">
					<el-input v-model="ruleForm.messageTitle" placeholder="请输入消息标题" maxlength="50" show-word-limit></el-input>
				</el-form-item>
				<el-form-item label="消息内容" prop="messageContent">
					<el-input type="textarea" rows="5" v-model="ruleForm.messageContent" placeholder="" maxlength="800" show-word-limit></el-input>
				</el-form-item>
				<el-form-item class="form-item" label="推送方式" prop="pushMethod">
					<el-select v-model="ruleForm.pushMethod" placeholder="请选择">
						<el-option
							v-for="item in [
								{ value: 1, text: '站内信' },
								{ value: 2, text: '短信' }
							]"
							:key="item.value"
							:label="item.text"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item class="form-item" label="推送时间" required>
					<el-date-picker v-model="ruleForm.pushTime" type="datetime" placeholder="选择日期时间"> </el-date-picker>
				</el-form-item>
			</div>
			<p style="margin-top: 45px">选择用户</p>
			<el-divider></el-divider>
			<el-form-item class="form-item" label="用户类型">
				<el-select v-model="ruleForm.pushMethod" placeholder="请选择">
					<el-option
						v-for="item in [
							{ value: 1, text: '站内信' },
							{ value: 2, text: '短信' }
						]"
						:key="item.value"
						:label="item.text"
						:value="item.value"
					>
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item style="max-width: 900px; text-align: center">
				<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
export default {
	data() {
		return {
			ruleForm: {
				name: '',
				region: '',
				date1: '',
				date2: '',
				delivery: false,
				type: [],
				resource: '',
				desc: ''
			},
			rules: {
				messageTitle: [
					{ required: true, message: '请输入活动名称', trigger: 'blur' },
					{ min: 1, max: 50, message: '长度在 1 到 5 个字符', trigger: 'blur' }
				],
				pushMethod: [{ required: true, message: '请选择推送方式', trigger: 'change' }],
				messageContent: [{ required: true, message: '请填写消息内容', trigger: 'blur' }]
			}
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
</style>
