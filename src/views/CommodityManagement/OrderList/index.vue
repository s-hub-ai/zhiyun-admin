<template>
	<cl-crud @load="onLoad" ref="crud">
		<el-row type="flex" align="middle">
			<el-form :inline="true" :model="tableFlters" size="mini" class="demo-form-inline">
				<el-form-item
					label="订单类型
				"
				>
					<el-select style="width: 120px" v-model="tableFlters.orderType" placeholder="请选择" @change="$refs['crud'].refresh({ ...tableFlters })">
						<el-option v-for="(item, index) in orderTypeDict" :key="index" :label="item.text" :value="item.value"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="订单状态">
					<el-select style="width: 120px" v-model="tableFlters.orderStatus" placeholder="请选择" @change="$refs['crud'].refresh({ ...tableFlters })">
						<el-option v-for="(item, index) in orderStatusDict" :key="index" :label="item.text" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="下单时间">
					<el-date-picker
						v-model="orderTime"
						:default-time="['00:00:00', '24:00:00']"
						type="datetimerange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						value-format="yyyy-MM-dd HH:mm:ss"
						@change="orderTimeChange"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<cl-search-key v-model="search" placeholder="请输入订单编号或收件人手机号"></cl-search-key>
				</el-form-item>
				<el-form-item>
					<el-button v-permission="$service.app.order.permission.export" size="mini" type="primary" @click="exportExcelAll">导出</el-button>
				</el-form-item>
			</el-form>
		</el-row>

		<el-row>
			<cl-table :columns="tableColumn" :props="{ height: '70vh' }">
				<!-- 商品信息 -->
				<template #column-skus="{ scope }">
					<template v-if="scope.row.orderType != 3">
						<div v-for="(item, index) in scope.row.skus" :key="item.id">
							<el-divider v-if="index != 0" style="margin: 4px 0"></el-divider>
							<div>商品名称:{{ item.commodityName }}</div>
							<div>规格:{{ item.skuString | format_spec }}</div>
							<div>数量:{{ item.commodityVolume }}</div>
						</div>
					</template>
					<template v-else>
						<div>活动名称:{{ scope.row.activityTitle }}</div>
					</template>
				</template>
				<!-- 购买信息 -->
				<template #column-buyInfo="{ scope }">
					<div>收件人:{{ scope.row.contact }}</div>
					<div>手机号:{{ scope.row.phone }}</div>
					<div v-if="scope.row.city != null">收货地址:{{ scope.row.province.label + scope.row.city.label + scope.row.country.label }}{{scope.row.detail|default }}</div>
				</template>
				<!-- 操作 -->
				<template #column-op="{ scope }">
					<template v-if="scope.row.orderType != 3">
						<el-button v-permission="$service.system.delivery.permission.add" type="text" v-if="scope.row.orderStatus == 1" @click="(deliveryForm.orderId = scope.row.id), (deliveDialogShow = true)"
							>发货</el-button
						>
						<el-button v-permission="$service.system.delivery.permission.add" type="text" v-if="scope.row.orderStatus == 2" @click="(deliveryForm.orderId = scope.row.id), (deliveDialogShow = true)"
							>修改快递</el-button
						>
						<el-button v-permission="$service.app.order.permission.orderComplete" v-if="scope.row.orderStatus == 7" type="text" @click="orderComplete(scope.row.id)">出库 </el-button>
						<el-button v-permission="$service.app.order.permission.delivery" type="text" v-if="scope.row.orderStatus == 2" @click="(deliveryForm.orderId = scope.row.id), getLogistics()"
							>物流</el-button
						>
					</template>
					<el-button
						v-permission="$service.app.order.permission.offerRefund"
						type="text"
						v-if="scope.row.orderStatus == 4"
						@click="(deliveryForm.orderId = scope.row.id), (drawbackAuditShow = true), getEditInfo(scope.row.id)"
					>
						退款审核</el-button
					>
					<el-button v-permission="$service.app.order.permission.info" type="text" @click="(detailDialogShow = true), getEditInfo(scope.row.id)">详情</el-button>
				</template>
			</cl-table>
		</el-row>

		<el-row type="flex">
			<cl-flex1></cl-flex1>
			<cl-pagination></cl-pagination>
		</el-row>
		<!-- 发货弹出框 -->
		<el-dialog title="商品发货" :visible.sync="deliveDialogShow" width="400px" @close="$refs['deliveryForm'].resetFields()">
			<el-form :model="deliveryForm" label-width="90px" ref="deliveryForm">
				<el-form-item label="快递单号" required>
					<el-input v-model="deliveryForm.deliverySN" @blur="getDelivery()"></el-input>
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
				<template v-if="detail.orderType != 3">
					<el-form-item label="退款原因:">
						<span>{{ detail.drawbackReason }}</span>
					</el-form-item>
					<el-form-item label="申请时间:">
						<span>{{ detail.applyTime }}</span>
					</el-form-item>
					<el-form-item label="退款件数:">
						<span>{{ detail.applyTime }}</span>
					</el-form-item>
					<el-form-item label="退款金额:">
						<span>{{ detail.drawbackAmount }}</span>
					</el-form-item>
				</template>

				<el-form-item label="退款审核">
					<el-radio-group v-model="drawbackVerify">
						<el-radio :label="1">同意退款</el-radio>
						<el-radio :label="0">拒绝退款</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="drawbackAuditShow = false">取 消</el-button>
				<el-button type="primary" @click="(dialogFormVisible = false), drawbackAudit()">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 详情弹出框 -->
		<el-dialog title="订单详情" :visible.sync="detailDialogShow" width="80%" @close="detail = {}">
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
						<span v-if="detail.address">{{ detail.address.contact |default}}</span>
					</el-form-item>
					<el-form-item class="form-item" label="手机号:">
						<span v-if="detail.address">{{ detail.address.phone |default }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="收件地址:" v-if="detail.address">
						<span>{{ detail.address.province.label + detail.address.city.label + detail.address.country.label }}{{ detail.address.detail|default }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="订单备注:" v-if="detail.remark">
						<span>{{ detail.remark|default }}</span>
					</el-form-item>
					
				</div>
				<h3 style="margin-top: 45px">商品信息</h3>
				<div v-for="(item, index) in detail.sku" :key="index">
					<el-form-item class="form-item" label="商品名称:">
						<span>{{ item.commodityName }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="商品规格:">
						<span>{{ item.skuString | format_spec }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="下单数量:">
						<span>{{ item.commodityVolume }}</span>
					</el-form-item>
					<el-form-item v-if="detail.orderType == 4" class="form-item" label="球迷会名称:">
						<span>{{ detail.fanClubName }}</span>
					</el-form-item>
				</div>
				<h3 style="margin-top: 45px">支付信息</h3>
				<div>
					<el-form-item class="form-item" label="支付方式:">
						<span v-if="detail.payment">{{ paymentType|default }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="付款时间:">
						<span v-if="detail.payment">{{ detail.payment.paymentTime|default }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="总计金额:">
						<span v-if="detail.payment">{{ detail.payment.totalPayment|default }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="优惠金额:">
						<span v-if="detail.payment">{{ detail.payment.salePromotion|default }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="实付金额:">
						<span v-if="detail.payment">{{ detail.payment.realPayment|default }}</span>
					</el-form-item>
				</div>
				<h3 style="margin-top: 45px">物流信息</h3>
				<div>
					<el-form-item class="form-item" label="发货时间:">
						<span v-if="detail.delivery">{{ detail.delivery.deliveryTime|default }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="物流方式:">
						<span v-if="detail.delivery">{{ deliveryMethodType|default  }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="物流单号:">
						<span v-if="detail.delivery">{{ detail.delivery.deliverySN|default  }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="自提点:" v-if="detail.delivery && detail.delivery.pkStation && detail.pkStation!=''">
						<span >{{ detail.delivery.pkStation|default  }}</span>
					</el-form-item>
				</div>
				<h3 style="margin-top: 45px" v-if="detail.infoField">报名信息</h3>
				<div v-if="detail.infoField">
					<el-form-item class="form-item" v-for="item in infos" :key="item.label" :label="item.label">
						{{item.text}}
					</el-form-item>
				</div>
				<h3 style="margin-top: 45px">售后信息</h3>
				<div>
					<el-form-item class="form-item" label="退款原因:">
						<span v-if="detail.drawback">{{ detail.drawback.drawbackReason|default  }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="申请时间:">
						<span v-if="detail.drawback">{{ detail.drawback.applyTime |default }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="退款金额:">
						<span v-if="detail.drawback">{{ detail.drawback.drawbackAmount|default  }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="退款编号:">
						<span v-if="detail.drawback">{{ detail.drawback.drawbackSN|default  }}</span>
					</el-form-item>
					<el-form-item class="form-item" label="退款时间:">
						<span v-if="detail.drawback">{{ detail.drawback.updateTime |default }}</span>
					</el-form-item>
				</div>
				<h3 class="my-3">备注</h3>
				<div class="mb-3">
					<el-input
						type="textarea"
						:rows="3"
						placeholder="请输入内容"
						v-model="detail.businessRemark">
					</el-input>
				</div>
				<el-button type="primary" @click="updateRemark">修改备注</el-button>
			</el-form>
		</el-dialog>
	</cl-crud>
</template>

<script>
import * as _ from 'lodash';
import FileSaver from 'file-saver';
import XLSX from 'xlsx';
import { orderTypeDict, orderStatusDict, paymentDict, deliveryMethodDict } from '@/dict/index.js';
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
		},
		paymentType() {
			let res;
			paymentDict?.map((value, index, array) => {
				if (value.value == this.detail.payment?.paymentMethod) {
					res = value.text;
				}
			});
			return res;
		},
		deliveryMethodType() {
			let res;
			deliveryMethodDict?.map((value, index, array) => {
				if (value.value == this.detail.delivery?.deliveryMethod) {
					res = value.text;
				}
			});
			return res;
		}
	},
	data() {
		let _this = this;
		return {
			isDetailDisplayAll: false,
			orderTypeDict,
			orderStatusDict,
			dialogLogistics: false,
			detailDialogShow: false,
			drawbackAuditShow: false,
			search: '',
			drawbackVerify: 1,
			drawbackAuditD: {},
			detail: {},
			deliveDialogShow: false,
			orderTime: [],
			tableFlters: {
				startTime: '',
				endTime: '',
				orderType: -1,
				orderStatus: -1
			},
			//
			tableColumn: [
				{
					type: 'index',
					align: 'center',
					fixed: 'left',
					label: '编号'
				},
				{
					label: '订单类型',
					width: 85,
					align: 'center',
					prop: 'orderType',
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
					width: 185,
					fixed: 'left',
					align: 'center'
				},
				{
					label: '商品信息',
					prop: 'skus',
					align: 'left'
				},
				{
					label: '价格￥',
					prop: 'totalPayment',
					width: 90,
					align: 'center'
				},
				{
					label: '商品实付￥',
					width: 90,
					prop: 'realPayment',
					align: 'center'
				},
				{
					label: '购买信息',
					prop: 'buyInfo',
					align: 'left'
				},
				{
					label: '下单时间',
					prop: 'orderTime',
					width: 90,
					align: 'center'
				},
				{
					label: '订单状态',
					width: 90,
					prop: 'orderStatus',
					align: 'center',
					formatter(row) {
						let name = '-';
						orderStatusDict?.map((value) => {
							if (row.orderStatus == value.value) {
								name = value.text;
								if (row.orderType == 3 && value.value == 7) {
									name = '待使用';
								}
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
			deliveryForm: {
				deliveryCompany: '',
				deliverySN: '',
				orderId: ''
			},
			deliveryList: [],
			logistics: []
		};
	},

	methods: {
		
		expandDetail() {
			this.isDetailDisplayAll = true;
		},
		onLoad({ ctx, app }) {
			ctx.service(this.$service.app.order).done();
			app.refresh({
				...this.tableFlters
			});
		},
		formatSpec(value) {
			if (value) {
				let arr = [];
				let spec = value;
				try {
					spec = eval('(' + value + ')');

					for (let i in spec) {
						arr.push(spec[i]);
					}
					spec = arr.join(',');

					return spec;
				} catch (e) {
					console.log(e);
					return spec;
				}
			} else {
				return '默认规格';
			}
		},
		//导出
		async exportExcelAll() {
			/* 从表生成工作簿对象 */
			//var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
			let params = {
				...this.tableFlters,
				size: 99999,
				page: 1,
				sort: '',
				keyWord: this.search
			};
			console.log(params);
			let res = await this.$service.app.order.export(params);
			let data = [];
			res.list.forEach((e) => {
				let orderType = _.find(orderTypeDict, function (o) {
					if (o.value == e.orderType) {
						return o;
					}
				});
				let sku = '';
				if (e.skus) {
					for (let i = 0; i < e.skus.length; i++) {
						let item = e.skus[i];
						sku += `;商品名称:${item.commodityName}规格:${this.formatSpec(item.skuString)}数量:${item.commodityVolume}`;
					}
				}
				if (e.activityTitle) {
					sku += `活动名称:${e.activityTitle}`;
				}
				let address = `${e.province?.label || ''}${e.city?.label || ''}${e.country?.label || ''}${e.detail}` || '无';
				let orderStatus = _.find(orderStatusDict, function (o) {
					if (o.value == e.orderStatus) {
						return o;
					}
				});
				address = address == 'null' ? '无' : address;
				console.log(address);
				let obj = {
					订单编号: e.orderSN,
					订单类型: orderType?.text,
					商品信息: sku,
					价格: e.totalPayment,
					商品实付: e.realPayment,
					收件人: e.contact,
					手机号: e.phone,
					收件地址: address,
					下单时间: e.orderTime,
					订单状态: orderStatus?.text
				};
				data.push(obj);
			});
			var ws = XLSX.utils.json_to_sheet(data);
			/* 获取二进制字符串作为输出 */
			var wb = XLSX.utils.book_new(); /*新建book*/
			XLSX.utils.book_append_sheet(wb, ws, '订单信息'); /* 生成xlsx文件(book,sheet数据,sheet命名) */
			XLSX.writeFile(wb, '订单.xlsx'); /*写文件(book,xlsx文件名称)*/
		},
		//商品出库
		orderComplete(id) {
			try {
				this.$confirm('确定该商品已出库?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
					.then(async () => {
						await this.$service.app.order.orderComplete({
							orderId: id
						});
						this.$refs['crud'].refresh();
						this.$message({
							type: 'success',
							message: '出库成功！'
						});
					})
					.catch(() => {
						this.$message({
							type: 'info',
							message: '已取消'
						});
					});
			} catch (e) {
				this.$message.error(e);
			}
		},
		//退款审核确定
		async drawbackAudit() {
			if (this.drawbackVerify == 1) {
				this.$confirm('确定同意这笔订单的退款申请?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
					.then(async () => {
						try {
							await this.$service.app.order.offerRefund({
								id: this.deliveryForm.orderId
							});
							this.$message({
								type: 'success',
								message: '退款成功!'
							});
							this.$refs['crud'].refresh();
							this.drawbackAuditShow = false;
						} catch (error) {
							this.$message.error(error);
						}
					})
					.catch((e) => {
						this.$message({
							type: 'info',
							message: e
						});
					});
			} else {
				this.$confirm('确定拒绝这笔订单的退款申请?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					try {
						await this.$service.app.order.refuseRefund({
							id: this.deliveryForm.orderId
						});
						this.$message({
							type: 'success',
							message: '已拒绝!'
						});
						this.$refs['crud'].refresh();
						this.drawbackAuditShow = false;
					} catch (error) {
						this.$message.error(error);
					}
				});
			}
		},
		//下单日期选择
		orderTimeChange(e) {
			console.log(e);
			if (e == null) {
				this.tableFlters.startTime = '';
				this.tableFlters.endTime = '';
			} else {
				this.tableFlters.startTime = e[0];
				this.tableFlters.endTime = e[1];
			}

			this.$refs['crud'].refresh({
				...this.tableFlters
			});
		},
		//获取物流
		async getLogistics() {
			let _this = this;
			try {
				this.logistics = await _this.$service.app.order.delivery({
					orderId: this.deliveryForm.orderId
				});
				this.dialogLogistics = true;
				this.$message({
					type: 'success',
					message: '发货成功'
				});
			} catch (error) {
				this.$message.error(error);
			}
		},
		//发货
		async delivergoods() {
			try {
				if (this.deliveryForm.deliverySN == '') {
					this.$message.error('请输入快递单号');
					return;
				}
				if (this.deliveryForm.deliveryCompany == '') {
					this.$message.error('请选择快递公司');
					return;
				}
				if (this.deliveryForm.orderId == '') {
					this.$message.error('订单id为空');
					return;
				}
				await this.$service.system.delivery.add({
					...this.deliveryForm
				});
				this.$refs['crud'].refresh();
				this.deliveDialogShow = false;
			} catch (error) {
				this.$message.error(error);
			}
		},
		//输入快递单号
		async getDelivery() {
			try {
				let res = await this.$service.system.delivery.listby({
					deliverySN: this.deliveryForm.deliverySN
				});
				this.deliveryList = res;
			} catch (error) {
				this.$message.error(error);
			}
		},
		//获取详情
		async updateRemark(){
			this.$service.app.order.update({
				id:this.detail.id,
				businessRemark:this.detail.businessRemark
			})
			this.$message.success('保存成功')
		},
		async getEditInfo(id) {
			try {
				let res = await this.$service.app.order.info({
					id
				});
				if (res.address) {
					res.address.province = JSON.parse(res.address.province);
					res.address.city = JSON.parse(res.address.city);
					res.address.country = JSON.parse(res.address.country);					
				}
				const {formInfo,infoField} = res;
				if(formInfo && infoField){
					const info = JSON.parse(formInfo);
					const fields = JSON.parse(infoField);
					const infos = [];
					fields.forEach(el=>{
						infos.push({
							label:el.label,
							text:info[el.value]
						})
					});
					this.infos = infos
				}

				this.detail = res;
			} catch (error) {
				this.$message.error(error);
			}
		}
	}
};
</script>
<style lang="scss" scoped>
::v-deep .el-divider--horizontal {
	margin: 5px 0;
}

::v-deep .el-form-item {
	margin: 0 10px 10px 0;
}
</style>
