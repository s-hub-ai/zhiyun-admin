<template>
	<el-card class="box-card">
		<el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="form">
			<!-- 基础信息 -->
			<div style="display: flex; justify-content: space-between; align-items: center">
				<span>基础信息</span>
				<el-button v-if="notEdit" @click="notEdit = false" size="medium" type="primary" style="margin-left: auto">编辑</el-button>
				<el-button-group v-else>
					<el-button size="medium" @click="notEdit = true">取消</el-button>
					<el-button size="medium" type="primary">保存</el-button>
				</el-button-group>
			</div>
			<el-divider></el-divider>
			<div style="max-width: 900px">
				<el-form-item class="form-item" label="头像:">
					<el-avatar :size="50" src=""></el-avatar>
				</el-form-item>
				<el-form-item label="昵称:" prop="nickName">
					<el-input v-model="ruleForm.nickName" placeholder="请输入用户昵称"></el-input>
				</el-form-item>
				<el-form-item label="手机号:" prop="phoneNum">
					<el-input v-model="ruleForm.phoneNum" placeholder="请输入手机号"></el-input>
				</el-form-item>
				<el-form-item label="微信号:" prop="weChatAccount">
					<el-input v-model="ruleForm.weChatAccount" placeholder="请输入微信账号"></el-input>
				</el-form-item>
				<el-form-item label="邮箱号:" prop="email">
					<el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
				</el-form-item>
				<el-form-item label="微博号:" prop="weiboAccount">
					<el-input v-model="ruleForm.weiboAccount" placeholder="请输入微博账号"></el-input>
				</el-form-item>
			</div>
			<!-- 套票信息 -->
			<span class="title">套票信息</span>
			<el-divider></el-divider>
			<div style="max-width: 800px">
				<el-form-item class="form-item" prop="ticketPackageNum" label="套票号:">
					<el-input v-model="ruleForm.ticketPackageNum" placeholder="请输入套票号"></el-input>
				</el-form-item>
				<el-form-item class="form-item" prop="ticketPackageUser" label="套票类型:">
					<el-select v-model="ruleForm.ticketPackageUser" placeholder="请选择套票类型">
						<el-option v-for="item in ticketPackageUserDict" :key="item.value" :label="item.text" :value="item.value"> </el-option>
					</el-select>
				</el-form-item>
				<el-form-item class="form-item" prop="fanClub" label="球迷会:">
					<el-select v-model="ruleForm.fanClub" placeholder="请选择球迷会">
						<el-option v-for="item in ticketPackageUserDict" :key="item.value" :label="item.text" :value="item.value"> </el-option>
					</el-select>
				</el-form-item>
				<el-form-item class="form-item" prop="fanClubRegion" label="球迷会区域:">
					<el-select v-model="ruleForm.fanClubRegion" placeholder="请选择球迷会区域">
						<el-option v-for="item in ticketPackageUserDict" :key="item.value" :label="item.text" :value="item.value"> </el-option>
					</el-select>
				</el-form-item>
			</div>
			<!-- 实名信息 -->
			<span class="title">实名信息</span>
			<el-divider></el-divider>
			<div style="max-width: 1200px">
				<el-form-item class="form-item" prop="userName" label="姓名:">
					<el-input v-model="ruleForm.userName" placeholder="请输入姓名"></el-input>
				</el-form-item>
				<el-form-item class="form-item" prop="userSex" label="性别:">
					<el-select v-model="ruleForm.userSex" placeholder="请选择性别">
						<el-option v-for="item in ticketPackageUserDict" :key="item.value" :label="item.text" :value="item.value"> </el-option>
					</el-select>
				</el-form-item>
				<el-form-item class="form-item" prop="userBirthday" label="生日:">
					<el-date-picker v-model="ruleForm.userBirthday" type="date" placeholder="请选择生日"> </el-date-picker>
				</el-form-item>
				<el-form-item class="form-item" prop="userCertificateType" label="证件类型:">
					<el-select v-model="ruleForm.userCertificateType" placeholder="请选择证件类型">
						<el-option v-for="item in ticketPackageUserDict" :key="item.value" :label="item.text" :value="item.value"> </el-option>
					</el-select>
				</el-form-item>
				<el-form-item class="form-item" prop="userCertificateNum" label="证件号码:">
					<el-input v-model="ruleForm.userCertificateNum" placeholder="请输入证件号码"></el-input>
				</el-form-item>
				<el-form-item class="form-item" prop="userCertificateValidity" label="有效期:">
					<el-date-picker v-model="ruleForm.userCertificateValidity" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
				</el-form-item>
				<el-form-item class="form-item" prop="userCertificateAddress" label="身份证住址:">
					<el-input style="width: 1000px" v-model="ruleForm.userCertificateAddress" placeholder="请输入姓身份证住址"></el-input>
				</el-form-item>
				<el-form-item class="form-item" label="附件信息:">
					<span style="display: flex; align-items: center">
						<cl-upload
							:value="ruleForm.userCertificatePositiveImg"
							:filePath="ruleForm.userCertificatePositiveImg"
							class="avatar-uploader"
							:size="[160, 252]"
							icon="el-icon-plus"
							text="身份证正面"
							accept="*"
							:on-success="userCertificatePositiveImgUploadSuccess"
						></cl-upload>
						<cl-upload
							:value="ruleForm.userCertificateNegativeImg"
							:filePath="ruleForm.userCertificateNegativeImg"
							class="avatar-uploader"
							:size="[160, 252]"
							icon="el-icon-plus"
							text="身份证背面"
							accept="*"
							:on-success="userCertificateNegativeImgUploadSuccess"
						></cl-upload>
						<cl-upload
							:value="ruleForm.userCertificatePortraitImg"
							:filePath="ruleForm.userCertificatePortraitImg"
							class="avatar-uploader"
							:size="[160, 252]"
							icon="el-icon-plus"
							text="人像"
							accept="*"
							:on-success="userCertificatePortraitImgUploadSuccess"
						></cl-upload>
					</span>
				</el-form-item>
			</div>
			<!-- 积分信息 -->
			<span class="title">积分信息</span>
			<el-divider></el-divider>
			<div style="max-width: 800px">
				<el-form-item class="form-item" label="会员等级:">
					<span>{{ruleForm.vipLevel|default}}</span>
				</el-form-item>
				<el-form-item class="form-item" label="累计积分:">
					<span>{{ruleForm.accumulatedPoints|default}}</span>
				</el-form-item>
				<el-form-item class="form-item" label="积分排名:">
					<span>{{ruleForm.accumulatedPoints|default}}</span>
				</el-form-item>
				<el-form-item class="form-item" label="可用积分:">
					<span>{{ruleForm.availablePoints|default}}</span>
				</el-form-item>
			</div>
			<!-- 支云卡信息 -->
			<span class="title">支云卡信息</span>
			<el-divider></el-divider>
			<div style="max-width: 800px">
				<el-form-item class="form-item" label="卡号:">
					<span>{{ruleForm.zhiyunCardNum|default}}</span>
				</el-form-item>
				<!-- 				<el-form-item class="form-item" label="支云卡类型:">
					<span>{{ruleForm.zhiyunCardType|default}}</span>
				</el-form-item> -->
				<el-form-item class="form-item" label="办卡时间:">
					<span>{{ruleForm.zhiyunCardOpentime|default}}</span>
				</el-form-item>
			</div>
			<!-- 常用购票人信息 -->
			<span class="title">常用购票人信息</span>
			<el-divider></el-divider>
			<div style="max-width: 800px">
				<block v-for="(item, index) in buyTicketsPeople" :key="index">
					<el-form-item class="form-item" label="姓名:">
						<span>{{item.userName|default}}</span>
					</el-form-item>
					<el-form-item class="form-item" label="证件类型:">
						<span>{{item.userCertificateType|default}}</span>
					</el-form-item>
					<el-form-item class="form-item" label="证件号码:">
						<span>{{item.userCertificateNum|default}}</span>
					</el-form-item>
				</block>
			</div>
			<!-- 收货地址-->
			<span class="title">收货地址</span>
			<el-divider></el-divider>
			<div style="max-width: 800px">
				<block v-for="(item, index) in shippingAddress" :key="index">
					<el-form-item class="form-item" label="收货人:">
						<span>{{item.userName|default}}</span>
					</el-form-item>
					<el-form-item class="form-item" label="手机号:">
						<span>{{item.userCertificateType|default}}</span>
					</el-form-item>
					<el-form-item class="form-item" label="收货地址:">
						<span>{{item.userCertificateNum|default}}</span>
					</el-form-item>
				</block>
			</div>
		</el-form>
	</el-card>
</template>

<script>
import { ticketPackageUserDict, useCcertificationDict, vipLevelDict, zhiyunCardStatusDict } from '@/dict/index.js';
export default {
	data() {
		return {
			ticketPackageUserDict,
			buyTicketsPeople: [],
			shippingAddress: [],
			notEdit: true,
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
				name: [
					{ required: true, message: '请输入活动名称', trigger: 'blur' },
					{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				region: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
				date1: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
				date2: [{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }],
				type: [{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }],
				resource: [{ required: true, message: '请选择活动资源', trigger: 'change' }],
				desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
			}
		};
	},
	methods: {
		//身份证正面上传回调
		userCertificatePositiveImgUploadSuccess() {}, //身份证反面上传回调
		userCertificateNegativeImgUploadSuccess() {}, //人像照上传回调
		userCertificatePortraitImgUploadSuccess() {}
	}
};
</script>

<style lang="scss" scoped>
.title {
	display: block;
	margin-top: 45px;
}
.avatar-uploader {
	width: 350px;
}
.box-card {
	overflow-y: auto;
}
.form {
	::v-deep .el-input {
		min-width: 260px;
	}
}
.form-item {
	min-width: 359px;
}
</style>
