<template>
	<el-card class="box-card">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<span>新增球迷会</span>
			<el-divider></el-divider>
			<div style="max-width: 500px">
				<el-form-item label="球迷会名称" prop="fanClubName">
					<el-input v-model="ruleForm.fanClubName" placeholder="请输入球迷会的名称"></el-input>
				</el-form-item>
				<el-form-item class="form-item" label="区域" required>
					<el-select v-model="ruleForm.fanClubRegion" placeholder="请选择">
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

				<el-form-item class="form-item" label="负责人" required>
					<el-input type="text" v-model="ruleForm.personLiable" placeholder="请输入负责人姓名"></el-input>
				</el-form-item>
				<el-form-item class="form-item" label="手机号" required>
					<el-input type="text" v-model="ruleForm.personLiablePhoneNum" placeholder="请输入负责人手机号"></el-input>
				</el-form-item>
				<el-form-item style="text-align: center">
					<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
				</el-form-item>
			</div>
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
				fanClubName: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
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
