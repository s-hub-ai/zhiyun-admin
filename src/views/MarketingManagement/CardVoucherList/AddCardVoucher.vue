<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		<div style="max-width: 900px">
			<el-form-item class="form-item" label="卡券类型" prop="couponType">
				<el-select v-model="ruleForm.couponType" placeholder="请选择" @change="couponTypeChange">
					<el-option
						v-for="item in [
							{ value: 4, text: '满减券' },
							{ value: 1, text: '立减券' },
							{ value: 2, text: '折扣券' },
							{ value: 3, text: '指定商品立减券' }
						]"
						:key="item.value"
						:label="item.text"
						:value="item.value"
					>
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="卡券名称" prop="couponName">
				<el-input v-model="ruleForm.couponName" placeholder="请输入卡券名称" :maxlength="30" show-word-limit> </el-input>
			</el-form-item>
			<div v-if="ruleForm.couponType == 4" style="display: flex">
				<el-form-item label="达标金额" prop="fullNum">
					<el-input-number v-model="ruleForm.fullNum" controls-position="right" :min="0.1"></el-input-number>
				</el-form-item>
				<el-form-item label="立减金额" prop="reduceNum">
					<el-input-number v-model="ruleForm.reduceNum" controls-position="right" :min="0.1"></el-input-number>
				</el-form-item>
			</div>
			<el-form-item v-if="ruleForm.couponType == 1 || ruleForm.couponType == 3" label="卡券面值" prop="denominationalValue">
				<el-input-number v-model="ruleForm.denominationalValue" controls-position="right" :min="0.1"></el-input-number>
			</el-form-item>
			<el-form-item v-if="ruleForm.couponType == 2" label="折扣率" prop="costRatio">
				<el-input-number v-model="ruleForm.costRatio" controls-position="right" :min="0.1" :precision="1" :step="0.1"></el-input-number>
				<span style="padding-left: 10px">折</span>
			</el-form-item>
			<el-form-item v-if="ruleForm.couponType == 3" label="选择商品" prop="commodityId">
				<el-select v-model="ruleForm.commodityId" placeholder="请选择" popper-class="commodity-option" filterable>
					<el-option v-for="item in commodityList" :key="item.id" :label="item.commodityName" :value="item.id">
						<div style="display: flex; justify-content: space-between; width: 100%; padding: 2px 0; align-items: flex-start">
							<el-image style="width: 50px; height: 50px" :src="item.commodityCover" fit="cover"></el-image>
							<span style="color: #8492a6; font-size: 13px">{{ item.commodityName }}</span>
						</div>
					</el-option>
				</el-select>
			</el-form-item>

			<el-form-item class="form-item" label="有效时间" prop="validityPeriodTime">
				<el-date-picker v-model="ruleForm.validityPeriodTime" :picker-options="pickerOptions" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
				</el-date-picker>
			</el-form-item>
			<el-form-item class="form-item" label="规则">
				<el-input type="textarea" placeholder="请输入内容" v-model="ruleForm.rules" :maxlength="100" show-word-limit></el-input>
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
			<el-button v-if="ruleForm.userType == 1" type="primary" style="margin-left: 15px; position: relative">
				<input class="import-btn" type="file" @change="importXlsx($event)" />
				导入</el-button
			>
		</el-form-item>
		<el-form-item v-if="ruleForm.userType == 1" prop="userArgs">
			<el-transfer v-loading="loading" filterable filter-placeholder="请输入用户手机号" :titles="['用户列表', '已选用户']" v-model="ruleForm.userArgs" :data="userList">
				<span slot-scope="{ option }">{{ option.label }} - {{ option.nickName }}</span>
			</el-transfer>
		</el-form-item>
		<div v-if="ruleForm.userType == 2">
			<el-form-item label="实名状态">
				<el-checkbox :indeterminate="useCcertificationIndeterminate" v-model="useCcertificationCheckAll" @change="useCcertificationCheckAllChange">全选</el-checkbox>
				<el-checkbox-group v-model="userArgs.userCertification" @change="useCcertificationCheckedCitiesChange">
					<el-checkbox v-for="item in useCcertificationDict" :label="item.value" :key="item.value"> {{ item.text }} </el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="球迷会">
				<el-checkbox :indeterminate="fanClubIdIndeterminate" v-model="fanClubIdCheckAll" @change="fanClubIdCheckAllChange"> 全选</el-checkbox>
				<el-checkbox-group v-model="userArgs.fanClubId" @change="fanClubIdCheckedCitiesChange">
					<el-checkbox v-for="item in fanClubList" :label="item.value" :key="item.value"> {{ item.text }} </el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="套票类型">
				<el-checkbox :indeterminate="ticketPackageUserIndeterminate" v-model="ticketPackageUserCheckAll" @change="ticketPackageUserCheckAllChange">全选</el-checkbox>
				<el-checkbox-group v-model="userArgs.ticketPackageUser" @change="ticketPackageUserCheckedCitiesChange">
					<el-checkbox v-for="item in ticketPackageUserDict" :label="item.value" :key="item.value"> {{ item.text }} </el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="会员等级">
				<el-checkbox :indeterminate="vipLevelIndeterminate" v-model="vipLevelCheckAll" @change="vipLevelCheckAllChange">全选 </el-checkbox>
				<el-checkbox-group v-model="userArgs.vipLevel" @change="vipLevelCheckedCitiesChange">
					<el-checkbox v-for="item in vipLevelDict" :label="item.value" :key="item.value"> {{ item.text }} </el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="支云卡状态">
				<el-checkbox :indeterminate="zhiyunCardStatusIndeterminate" v-model="zhiyunCardStatusCheckAll" @change="zhiyunCardStatusCheckAllChange">全选</el-checkbox>
				<el-checkbox-group v-model="userArgs.zhiyunCardStatus" @change="zhiyunCardStatusCheckedCitiesChange">
					<el-checkbox v-for="item in zhiyunCardStatusDict" :label="item.value" :key="item.value"> {{ item.text }} </el-checkbox>
				</el-checkbox-group>
			</el-form-item>
		</div>
		<div style="max-width: 900px; text-align: center">
			<el-button type="primary" @click="open">确定</el-button>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		</div>
	</el-form>
