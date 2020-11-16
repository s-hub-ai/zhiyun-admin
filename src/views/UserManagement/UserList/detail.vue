<template>
	<div>
		<!-- 基础信息 -->
		<div style="display: flex; justify-content: space-between; align-items: center">
			<el-button v-if="notEdit" @click="notEdit = false" size="medium" type="primary" :disabled="false" style="margin-left: auto">编辑</el-button>
			<el-button-group v-else style="margin-left: auto">
				<el-button size="medium" @click="notEdit = true">取消</el-button>
				<el-button size="medium" type="primary">保存</el-button>
			</el-button-group>
		</div>
		<el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" :disabled="notEdit" label-width="100px" class="form">
			<div style="max-width: 900px">
				<el-form-item class="form-item" label="头像:" prop="avatar">
					<el-avatar :size="50" :src="ruleForm.avatar"></el-avatar>
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
				<el-form-item class="form-item" prop="fanClubId" label="球迷会:">
					<el-select v-model="ruleForm.fanClub" placeholder="请选择球迷会">
						<el-option v-for="item in fanClubList" :key="item.id" :label="item.fanClubName" :value="item.value"> </el-option>
					</el-select>
				</el-form-item>
				<el-form-item class="form-item" prop="fanClubRegion" label="球迷会区域:">
					<el-select v-model="ruleForm.fanClubRegion" placeholder="请选择球迷会区域">
						<el-option v-for="item in fanClubRegionList" :key="item.id" :label="item.regionName" :value="item.id"> </el-option>
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
				<el-form-item class="form-item" label="附件信息:" prop="userCertificatePositiveImg">
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
							class="avatar-uploader"
							:size="[160, 252]"
							icon="el-icon-plus"
							text="身份证背面"
							accept="*"
							:on-success="userCertificateNegativeImgUploadSuccess"
						>
						</cl-upload>
						<cl-upload
							:value="ruleForm.userCertificatePortraitImg"
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
					<span>{{ vipLevelFormatter(ruleForm.vipLevel) }}</span>
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
			<div style="max-width: 800px" v-for="(item, index) in addresseeList" :key="index">
				<el-form-item class="form-item" label="收货人:">
					<span>{{item.contact|default}}</span>
				</el-form-item>
				<el-form-item class="form-item" label="手机号:">
					<span>{{item.phone|default}}</span>
				</el-form-item>
				<el-form-item class="form-item" label="收货地址:">
					<span>{{ item.province.label + item.city.label + item.country.label }} {{ item.detail }}</span>
				</el-form-item>
			</div>
		</el-form>
	</div>
</template>

<script>
import { ticketPackageUserDict, useCcertificationDict, vipLevelDict, zhiyunCardStatusDict } from '@/dict/index.js';
export default {
	computed: {
		fanClubList() {
			return this.$store.state.common.fanClub;
		},
		fanClubRegionList() {
			return this.$store.state.common.fanClubRegion;
		}
	},
	data() {
		return {
			id: '',
			ticketPackageUserDict,
			buyTicketsPeople: [],
			addresseeList: [],
			notEdit: true,
			ruleForm: {
				userCertificatePositiveImg: ''
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
		//会员等级格式
		vipLevelFormatter(s) {
			console.log(s);
			let res;
			vipLevelDict.forEach((value, index, array) => {
				if (s == value.value) {
					res = value.text;
					return;
				}
			});
			return res;
		},
		qrCodeUploadSuccess(res) {
			if (res) {
				this.ruleForm.qrCode = res;
			}
		},
		async getEditInfo(id) {
			try {
				this.id = id;
				let res = await this.$service.app.user.info.info({ id });
				let fanClubRegion = await this.$service.app.fanClubRegion.info({ id: res.fanClubId });
				let addresseeList = await this.$service.app.user.address.page({ page: 1, size: 999, userId: res.id });
				console.log(addresseeList);
				addresseeList.list.map((v) => {
					v.province = JSON.parse(v.province);
					v.city = JSON.parse(v.city);
					v.country = JSON.parse(v.country);
					this.addresseeList.push(v);
				});
				res.fanClubRegion = fanClubRegion.id;
				res.userCertificateValidity = [new Date(res.userCertificateValidityStart), new Date(res.userCertificateValidityEnd)];
				this.ruleForm = res;
				console.log(this.ruleForm);
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
		},
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
