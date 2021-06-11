<template>
	<el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
		<div style="max-width: 900px">
			<el-form-item label="卡券名称:">
				<span>{{ ruleForm.couponName }}</span>
			</el-form-item>
			<el-form-item label="卡券类型:">
				<span>{{ formatCouponType(ruleForm.couponType) }}</span>
			</el-form-item>
			<el-form-item class="form-item" label="卡券面值:">
				<div v-if="[4,5].includes(ruleForm.couponType)">满{{ ruleForm.fullNum }}减{{ ruleForm.reduceNum }}</div>
				<div v-if="ruleForm.couponType == 1">立减{{ ruleForm.denominationalValue }}</div>
				<div v-if="ruleForm.couponType == 3">商品立减{{ ruleForm.denominationalValue }}</div>
				<div v-if="ruleForm.couponType == 2">{{ ruleForm.costRatio }}折</div>
			</el-form-item>
			<el-form-item class="form-item" label="卡券有效期:">
				<span>{{ ruleForm.validityPeriodStartTime }}-{{ ruleForm.validityPeriodEndTime }}</span>
			</el-form-item>
			<el-form-item class="form-item" label="卡券规则:">
				<span>{{ ruleForm.rules }}</span>
			</el-form-item>
		</div>
		<p style="margin-top: 45px">推送用户列表</p>
		<el-divider></el-divider>
		<div style="display: flex; justify-content: space-between; align-items: start">
			<el-form-item class="form-item-tag" label="已选择用户">
				<el-tag v-if="ruleForm.userType == 0" type="success">全部用户</el-tag>
			</el-form-item>
			<el-table v-if="ruleForm.userType == 1" :data="tableData" border style="width: 100%">
				<el-table-column type="index" label="序号" width="50"> </el-table-column>
				<el-table-column prop="nickName" label="昵称" width="180"> </el-table-column>
				<el-table-column prop="userName" label="姓名" width="180"> </el-table-column>
				<el-table-column prop="phoneNum" label="手机号"> </el-table-column>
			</el-table>
			<div v-if="ruleForm.userType == 2">
				<el-form-item label="实名状态">
					<el-checkbox disabled :indeterminate="useCcertificationIndeterminate" v-model="useCcertificationCheckAll">全选</el-checkbox>
					<el-checkbox-group disabled v-model="userArgs.userCertification">
						<el-checkbox v-for="item in useCcertificationDict" :label="item.value" :key="item.value"> {{ item.text }}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="球迷会">
					<el-checkbox disabled :indeterminate="fanClubIdIndeterminate" v-model="fanClubIdCheckAll">全选 </el-checkbox>
					<el-checkbox-group disabled v-model="userArgs.fanClubId">
						<el-checkbox v-for="item in fanClubList" :label="item.value" :key="item.value"> {{ item.text }} </el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="套票类型">
					<el-checkbox disabled :indeterminate="ticketPackageUserIndeterminate" v-model="ticketPackageUserCheckAll">全选</el-checkbox>
					<el-checkbox-group disabled v-model="userArgs.ticketPackageUser">
						<el-checkbox v-for="item in ticketPackageUserDict" :label="item.value" :key="item.value"> {{ item.text }}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="会员等级">
					<el-checkbox disabled :indeterminate="vipLevelIndeterminate" v-model="vipLevelCheckAll">全选 </el-checkbox>
					<el-checkbox-group disabled v-model="userArgs.vipLevel">
						<el-checkbox v-for="item in vipLevelDict" :label="item.value" :key="item.value"> {{ item.text }} </el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="支云卡状态">
					<el-checkbox disabled :indeterminate="zhiyunCardStatusIndeterminate" v-model="zhiyunCardStatusCheckAll">全选</el-checkbox>
					<el-checkbox-group disabled v-model="userArgs.zhiyunCardStatus">
						<el-checkbox v-for="item in zhiyunCardStatusDict" :label="item.value" :key="item.value"> {{ item.text }} </el-checkbox>
					</el-checkbox-group>
				</el-form-item>
			</div>
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
			ruleForm: {},
			userArgs: {
				userCertification: [],
				fanClubId: [],
				ticketPackageUser: [],
				vipLevel: [],
				zhiyunCardStatus: []
			},
			couponTypeDict,
			useCcertificationDict,
			vipLevelDict,
			ticketPackageUserDict,
			zhiyunCardStatusDict,
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
		async getEditInfo(id) {
			try {
				let res = await this.$service.app.coupon.info({
					id
				});
				if (res.userType == 2) {
					this.userArgs = JSON.parse(res.userArgs);
				}
				if (res.userType == 1) {
					await this.getUserTable(res.userArgs);
				}
				this.ruleForm = res;
			} catch (error) {
				this.$message.error(error);
			}
		},
		async getUserTable(ids) {
			try {
				ids = ids.split(',');
				let res = await this.$service.app.message.transferUserDetail({
					ids
				});
				this.tableData = res;
			} catch (error) {
				this.$message.error(error);
			}
		},
		formatCouponType(num) {
			let res;
			couponTypeDict.map((value, index, array) => {
				if (num == value.value) {
					res = value.text;
				}
			});
			return res;
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

.form-item-tag {
	max-width: 800px;

	::v-deep .el-tag {
		margin-right: 10px;
	}
}

::v-deep .el-checkbox__input.is-disabled + span.el-checkbox__label {
	color: #333;
}

::v-deep .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
	background-color: #4165d7;
	border-color: #4165d7;
}

::v-deep .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
}

::v-deep .el-checkbox-button.is-disabled.is-checked .el-checkbox-button__inner {
	color: #ffffff;
	background-color: #1890ff;
	border-color: #1890ff;
	-webkit-box-shadow: -1px 0 0 0 #74bcff;
	box-shadow: -1px 0 0 0 #74bcff;
}
</style>
