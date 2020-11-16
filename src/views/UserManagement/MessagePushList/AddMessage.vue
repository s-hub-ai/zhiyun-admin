<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
			<el-form-item class="form-item" label="推送时间" prop="pushTime">
				<el-date-picker v-model="ruleForm.pushTime" type="datetime" placeholder="选择日期时间"> </el-date-picker>
			</el-form-item>
		</div>
		<p style="margin-top: 45px">选择用户</p>
		<el-divider></el-divider>
		<el-form-item label="选择用户" prop="userType">
			<el-select v-model="ruleForm.userType" placeholder="请选择" @change="userTypeChange">
				<el-option label="全部" :value="0"></el-option>
				<el-option label="指定用户" :value="1"></el-option>
				<el-option label="分组用户" :value="2"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item v-if="ruleForm.userType == 1">
			<el-transfer filterable filter-placeholder="请输入用户手机号" :titles="['用户列表', '已选用户']" v-model="ruleForm.userArgs" :data="userList"> </el-transfer>
		</el-form-item>
		<div v-if="ruleForm.userType == 2">
			<el-form-item label="实名状态">
				<el-select v-model="userArgs.userCertification" placeholder="请选择">
					<el-option v-for="(item, index) in useCcertificationDict" :key="index" :label="item.text" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="球迷会">
				<el-select v-model="userArgs.fanClubId" placeholder="请选择">
					<el-option label="非实名用户" :value="0"></el-option>
					<el-option label="实名用户" :value="1"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="套票类型">
				<el-select v-model="userArgs.ticketPackageUser" placeholder="请选择">
					<el-option v-for="(item, index) in ticketPackageUserDict" :key="index" :label="item.text" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="会员等级">
				<el-select v-model="userArgs.vipLevel" placeholder="请选择">
					<el-option v-for="(item, index) in vipLevelDict" :key="index" :label="item.text" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="支云卡状态">
				<el-select v-model="userArgs.zhiyunCardStatus" placeholder="请选择">
					<el-option v-for="(item, index) in zhiyunCardStatusDict" :key="index" :label="item.text" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
		</div>
		<div style="max-width: 900px; text-align: center">
			<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		</div>
	</el-form>
</template>

<script>
import { couponTypeDict, ticketPackageUserDict, useCcertificationDict, vipLevelDict, zhiyunCardStatusDict } from '@/dict/index.js';
export default {
	data() {
		return {
			couponTypeDict,
			useCcertificationDict,
			vipLevelDict,
			ticketPackageUserDict,
			zhiyunCardStatusDict,
			ruleForm: {
				messageTitle: '',
				messageContent: '',
				pushMethod: '',
				pushTime: '',
				userType: 0
			},
			userList: [{ label: '姓名', key: '13160492228' }],
			userArgs: { userCertification: 0, userType: 0, fanClubId: 0, ticketPackageUser: 0, vipLevel: 0, zhiyunCardStatus: 0 },
			rules: {
				messageTitle: [
					{ required: true, message: '请输入活动名称', trigger: 'blur' },
					{ min: 1, max: 50, message: '长度在 1 到 5 个字符', trigger: 'blur' }
				],
				pushMethod: [{ required: true, message: '请选择推送方式', trigger: 'change' }],
				messageContent: [{ required: true, message: '请填写消息内容', trigger: 'blur' }],
				pushTime: [{ type: 'date', required: true, message: '请选择推送时间', trigger: 'blur' }]
			}
		};
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					try {
						let params = {
							...this.ruleForm
						};
						await this.$service.app.message.add(params);

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
		//用户选择下拉
		userTypeChange(e) {
			console.log(e);
			if (e == 0) {
				//this.ruleForm.userArgs=
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
