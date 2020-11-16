<template>
	<cl-crud @load="onLoad">
		<el-row type="flex" align="middle">
			<cl-search-key placeholder="请输入卡券名称"></cl-search-key>
			<cl-flex1></cl-flex1>
			<el-button type="primary" size="mini" @click="addDialogShow = true">新增卡券</el-button>
		</el-row>

		<el-row>
			<cl-table :columns="tableColumn">
				<!-- 操作 -->
				<template #column-op="{ scope }">
					<el-button type="text" @click="detailDialogShow = true">详情</el-button>
				</template>
			</cl-table>
		</el-row>

		<el-row type="flex">
			<cl-flex1></cl-flex1>
			<cl-pagination></cl-pagination>
		</el-row>
		<!-- 新增卡券 -->
		<el-dialog title="新增卡券" :visible.sync="addDialogShow" width="900px">
			<el-form :model="addForm" :rules="rules" ref="ruleForm" label-width="100px">
				<el-form-item label="卡券名称" prop="couponName">
					<el-input v-model="addForm.couponName"></el-input>
				</el-form-item>
				<el-form-item label="卡券类型" prop="couponType">
					<el-select v-model="addForm.couponType" placeholder="请选择">
						<el-option v-for="item in couponTypeDict" :key="item.value" :label="item.text" :value="item.value" v-if="item.value > -1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="卡券面值(元)" prop="denominationalValue">
					<el-input-number v-model="addForm.denominationalValue" controls-position="right" placeholder="请输入0-100的数字"></el-input-number>
				</el-form-item>
				<el-form-item label="有效时间" prop="validityPeriodTime">
					<el-date-picker v-model="addForm.validityPeriodTime" @change="validityPeriodTimeChange" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="选择用户" prop="userType">
					<el-select v-model="addForm.userType" placeholder="请选择" @change="userTypeChange">
						<el-option label="全部" :value="0"></el-option>
						<el-option label="指定用户" :value="1"></el-option>
						<el-option label="分组用户" :value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item v-if="addForm.userType == 1">
					<el-transfer filterable filter-placeholder="请输入用户手机号" :titles="['用户列表', '已选用户']" v-model="addForm.userArgs" :data="userList"> </el-transfer>
				</el-form-item>
				<div v-if="addForm.userType == 2">
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
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</div>
		</el-dialog>

		<!-- 详情弹出框 -->
		<el-dialog title="订单详情" :visible.sync="detailDialogShow" width="80%">
			<el-form label-width="100px" class="demo-ruleForm" :inline="true">
				<h3>消息详情</h3>
				<div style="max-width: 900px">
					<el-form-item label="订单类型:">
						<span>{{ detail.orderType }}</span>
					</el-form-item>
					<el-form-item label="订单编号:">
						<span>{{ detail.orderSN }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="交易单号:">
						<span>{{ detail.tradeSN }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="下单时间">
						<span>{{ detail.orderTime }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="收件人:">
						<span>{{ detail.addresseeName }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="手机号:">
						<span>{{ detail.addresseePhoneNum }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="收件地址:">
						<span>{{ detail.addresseeAddress }}</span>
					</el-form-item>
				</div>
				<h3 style="margin-top: 45px">商品信息</h3>
				<div>
					<el-form-item class="form-item" label="商品名称:">
						<span>{{ detail.commodityName }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="商品规格:">
						<span>{{ detail.commodityName }}</span>
						<span>{{ detail.commodityName }}</span>
						<span>{{ detail.commodityName }}</span>
						<span>{{ detail.commodityName }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="下单数量:">
						<span>{{ detail.commodityVolume }}</span>
					</el-form-item>
				</div>
				<h3 style="margin-top: 45px">支付信息</h3>
				<div>
					<el-form-item class="form-item" label="支付方式:">
						<span>{{ detail.orderMethod }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="付款时间:">
						<span>{{ detail.buttonTime }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="总计金额:">
						<span>{{ detail.totalPayment }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="优惠金额:">
						<span>{{ detail.salePromotion }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="实付金额:">
						<span>{{ detail.realPayment }}</span>
					</el-form-item>
				</div>
				<h3 style="margin-top: 45px">物流信息</h3>
				<div>
					<el-form-item class="form-item" label="发货时间:">
						<span>{{ detail.deliveryTime }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="物流方式:">
						<span>{{ detail.deliveryMethod }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="物流单号:">
						<span>{{ detail.deliverySN }}</span>
					</el-form-item>
				</div>
				<h3 style="margin-top: 45px">售后信息</h3>
				<div>
					<el-form-item class="form-item" label="退款原因:">
						<span>{{ detail.drawbackReason }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="申请时间:">
						<span>{{ detail.applyTime }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="退款金额:">
						<span>{{ detail.drawbackAmount }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="退款编号:">
						<span>{{ detail.drawbackSN }}</span>
					</el-form-item>
					<el-form-item v-if="detail.drawbackVerify == 1" class="form-item" label="退款时间:">
						<span>{{ detail.drawbackTime }}</span>
					</el-form-item>
				</div>
			</el-form>
		</el-dialog>
	</cl-crud>
</template>

<script>
import { couponTypeDict, ticketPackageUserDict, useCcertificationDict, vipLevelDict, zhiyunCardStatusDict } from '@/dict/index.js';
const userList = [
	{
		couponName: '测试'
	}
];
export default {
	data() {
		return {
			couponTypeDict,
			useCcertificationDict,
			vipLevelDict,
			ticketPackageUserDict,
			zhiyunCardStatusDict,
			//
			detailDialogShow: false,
			detail: {},

			addDialogShow: false,
			addForm: { couponName: '', couponType: '', denominationalValue: 0, validityPeriodTime: '', validityPeriodStartTime: '', validityPeriodEndTime: '' },
			rules: {
				couponName: [{ required: true, message: '请输入卡券名称', trigger: 'blur' }],
				couponType: [{ required: true, message: '请选择卡券类型', trigger: 'change' }],
				userType: [{ required: true, message: '请选择用户类型', trigger: 'change' }],
				denominationalValue: [{ required: true, message: '请填写卡券面值', trigger: 'blur' }],
				validityPeriodTime: [{ required: true, message: '请选择有效时间', trigger: 'change' }]
			},
			userList: [{ label: '姓名', key: '13160492228' }],
			userArgs: { userCertification: 0, userType: 0, fanClubId: 0, ticketPackageUser: 0, vipLevel: 0, zhiyunCardStatus: 0 },
			//
			tableColumn: [
				{
					type: 'index',
					align: 'center',
					label: '编号'
				},
				{
					label: '卡券名称',
					prop: 'couponName',
					align: 'center'
				},
				{
					label: '卡券类型',
					align: 'center',
					filters: couponTypeDict,
					prop: 'couponType'
				},

				{
					label: '面值',
					prop: 'denominationalValue',
					align: 'center'
				},
				{
					label: '有效期开始时间',
					prop: 'validityPeriodStartTime',
					align: 'center'
				},
				{
					label: '有效期结束时间',
					prop: 'validityPeriodEndTime',
					align: 'center'
				},
				{
					label: '发放数量',
					prop: 'addresseeName',
					align: 'center'
				},
				{
					label: '操作',
					width: 200,
					prop: 'op'
				}
			]
		};
	},

	methods: {
		onLoad({ ctx, app }) {
			ctx.service(this.$service.app.coupon).done();
			app.refresh();
		},
		//
		submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					try {
						let params = {
							...this.addForm
						};
						await this.$service.app.coupon.add(params);

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
		},
		validityPeriodTimeChange(e) {
			console.log(e);
			this.addForm.validityPeriodStartTime = e[0];
			this.addForm.validityPeriodEndTime = e[1];
		}
	}
};
</script>
