<template>
	<cl-crud @load="onLoad" ref="crud">
		<el-row type="flex" align="middle">
			<cl-flex1></cl-flex1>
			<cl-search-key></cl-search-key>
		</el-row>

		<el-row>
			<cl-table :columns="tableColumn">
				<!-- 商品信息 -->
				<template #column-skus="{ scope }">
					<div v-for="item in scope.row.skus" :key="item.id">
						<div>商品名称:{{ item.commodityName }}</div>
						<div>规格:{{ item.skuString | format_spec }}</div>
						<div>数量:{{ item.commodityVolume }}</div>
					</div>
				</template>
				<!-- 购买信息 -->
				<template #column-buyInfo="{ scope }">
					<div>收件人:{{ scope.row.cantact }}</div>
					<div>手机号:{{ scope.row.phone }}</div>
				</template>
				<!-- 操作 -->
				<template #column-op="{ scope }">
					<el-button type="text" v-if="scope.row.orderStatus == 1" @click="(deliveryForm.orderId = scope.row.id), (deliveDialogShow = true)">发货</el-button>
					<el-button type="text" v-if="scope.row.orderStatus == 2" @click="(deliveryForm.orderId = scope.row.id), getLogistics()">物流</el-button>
					<el-button type="text" v-if="scope.row.orderStatus == 4" @click="drawbackAuditShow = true">退款审核</el-button>
					<el-button type="text" @click="(detailDialogShow = true), getEditInfo(scope.row.id)">详情</el-button>
				</template>
			</cl-table>
		</el-row>

		<el-row type="flex">
			<cl-flex1></cl-flex1>
			<cl-pagination></cl-pagination>
		</el-row>
		<!-- 发货弹出框 -->
		<el-dialog title="商品发货" :visible.sync="deliveDialogShow" width="400px">
			<el-form :model="deliveryForm" label-width="90px">
				<el-form-item label="快递单号" required>
					<el-input v-model="deliveryForm.deliverySN" @blur="getDelivery"></el-input>
				</el-form-item>
				<el-form-item label="选择快递" required>
					<el-select v-model="deliveryForm.deliveryCompany" placeholder="请选择" style="width: 100%">
						<el-option v-for="(item, index) in deliveryList" :key="index" :label="item.name" :value="item.type"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="deliveDialogShow = false">取 消</el-button>
				<el-button type="primary" @click="delivergoods">确 定</el-button>
			</div>
		</el-dialog>

		<el-dialog title="物流信息" :visible.sync="dialogLogistics">
			<el-timeline>
				<el-timeline-item v-for="(item, index) in logistics.list" :key="index" :timestamp="item.date">
					{{ item.status }}
				</el-timeline-item>
			</el-timeline>
		</el-dialog>

		<!-- 退款审核弹出框 -->
		<el-dialog title="退款审核" :visible.sync="drawbackAuditShow" width="500px">
			<el-form>
				<el-form-item label="退款原因:">
					<span>{{ drawbackAuditD.drawbackReason }}</span>
				</el-form-item>
				<el-form-item label="申请时间:">
					<span>{{ drawbackAuditD.applyTime }}</span>
				</el-form-item>
				<el-form-item label="退款件数:">
					<span>{{ drawbackAuditD.applyTime }}</span>
				</el-form-item>
				<el-form-item label="退款金额:">
					<span>{{ drawbackAuditD.drawbackAmount }}</span>
				</el-form-item>
				<el-form-item label="退款审核">
					<el-radio-group v-model="drawbackVerify">
						<el-radio :label="1">同意退款</el-radio>
						<el-radio :label="0">拒绝退款</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 详情弹出框 -->
		<el-dialog title="订单详情" :visible.sync="detailDialogShow" width="80%">
			<el-form label-width="100px" class="demo-ruleForm" :inline="true">
				<h3>消息详情</h3>
				<div style="max-width: 900px">
					<el-form-item label="订单类型:">
						<span>{{ orderType }}</span>
					</el-form-item>
					<el-form-item label="订单编号:">
						<span>{{ detail.orderSN }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="交易单号:">
						<span>{{ detail.tradeSN|default }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="下单时间:">
						<span>{{ detail.orderTime|default }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="收件人:">
						<span>{{ detail.addresseeName |default}}</span>
					</el-form-item>
					<el-form-item class="form-item" label="手机号:">
						<span>{{ detail.addresseePhoneNum|default }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="收件地址:">
						<span>{{ detail.addresseeAddress|default }}</span>
					</el-form-item>
				</div>
				<h3 style="margin-top: 45px">商品信息</h3>
				<div v-for="(item, index) in detail.skus" :key="index">
					<el-form-item class="form-item" label="商品名称:">
						<span>{{ item.commodityName }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="商品规格:">
						<span>{{ item.skuString | format_spec }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="下单数量:">
						<span>{{ item.commodityVolume }}</span>
					</el-form-item>
				</div>
				<h3 style="margin-top: 45px">支付信息</h3>
				<div>
					<el-form-item class="form-item" label="支付方式:">
						<span>{{ detail.orderMethod|default }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="付款时间:">
						<span>{{ detail.buttonTime|default }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="总计金额:">
						<span>{{ detail.totalPayment|default }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="优惠金额:">
						<span>{{ detail.salePromotion|default }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="实付金额:">
						<span>{{ detail.realPayment|default }}</span>
					</el-form-item>
				</div>
				<h3 style="margin-top: 45px">物流信息</h3>
				<div>
					<el-form-item class="form-item" label="发货时间:">
						<span>{{ detail.deliveryTime|default }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="物流方式:">
						<span>{{ detail.deliveryMethod|default  }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="物流单号:">
						<span>{{ detail.deliverySN|default  }}</span>
					</el-form-item>
				</div>
				<h3 style="margin-top: 45px">售后信息</h3>
				<div>
					<el-form-item class="form-item" label="退款原因:">
						<span>{{ detail.drawbackReason|default  }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="申请时间:">
						<span>{{ detail.applyTime |default }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="退款金额:">
						<span>{{ detail.drawbackAmount|default  }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="退款编号:">
						<span>{{ detail.drawbackSN|default  }}</span>
					</el-form-item>
					<el-form-item v-if="detail.drawbackVerify == 1" class="form-item" label="退款时间:">
						<span>{{ detail.drawbackTime |default }}</span>
					</el-form-item>
				</div>
			</el-form>
		</el-dialog>
	</cl-crud>
</template>

<script>
import { orderTypeDict, orderStatusDict } from '@/dict/index.js';
export default {
	computed: {
		orderType() {
			let res;
			orderTypeDict?.map((value, index, array) => {
				if (value.value == this.detail.orderType) {
					res = value.text;
				}
			});
			return res;
		}
	},
	data() {
		return {
			dialogLogistics: false,
			detailDialogShow: false,
			drawbackAuditShow: false,
			drawbackVerify: 1,
			drawbackAuditD: {},
			detail: {},
			deliveDialogShow: false,
			//
			tableColumn: [
				{
					type: 'index',
					align: 'center',
					label: '编号'
				},
				{
					label: '订单类型',
					width: 110,
					align: 'center',
					filters: orderTypeDict,
					prop: 'orderType',
					'filter-method': (value, row, column) => {
						console.log(value, row);
						if (value != -1) {
							return row.orderType == value;
						} else {
							return row;
						}
					},
					formatter(row) {
						let name = '-';
						orderTypeDict.map((value) => {
							if (row.orderType == value.value) {
								name = value.text;
							}
						});
						return name;
					}
				},
				{
					label: '订单编号',
					prop: 'orderSN',
					align: 'center'
				},
				{
					label: '商品信息',
					prop: 'skus',
					align: 'center'
				},
				{
					label: '价格￥',
					prop: 'totalPayment',
					align: 'center'
				},
				{
					label: '商品实付￥',
					prop: 'realPayment',
					align: 'center'
				},
				{
					label: '购买信息',
					prop: 'buyInfo',
					align: 'center'
				},
				{
					label: '下单时间',
					prop: 'orderTime',
					width: 90,
					align: 'center'
				},
				{
					label: '订单状态',
					width: 110,
					filters: orderStatusDict,
					prop: 'orderStatus',
					align: 'center',
					'filter-method': (value, row, column) => {
						if (value == -1) {
							return row;
						} else {
							return row.orderStatus == value;
						}
					},
					formatter(row) {
						let name = '-';
						orderStatusDict?.map((value) => {
							if (row.orderStatus == value.value) {
								name = value.text;
							}
						});
						return name;
					}
				},
				{
					label: '操作',
					width: 200,
					fixed: 'right',
					prop: 'op',
					align: 'center'
				}
			],
			deliveryForm: { deliveryCompany: '', deliverySN: '', orderId: '' },
			deliveryList: [],
			logistics: []
		};
	},

	methods: {
		onLoad({ ctx, app }) {
			ctx.service(this.$service.app.order).done();
			app.refresh();
		},
		//获取物流
		async getLogistics() {
			try {
				this.logistics = await this.$service.app.order.delivery({ orderId: this.deliveryForm.orderId });
				this.dialogLogistics = true;
			} catch (error) {
				this.$message.error(error);
			}
		},
		//发货
		async delivergoods() {
			try {
				await this.$service.system.deliveryCharge.add({ ...this.deliveryForm });
				this.$refs['crud'].refresh();
			} catch (error) {
				this.$message.error(error);
			}
		},
		//输入快递单号
		async getDelivery() {
			try {
				let res = await this.$service.system.deliveryCharge.listby({ deliverySN: this.deliveryForm.deliverySN });
				this.deliveryList = res;
			} catch (error) {
				this.$message.error(error);
			}
		},
		//获取详情
		async getEditInfo(id) {
			try {
				let res = await this.$service.app.order.info({ id });
				this.detail = res;
			} catch (error) {
				this.$message.error(error);
			}
		}
	}
};
</script>
