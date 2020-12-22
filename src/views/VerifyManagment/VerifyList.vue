<template>
	<cl-crud @load="onLoad" ref="crud">
		<el-row type="flex" align="middle">
			<el-form class="table-form" :inline="true" :model="tableFlters" size="mini">
				<el-form-item label="核销类型">
					<el-select style="width: 120px" v-model="tableFlters.verifyType" placeholder="请选择" @change="$refs['crud'].refresh({ ...tableFlters })">
						<el-option v-for="item in orderTypeDict" :key="item.value" :label="item.text" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<cl-search-key placeholder="请输入订单编号或者用户ID"></cl-search-key>
				</el-form-item>
			</el-form>
		</el-row>

		<el-row>
			<cl-table :columns="tableColumn"> </cl-table>
		</el-row>

		<el-row type="flex">
			<cl-flex1></cl-flex1>
			<cl-pagination></cl-pagination>
		</el-row>
	</cl-crud>
</template>

<script>
import { orderTypeDict } from '@/dict/index.js';
export default {
	data() {
		return {
			orderTypeDict,
			tableFlters: {
				verifyType: -1
			},
			tableColumn: [
				{
					type: 'index',
					align: 'center'
				},
				{
					label: '核销类型',
					prop: 'verifyType',
					align: 'center',
					formatter(row) {
						let res;
						orderTypeDict.map((value, index, array) => {
							if (row.verifyType == value.value) {
								res = value.text;
							}
						});
						return res;
					}
				},
				{
					label: '订单编号/用户ID',
					align: 'center',
					prop: 'orderSN',
					formatter(row) {
						return row.orderSN || row.userId;
					}
				},
				{
					label: '核销时间',
					align: 'center',
					prop: 'verifyTime'
				},
				{
					label: '核销员',
					align: 'center',
					prop: 'verifyUserName'
				}
			]
		};
	},

	methods: {
		onLoad({ ctx, app }) {
			ctx.service(this.$service.app.verifyOrder).done();
			app.refresh({
				...this.tableFlters
			});
		}
	}
};
</script>
<style scoped lang="scss">
.table-form {
	::v-deep .el-form-item {
		margin: 0 10px 0 0;
	}
}
</style>
