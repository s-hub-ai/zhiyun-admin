<template>
	<el-form :model="ruleForm" :inline="false" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
		<h3>活动信息</h3>
		<el-form-item label="活动封面" prop="activityCover">
			<cl-upload :value="ruleForm.activityCover" accept="image/*" class="avatar-uploader" :size="[150, 150]" icon="el-icon-plus" :on-success="activityCoverUploadSuccess"></cl-upload>
			<div class="tips">限上传1张</div>
		</el-form-item>
		<el-form-item style="width: 100%" label="活动图片" prop="activityBanner">
			<cl-upload
				multiple
				:limit="5"
				listType="picture-card"
				:value="ruleForm.activityBanner"
				class="avatar-uploader"
				:size="[150, 150]"
				icon="el-icon-plus"
				:on-success="activityBannerUploadSuccess"
			></cl-upload>
			<div class="tips">限上传1-5张</div>
		</el-form-item>
		<div style="display: flex">
			<el-form-item label="活动时间" prop="activityTime">
				<el-date-picker v-model="ruleForm.activityTime" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
			</el-form-item>
			<el-form-item label="报名时间" prop="applyTime">
				<el-date-picker v-model="ruleForm.applyTime" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
			</el-form-item>
		</div>
		<div style="display: flex">
			<el-form-item label="活动标题" prop="title">
				<el-input style="width: 400px" v-model="ruleForm.title" placeholder="请输入活动标题" maxlength="50" show-word-limit></el-input>
			</el-form-item>
			<el-form-item label="报名名额" prop="applyPeopleNum">
				<el-input-number v-model="ruleForm.applyPeopleNum" :min="1"></el-input-number>
			</el-form-item>
		</div>

		<el-form-item label="活动详情" prop="detail">
			<cl-editor-quill height="300" v-model="ruleForm.detail"></cl-editor-quill>
		</el-form-item>
		<div style="display: flex">
			<el-form-item label="是否付费" required>
				<el-radio-group v-model="ruleForm.isPay" style="width: 150px" @change="isPayChange">
					<el-radio :label="0">免费</el-radio>
					<el-radio :label="1">付费</el-radio>
				</el-radio-group>
			</el-form-item>
			<template v-if="ruleForm.isPay == 1">
				<el-form-item label="原价">
					<el-input-number controls-position="right" v-model="ruleForm.originalPrice" :precision="2" :step="0.01" :min="0.01"></el-input-number>
				</el-form-item>
				<el-form-item label="优惠价">
					<el-input-number controls-position="right" v-model="ruleForm.price" :precision="2" :step="0.1" :min="0.01"></el-input-number>
				</el-form-item>
			</template>
			<el-form-item label="是否核销" required>
				<el-radio-group style="width: 140px" v-model="ruleForm.isVerify">
					<el-radio :label="0">否</el-radio>
					<el-radio :label="1">是</el-radio>
				</el-radio-group>
			</el-form-item>
		</div>

		<h3>打卡设置</h3>
		<div style="display: flex">
			<el-form-item label="是否打卡" required>
				<el-radio-group style="width: 150px" v-model="ruleForm.isClockin" @change="isClockinChange">
					<el-radio :label="0">否</el-radio>
					<el-radio :label="1">是</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item v-if="ruleForm.isClockin == 1" label="打卡时间" prop="clockinTime">
				<el-date-picker
					size="small"
					value-format="yyyy-MM-dd HH:mm:ss"
					v-model="ruleForm.clockinTime"
					type="datetimerange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
				>
				</el-date-picker>
			</el-form-item>
		</div>
		<el-form-item v-if="ruleForm.isClockin == 1" label="地址" prop="addressName">
			<bd-map ref="map" v-bind:radius="ruleForm.radius" v-bind:addressName="ruleForm.addressName" @setlngAndLat="setlngAndLat"></bd-map>
		</el-form-item>
		<div style="display: flex" v-if="ruleForm.isClockin == 1">
			<el-form-item label="奖励积分" prop="awardIntegral">
				<el-input-number v-model="ruleForm.awardIntegral" :min="0"></el-input-number>
			</el-form-item>
			<el-form-item label="经度" label-width="90px" required>
				<el-input disabled v-model="ruleForm.longitude"></el-input>
			</el-form-item>
			<el-form-item label="纬度" required label-width="90px">
				<el-input disabled v-model="ruleForm.latitude"></el-input>
			</el-form-item>
			<el-form-item label="半径" prop="radius" label-width="90px">
				<el-input-number v-model="ruleForm.radius" :min="0"></el-input-number>
			</el-form-item>
		</div>
		<el-form-item class="awardIntegralZy" v-if="ruleForm.isClockin == 1" label="支云卡用户额外奖励积分" label-width="140px" prop="awardIntegralZy">
			<el-input-number v-model="ruleForm.awardIntegralZy" :min="0"></el-input-number>
		</el-form-item>
		<h3>选择用户</h3>
		<div style="display: flex">
			<el-form-item label="选择用户" required>
				<el-select v-model="ruleForm.userType" placeholder="请选择" @change="userTypeChange">
					<el-option label="全部" :value="0"></el-option>
					<el-option label="指定用户" :value="1"></el-option>
					<el-option label="分组用户" :value="2"></el-option>
				</el-select>
				<el-button v-if="ruleForm.userType == 1" type="primary" style="margin-left: 15px; position: relative">
					<input class="import-btn" type="file" @change="importXlsx($event)" />
					导入</el-button
				>
			</el-form-item>
		</div>

		<el-form-item v-if="ruleForm.userType == 1" prop="userArgs">
			<el-transfer v-loading="loading" filterable filter-placeholder="请输入用户手机号" :titles="['用户列表', '已选用户']" v-model="ruleForm.userArgs" :data="userList">
				<span slot-scope="{ option }">{{ option.label }} - {{ option.nickName }}</span>
			</el-transfer>
		</el-form-item>
		<div v-if="ruleForm.userType == 2">
			<el-form-item style="width: 100%" label="实名状态">
				<el-checkbox :indeterminate="useCcertificationIndeterminate" v-model="useCcertificationCheckAll" @change="useCcertificationCheckAllChange">全选</el-checkbox>
				<el-checkbox-group v-model="userArgs.userCertification" @change="useCcertificationCheckedCitiesChange">
					<el-checkbox v-for="item in useCcertificationDict" :label="item.value" :key="item.value"> {{ item.text }}</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item style="width: 100%" label="球迷会">
				<el-checkbox :indeterminate="fanClubIdIndeterminate" v-model="fanClubIdCheckAll" @change="fanClubIdCheckAllChange">全选</el-checkbox>
				<el-checkbox-group v-model="userArgs.fanClubId" @change="fanClubIdCheckedCitiesChange">
					<el-checkbox v-for="item in fanClubList" :label="item.value" :key="item.value"> {{ item.text }} </el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item style="width: 100%" label="套票类型">
				<el-checkbox :indeterminate="ticketPackageUserIndeterminate" v-model="ticketPackageUserCheckAll" @change="ticketPackageUserCheckAllChange">全选</el-checkbox>
				<el-checkbox-group v-model="userArgs.ticketPackageUser" @change="ticketPackageUserCheckedCitiesChange">
					<el-checkbox v-for="item in ticketPackageUserDict" :label="item.value" :key="item.value"> {{ item.text }}</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item style="width: 100%" label="会员等级">
				<el-checkbox :indeterminate="vipLevelIndeterminate" v-model="vipLevelCheckAll" @change="vipLevelCheckAllChange">全选</el-checkbox>
				<el-checkbox-group v-model="userArgs.vipLevel" @change="vipLevelCheckedCitiesChange">
					<el-checkbox v-for="item in vipLevelDict" :label="item.value" :key="item.value"> {{ item.text }} </el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item style="width: 100%" label="支云卡状态">
				<el-checkbox :indeterminate="zhiyunCardStatusIndeterminate" v-model="zhiyunCardStatusCheckAll" @change="zhiyunCardStatusCheckAllChange">全选</el-checkbox>
				<el-checkbox-group v-model="userArgs.zhiyunCardStatus" @change="zhiyunCardStatusCheckedCitiesChange">
					<el-checkbox v-for="item in zhiyunCardStatusDict" :label="item.value" :key="item.value"> {{ item.text }} </el-checkbox>
				</el-checkbox-group>
			</el-form-item>
		</div>
		<h3>其他信息</h3>
		<el-form-item label="填写信息">
			<el-checkbox-group v-model="ruleForm.infoField" size="small" @change="infoFieldChange">
				<el-checkbox v-for="(item, index) in infoFieldList" :key="index" :label="item.value" border>{{ item.label }}</el-checkbox>
				<el-button size="small" type="primary" style="margin-left: 25px" @click="infoFieldDialog = true">添加字段 </el-button>
			</el-checkbox-group>
		</el-form-item>
		<el-form-item label="报名审核" required>
			<el-radio-group style="width: 178px" v-model="ruleForm.applyAudit" :disabled="ruleForm.isPay == 1">
				<el-radio :label="0">否</el-radio>
				<el-radio :label="1">是</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="活动开启" required>
			<el-radio-group style="width: 178px" v-model="ruleForm.activityStartStatus">
				<el-radio :label="0">否</el-radio>
				<el-radio :label="1">是</el-radio>
			</el-radio-group>
		</el-form-item>

		<div style="text-align: center">
			<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		</div>

		<el-dialog width="30%" title="添加字段" :visible.sync="infoFieldDialog" append-to-body @close="resetForm('infoForm')">
			<el-form :model="infoForm" :inline="false" :rules="infoRules" ref="infoForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="英文名称" prop="value">
					<el-input size="medium" placeholder="请输入内容" v-model="infoForm.value"> </el-input>
				</el-form-item>
				<el-form-item label="中文名称" prop="label">
					<el-input size="medium" placeholder="请输入内容" v-model="infoForm.label"> </el-input>
				</el-form-item>
				<el-form-item>
					<el-button size="small" type="primary" @click="addInfoField('infoForm')">立即创建</el-button>
					<el-button size="small" @click="resetForm('infoForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</el-form>