</template>

<script>
import { couponTypeDict, ticketPackageUserDict, useCcertificationDict, vipLevelDict, zhiyunCardStatusDict } from '@/dict/index.js';
export default {
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
			pickerOptions: {
				disabledDate(time) {
					//此条为设置禁止用户选择今天之前的日期，包含今天。
					// return time.getTime() <= (Date.now());
					//此条为设置禁止用户选择今天之前的日期，不包含今天。
					return time.getTime() <= Date.now() - 24 * 60 * 60 * 1000;
				}
			},
			rules: {
				couponName: [
					{
						required: true,
						message: '请输入卡券名称',
						trigger: 'blur'
					}
				],
				couponType: [
					{
						required: true,
						message: '请选择卡券类型',
						trigger: 'change'
					}
				],
				userType: [
					{
						required: true,
						message: '请选择用户类型',
						trigger: 'change'
					}
				],
				denominationalValue: [
					{
						required: true,
						message: '请填写卡券面值',
						trigger: 'blur'
					}
				],
				fullNum: [
					{
						required: true,
						message: '请填写达标金额',
						trigger: 'blur'
					}
				],
				reduceNum: [
					{
						required: true,
						message: '请填写立减金额',
						trigger: 'blur'
					}
				],
				costRatio: [
					{
						required: true,
						message: '请填写折扣率',
						trigger: 'blur'
					}
				],
				commodityId: [
					{
						required: true,
						message: '请选择指定商品',
						trigger: 'change'
					}
				],
				validityPeriodTime: [
					{
						required: true,
						message: '请选择有效时间',
						trigger: 'change'
					}
				]
			},
			commodityList: [],
			ruleForm: {
				couponName: '',
				couponType: 1,
				fullNum: 0,
				reduceNum: 0,
				denominationalValue: 0,
				validityPeriodTime: '',
				commodityId: '',
				userArgs: [],
				userType: 0
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
		//编辑
		async getEditInfo(id) {
			try {
				let res = await this.$service.app.coupon.info({
					id
				});
				res.validityPeriodTime = [new Date(res.validityPeriodStartTime.replace(/-/g, '/')), new Date(res.validityPeriodEndTime.replace(/-/g, '/'))];
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
		//
		async couponTypeChange(e) {
			//商品立减券
			if (e == 3) {
				let res = await this.$service.app.commodity.common.list();
				this.commodityList = res;
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
		},
		open() {
			this.$alert('确定要发放本优惠券吗', '提示', {
				confirmButtonText: '确定',
				callback: (action) => {
					if (action == 'confirm') {
						this.submitForm('ruleForm');
					}
				}
			});
		},
		//
		submitForm(formName) {
			console.log(this.ruleForm);
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					try {
						let params = {
							...this.ruleForm
						};
						if (params.userType == 2) {
							let isNull = true;
							for (const key in this.userArgs) {
								if (this.userArgs[key].length > 0) {
									isNull = false;
								}
							}
							if (isNull) {
								this.$message.error('请至少勾选一种用户分类！');
								return false;
							}
							params.userArgs = JSON.stringify(this.userArgs);
						}
						if (params.userType == 1) {
							params.userArgs = params.userArgs.toString();
						}
						if (params.userType == 0) {
							delete params.userArgs;
						}
						params.validityPeriodStartTime = params.validityPeriodTime[0];
						params.validityPeriodEndTime = params.validityPeriodTime[1];
						await this.$service.app.coupon.add(params);
						this.$emit('update:addDialogShow', false);
						this.$message({
							message: '创建成功',
							type: 'success'
						});
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
		//用户选择下拉
		async userTypeChange(e) {
			console.log(e);
			if (e == 0) {
				this.ruleForm.userArgs = [];
			}
			if (e == 1) {
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

::v-deep .el-transfer-panel {
	width: 300px;
}

::v-deep.el-select-dropdown__item {
	height: auto !important;
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
</style>
