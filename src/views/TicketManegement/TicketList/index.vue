<template>
	<cl-crud @load="onLoad" ref="crud">
		<el-row type="flex" align="middle">
			<cl-search-key placeholder="请输入票务名称"></cl-search-key>
			<cl-flex1></cl-flex1>
			<!-- 			<el-button type="text" size="mini" icon="el-icon-setting" @click="$router.push({ path: 'DeliveryCharge' })">全局设置</el-button> -->
			<el-button
				v-permission="{
					or: [$service.app.commodity.ticket.permission.add]
				}"
				size="mini"
				type="primary"
				@click="addDialog()"
				>新增票务</el-button
			>
		</el-row>

		<el-row>
			<cl-table :columns="tableColumn" :props="{ height: '70vh' }">
				<!-- 商品封面 -->
				<template #column-cover="{ scope }">
					<el-image style="width: 100px; height: 100px" :src="scope.row.cover" :preview-src-list="[scope.row.commodityCover]"> </el-image>
				</template>
				<!-- 状态 -->
				<template #column-commodityStatus="{ scope }">
					<el-switch
						v-if="checkPermFn($service.app.commodity.ticket.permission.update)"
						v-model="scope.row.commodityStatus"
						@change="updateStatus(scope.row)"
						:active-value="1"
						:inactive-value="0"
						active-color="#13ce66"
						inactive-color="#ff4949"
						active-text="上架"
						inactive-text="下架"
					>
					</el-switch>
					<el-switch v-else :value="scope.row.commodityStatus" :active-value="1" :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949" active-text="上架" inactive-text="下架">
					</el-switch>
				</template>
				<!-- 排序 -->
				<template #column-commodityOrder="{ scope }">
					<el-input-number
						v-if="checkPermFn($service.app.commodity.ticket.permission.update)"
						style="width: 100px"
						size="mini"
						v-model="scope.row.commodityOrder"
						@change="updateCommodityOrder(scope.row)"
						:min="1"
					></el-input-number>
					<el-input-number v-else style="width: 100px" size="mini" :value="scope.row.commodityOrder" :min="1"></el-input-number>
				</template>
				<!-- 操作 -->
				<template #column-op="{ scope }">
					<el-button
						v-permission="{
							or: [$service.app.commodity.ticket.permission.update]
						}"
						type="text"
						@click="editDialog(scope.row.id)"
						>编辑</el-button
					>
					<el-button
						v-permission="{
							or: [$service.app.commodity.ticket.permission.delete]
						}"
						type="text"
						@click="deleteFn(scope.row.id)"
						>删除</el-button
					>
				</template>
			</cl-table>
		</el-row>

		<el-row type="flex">
			<cl-flex1></cl-flex1>
			<cl-pagination></cl-pagination>
		</el-row>

		<!-- 新增编辑弹出框 -->
		<el-dialog :title="addDialogTitle" :visible.sync="addDialogShow" width="1000px" @close="addDialogClose">
			<add-dialog v-if="addDialogShow" ref="editDialog" :addDialogShow.sync="addDialogShow"></add-dialog>
		</el-dialog>
	</cl-crud>
</template>

<script>
import { ticketTypeDict } from '@/dict/index.js';
import addDialog from './AddTicket';
import { checkPerm } from '@/cool';
export default {
	components: {
		addDialog
	},
	data() {
		return {
			addDialogShow: false,
			addDialogTitle: '',
			tableFlters: {
				prop: 'createTime',
				order: 'desc'
			},
			tableColumn: [
				{
					type: 'index',
					label: '编号',
					align: 'center',
					width: 50
				},
				{
					label: '封面',
					prop: 'cover',
					align: 'center',
					width: 125
				},
				{
					label: '票务名称',
					align: 'center',
					prop: 'ticketName'
				},
				{
					label: '票务类型',
					prop: 'ticketType',
					formatter(row) {
						let res = '-';
						ticketTypeDict.map((v) => {
							if (row.ticketType == v.value) {
								res = v.text;
							}
						});
						return res;
					},
					align: 'center',
					width: 105
				},
				{
					label: '状态',
					prop: 'commodityStatus',
					filters: [
						{ value: 0, text: '下架' },
						{ value: 1, text: '上架' }
					],
					'filter-method': (value, row, column) => {
						return row[column['property']] === value;
					},
					align: 'center',
					width: 140
				},
				{
					label: '排序',
					prop: 'commodityOrder',
					sortable: true,
					align: 'center',
					width: 125
				},
				{
					label: '操作',
					prop: 'op',
					align: 'center',
					fixed: 'right',
					width: 120
				}
			]
		};
	},

	methods: {
		//check
		checkPermFn(o) {
			return checkPerm(o);
		},
		//新增
		addDialog() {
			this.addDialogTitle = '新增';
			this.addDialogShow = true;
			this.$nextTick(() => {
				this.$refs.editDialog.createSpec();
			});
		},
		//编辑
		editDialog(id) {
			this.addDialogTitle = '编辑';
			this.addDialogShow = true;
			this.$nextTick(() => {
				this.$refs.editDialog.getEditInfo(id);
			});
		},
		//删除商品
		deleteFn(ids) {
			this.$confirm('此操作将永久删除该票务, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(async () => {
					try {
						await this.$service.app.commodity.ticket.delete({ ids });
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.$refs['crud'].refresh();
					} catch (error) {
						this.$message.error(error);
					}
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
		},
		//编辑上架状态
		async updateStatus(params) {
			console.log(params);
			try {
				let { id, specification, commodityStatus } = params;
				console.log(id);
				await this.$service.app.commodity.ticket.update({ id, specification, commodityStatus });
				this.$message({
					message: '修改成功',
					type: 'success'
				});
			} catch (error) {
				this.$message.error(error);
			}
		},
		//编辑手动销量

		async updateFakeSaleVolume(params) {
			console.log(params);
			try {
				let { id, goodsType, fakeSalesVolume } = params;
				console.log(id);
				await this.$service.app.commodity.common.updateFakeSaleVolume({ id, goodsType, fakeSalesVolume });
				this.$message({
					message: '修改成功',
					type: 'success'
				});
			} catch (error) {
				this.$message.error(error);
			}
		},
		//编辑排序
		async updateCommodityOrder(params) {
			console.log(params);
			try {
				let { id, goodsType, commodityOrder } = params;
				console.log(id);
				await this.$service.app.commodity.common.updateCommodityOrder({ id, goodsType, commodityOrder });
				this.$message({
					message: '修改成功',
					type: 'success'
				});
			} catch (error) {
				this.$message.error(error);
			}
		},
		addDialogClose() {
			this.$refs.editDialog.resetForm('ruleForm');
			this.$refs.editDialog.ruleForm = {};
			this.$refs['crud'].refresh();
		},
		refresh() {
			this.$refs.crud.refresh({
				...this.tableFlters
			});
		},
		onLoad({ ctx, app }) {
			ctx.service(this.$service.app.commodity.ticket).done();
			app.refresh({
				prop: 'createTime',
				order: 'desc'
			});
		}
	}
};
</script>
<style lang="scss" scoped>
/* ::v-deep .el-form-item {
	margin: 0 10px 0 0;
} */
</style>