</template>

<script>
import XLSX from 'xlsx';
import { couponTypeDict, ticketPackageUserDict, useCcertificationDict, vipLevelDict, zhiyunCardStatusDict } from '@/dict/index.js';
import bdMap from './map';
import { arrDistinctByProp } from '@/utils';
export default {
	components: {
		bdMap
	},
	computed: {
		fanClubList() {
			let list = this.$store.state.common.fanClub;
			let arr = list?.map((value, index, array) => {
				let o = {
					value: value.id,
					text: value.fanClubName,
					fanClubRegion: value.fanClubRegion
				};
				return o;
			});
			return arr;
		}
	},
	data() {
		return {
			couponTypeDict,
			useCcertificationDict,
			vipLevelDict,
			ticketPackageUserDict,
			zhiyunCardStatusDict,

			ruleForm: {
				activityCover: '',
				activityBanner: '',
				title: '',
				applyPeopleNum: 1,
				isPay: 0,
				isClockin: 0,
				radius: 500,
				awardIntegral: 0,
				userType: 0,
				userArgs: [],
				applyAudit: 1,
				activityStartStatus: 1,
				originalPrice: 0,
				isVerify: 0,
				price: 0,
				longitude: '',
				latitude: '',
				infoField: [],
				addressName: null,
				awardIntegralZy: 0
			},
			infoFieldDialog: false,
			infoFieldList: [
				{
					label: '姓名',
					value: 'name'
				},
				{
					label: '手机号',
					value: 'phone'
				},
				{
					label: '微信号',
					value: 'wxAccount'
				},
				{
					label: '身份证号',
					value: 'userCertificateNum'
				},
				{
					label: '邮箱',
					value: 'email'
				},
				{
					label: '地址',
					value: 'address'
				},
				{
					label: '性别',
					value: 'sex'
				},
				{
					label: '年龄',
					value: 'age'
				}
			],
			infoForm: {
				label: '',
				value: ''
			},
			infoRules: {
				label: [
					{
						required: true,
						message: '请填写中文名称',
						trigger: 'blur'
					}
				],
				value: [
					{
						required: true,
						message: '请填写英文名称',
						trigger: 'blur'
					}
				]
			},
			rules: {
				awardIntegral: [
					{
						required: true,
						message: '请填写奖励积分',
						trigger: 'blur'
					}
				],
				radius: [
					{
						required: true,
						message: '请填写打卡有效半径',
						trigger: 'blur'
					}
				],
				addressName: [
					{
						required: true,
						message: '请填写打卡地址名称',
						trigger: 'blur'
					}
				],
				activityCover: [
					{
						required: true,
						message: '请上传活动封面',
						trigger: 'blur'
					}
				],
				activityBanner: [
					{
						required: true,
						message: '请上传活动图片',
						trigger: 'blur'
					}
				],
				title: [
					{
						required: true,
						message: '请填写活动标题',
						trigger: 'blur'
					}
				],
				awardIntegralZy: [
					{
						required: true,
						message: '请填支云卡奖励积分',
						trigger: 'blur'
					}
				],
				detail: [
					{
						required: true,
						message: '请填写活动详情',
						trigger: ['blur', 'change']
					}
				],
				applyPeopleNum: [
					{
						required: true,
						message: '请填写报名名额',
						trigger: 'blur'
					}
				],
				activityTime: [
					{
						required: true,
						message: '请选择活动时间',
						trigger: 'change'
					}
				],
				applyTime: [
					{
						required: true,
						message: '请选择报名时间',
						trigger: 'change'
					}
				],
				clockinTime: [
					{
						required: true,
						message: '请选择打卡时间',
						trigger: 'change'
					}
				]
			},
			userList: [],
			userArgs: {
				userCertification: [],
				fanClubId: [],
				ticketPackageUser: [],
				vipLevel: [],
				zhiyunCardStatus: []
			},
			loading: false,
			useCcertificationCheckbox: [],
			useCcertificationCheckedCities: [],
			useCcertificationIndeterminate: false,
			useCcertificationCheckAll: false,
			fanClubIdCheckbox: [],
			fanClubIdCheckedCities: [],
			fanClubIdIndeterminate: false,
			fanClubIdCheckAll: false,
			ticketPackageUserCheckbox: [],
			ticketPackageUserCheckedCities: [],
			ticketPackageUserIndeterminate: false,
			ticketPackageUserCheckAll: false,
			vipLevelCheckbox: [],
			vipLevelCheckedCities: [],
			vipLevelIndeterminate: false,
			vipLevelCheckAll: false,
			zhiyunCardStatusCheckbox: [],
			zhiyunCardStatusCheckedCities: [],
			zhiyunCardStatusIndeterminate: false,
			zhiyunCardStatusCheckAll: false
		};
	},
	created() {
		this.useCcertificationCheckbox = useCcertificationDict.map((v) => v.value);
		this.fanClubIdCheckbox = this.fanClubList.map((v) => v.value);
		this.ticketPackageUserCheckbox = ticketPackageUserDict.map((v) => v.value);
		this.vipLevelCheckbox = vipLevelDict.map((v) => v.value);
		this.zhiyunCardStatusCheckbox = zhiyunCardStatusDict.map((v) => v.value);
	},
	methods: {
		//编辑
		async getEditInfo(id) {
			try {
				let res = await this.$service.app.activity.info({
					id
				});
				res.activityTime = [new Date(res.activityStartTime.replace(/-/g, '/')), new Date(res.activityEndTime.replace(/-/g, '/'))];
				res.applyTime = [new Date(res.applyStartTime.replace(/-/g, '/')), new Date(res.applyEndTime.replace(/-/g, '/'))];
				if (res.isClockin == 1) {
					res.clockinTime = [new Date(res.clockinStartTime.replace(/-/g, '/')), new Date(res.clockinEndTime.replace(/-/g, '/'))];
				}
				//res.activityBanner = res.activityBanner.split(',');
				if (res.infoField != null) {
					let infoField = JSON.parse(res.infoField);
					res.infoField = infoField.map((value, index, array) => {
						return value.value;
					});
					infoField = this.infoFieldList.concat(infoField);
					this.infoFieldList = arrDistinctByProp(infoField, 'value');
				} else {
					res.infoField = [];
				}
				if (res.userType == 1) {
					let userArgs = res.userArgs.split(',');
					res.userArgs = userArgs.map((value, index, array) => {
						return Number(array[index]);
					});
					await this.getUserList();
				}
				if (res.userType == 2) {
					this.userArgs = JSON.parse(res.userArgs);
					res.userArgs = [];
				}
				this.ruleForm = res;
				console.log(this.ruleForm);
			} catch (error) {
				this.$message.error(error);
			}
		},
		//设置经纬度
		setlngAndLat(d) {
			console.log(d);
			this.ruleForm.addressName = d.addressName;
			this.ruleForm.longitude = d.lng;
			this.ruleForm.latitude = d.lat;
		},
		//其他信息多选
		infoFieldChange(e) {
			console.log(e);
			this.ruleForm.infoField = e;
		},
		isClockinChange(e) {},
		//提交
		submitForm(formName) {
			console.log(this.ruleForm);
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					try {
						let params = {
							...this.ruleForm
						};
						console.log(params.detail);
						if (params.detail == '<p><br></p>') {
							this.$message.error('请填写活动详情');
							return false;
						}
						params.activityStartTime = params.activityTime[0];
						params.activityEndTime = params.activityTime[1];
						params.applyStartTime = params.applyTime[0];
						params.applyEndTime = params.applyTime[1];
						params.activityBanner = params.activityBanner.toString();
						console.log(params.activityStartTime);
						if (params.activityEndTime < params.applyStartTime) {
							this.$message.error('报名开始时间不可晚于活动结束时间');
							return false;
						}
						console.log(params.activityEndTime, params.applyEndTime);
						if (params.activityEndTime < params.applyEndTime) {
							this.$message.error('报名结束时间不可晚于活动结束时间');
							return false;
						}
						if (params.userType == 0) {
							delete params.userArgs;
						}
						if (params.userType == 1) {
							params.userArgs = params.userArgs.toString();
						}
						if (params.userType == 2) {
							let isNull = true;
							for (const key in this.userArgs) {
								if (this.userArgs[key].length > 0) {
									isNull = false;
								}
							}
							if (isNull) {
								this.$message.error('请至少勾选一种用户分类');
								return false;
							}
							params.userArgs = JSON.stringify(this.userArgs);
							let userIds = await this.$service.app.activity.userIds({
								userArgs: this.userArgs
							});
							params.userIds = userIds.toString();
							params.userArgs = JSON.stringify(this.userArgs);
						}
						if (params.isClockin == 0) {
							delete params.latitude;
							delete params.longitude;
						} else {
							params.clockinStartTime = params.clockinTime[0];
							params.clockinEndTime = params.clockinTime[1];
						}
						let arr = [];
						for (let i = 0; i < this.infoFieldList.length; i++) {
							const e = this.infoFieldList[i];
							if (params.infoField.indexOf(e.value) > -1) {
								arr.push(e);
							}
						}
						params.infoField = JSON.stringify(arr);

						delete params.activityTime;
						delete params.applyTime;
						if (params.id) {
							await this.$service.app.activity.update(params);
						} else {
							await this.$service.app.activity.add(params);
						}

						this.$emit('update:addDialogShow', false);
						this.$message({
							message: '创建成功',
							type: 'success'
						});
					} catch (error) {
						console.log(error);
						this.$message.error(error);
					}
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		//添加自定义字段
		addInfoField(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					this.infoFieldList.push({
						...this.infoForm
					});
					this.infoFieldDialog = false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		//用户选择下拉
		async userTypeChange(e) {
			console.log(e);
			if (e == 0) {
				this.ruleForm.userArgs = [];
			}
			if (e == 1) {
				await this.getUserList();
			}
		},
		async getUserList() {
			try {
				this.ruleForm.userArgs = [];
				this.loading = true;
				let res = await this.$service.app.message.transferUser();
				this.userList = res.map((value, index, array) => {
					return {
						key: Number(value.id),
						label: value.phoneNum,
						disabled: false,
						nickName: value.nickName,
						userName: value.userName
					};
				});
				this.loading = false;
				console.log(this.userList);
			} catch (error) {
				this.loading = false;
				this.$message.error(error);
			}
		},
		//
		useCcertificationCheckAllChange(val) {
			this.userArgs.userCertification = val ? this.useCcertificationCheckbox : [];
			this.useCcertificationIndeterminate = false;
		},
		useCcertificationCheckedCitiesChange(value) {
			let checkedCount = value.length;
			this.useCcertificationCheckAll = checkedCount == this.useCcertificationCheckbox.length;
			this.useCcertificationIndeterminate = checkedCount > 0 && checkedCount < this.useCcertificationCheckbox.length;
		},
		fanClubIdCheckAllChange(val) {
			this.userArgs.fanClubId = val ? this.fanClubIdCheckbox : [];
			this.fanClubIdIndeterminate = false;
		},
		fanClubIdCheckedCitiesChange(value) {
			let checkedCount = value.length;
			this.fanClubIdCheckAll = checkedCount === this.fanClubIdCheckbox.length;
			this.fanClubIdIndeterminate = checkedCount > 0 && checkedCount < this.fanClubIdCheckbox.length;
		},
		ticketPackageUserCheckAllChange(val) {
			this.userArgs.ticketPackageUser = val ? this.ticketPackageUserCheckbox : [];
			this.ticketPackageUserIndeterminate = false;
		},
		ticketPackageUserCheckedCitiesChange(value) {
			let checkedCount = value.length;
			this.ticketPackageUserCheckAll = checkedCount === this.ticketPackageUserCheckbox.length;
			this.ticketPackageUserIndeterminate = checkedCount > 0 && checkedCount < this.ticketPackageUserCheckbox.length;
		},
		vipLevelCheckAllChange(val) {
			this.userArgs.vipLevel = val ? this.vipLevelCheckbox : [];
			this.vipLevelIndeterminate = false;
		},
		vipLevelCheckedCitiesChange(value) {
			let checkedCount = value.length;
			this.vipLevelCheckAll = checkedCount === this.vipLevelCheckbox.length;
			this.vipLevelIndeterminate = checkedCount > 0 && checkedCount < this.vipLevelCheckbox.length;
		},
		zhiyunCardStatusCheckAllChange(val) {
			this.userArgs.zhiyunCardStatus = val ? this.zhiyunCardStatusCheckbox : [];
			this.zhiyunCardStatusIndeterminate = false;
		},
		zhiyunCardStatusCheckedCitiesChange(value) {
			let checkedCount = value.length;
			this.zhiyunCardStatusCheckAll = checkedCount === this.zhiyunCardStatusCheckbox.length;
			this.zhiyunCardStatusIndeterminate = checkedCount > 0 && checkedCount < this.zhiyunCardStatusCheckbox.length;
		},
		activityCoverUploadSuccess(res, file, fileList) {
			console.log(res, fileList);
			if (res) {
				this.ruleForm.activityCover = res;
			}
		},
		activityBannerUploadSuccess(res, file, fileList) {
			console.log(res, fileList);
			if (res) {
				let arr = fileList.map((value) => {
					return value.url;
				});
				this.ruleForm.activityBanner = arr.toString();
			}
			console.log(this.ruleForm.activityBanner);
		},
		importXlsx(e) {
			let _this = this;
			console.log(e);
			let files = e.target.files;
			for (let i = 0; i < files.length; i++) {
				let reader = new FileReader();
				let name = files[i].name;
				reader.onload = function (e) {
					let data = e.target.result;
					let workbook = XLSX.read(data, {
						type: typeof FileReader !== 'undefined' && (FileReader.prototype || {}).readAsBinaryString ? 'binary' : 'array'
					});
					let workbookSheets = workbook.Sheets;
					for (let sheet in workbookSheets) {
						if (workbookSheets.hasOwnProperty(sheet)) {
							//	fromTo = workbookSheets[sheet]['!ref'];
							let xlsxData = XLSX.utils.sheet_to_json(workbookSheets[sheet]);
							// 结果数组
							console.log(sheet);
							console.log(xlsxData);
							let ids = [];
							xlsxData.map((value) => {
								let phone = String(value.手机号);
								console.log(phone);
								phone = phone.replace(/\s+/g, '');
								ids.push(phone);
							});
							_this.getUserIds(ids);
						}
					}
				};
				reader.readAsBinaryString(files[i]);
			}
		},
		//是否付费
		isPayChange(e) {
			if (e == 1) {
				this.ruleForm.applyAudit = 0;
			}
		},
		//
		async getUserIds(ids) {
			if (ids.length < 1) return;
			try {
				let res = await this.$service.app.message.importUser({
					ids
				});
				this.ruleForm.userArgs = res.map((value) => {
					return Number(value.id);
				});
				console.log(this.ruleForm.userArgs);
			} catch (error) {
				this.$message.error(error);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.tips {
	color: #909399;
	font-size: 12px;
}

::v-deep .el-transfer-panel {
	width: 350px;
}

.form-item {
	::v-deep .el-input {
		min-width: 300px;
	}
}

.import-btn {
	position: absolute;
	left: 0;
	width: 70px;
	height: 40px;
	top: 0;
	opacity: 0;
	filter: alpha(opacity=0);
	cursor: pointer;
}

::v-deep .el-checkbox.is-bordered + .el-checkbox.is-bordered {
	margin-left: 0;
}
.awardIntegralZy {
	::v-deep .el-form-item__label {
		line-height: 20px;
	}
}
</style>
