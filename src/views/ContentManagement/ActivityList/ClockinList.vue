<template>
	<cl-crud @load="onLoad" ref="crud">
		<el-row type="flex" align="middle">
			<!-- 			<el-form class="table-form" :inline="true" :model="tableFlters" size="mini">
				<el-form-item label="审核状态" v-if="d.applyAudit == 1">
					<el-select style="width: 120px" v-model="tableFlters.auditStatus" placeholder="请选择" @change="$refs['crud'].refresh({ ...tableFlters })">
						<el-option label="全部" :value="-1"></el-option>
						<el-option label="未通过" :value="0"></el-option>
						<el-option label="通过" :value="1"></el-option>
						<el-option label="待审核" :value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="支付状态" v-if="d.isPay == 1">
					<el-select style="width: 120px" v-model="tableFlters.payStatus" placeholder="请选择" @change="$refs['crud'].refresh({ ...tableFlters })">
						<el-option label="全部" :value="-1"></el-option>
						<el-option label="未支付" :value="0"></el-option>
						<el-option label="支付成功" :value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<cl-search-key v-model="search" placeholder="请输入关键字"></cl-search-key>
				</el-form-item>
				<el-form-item>
					<el-button size="mini" type="primary" @click="exportExcelAll">导出</el-button>
				</el-form-item>
			</el-form> -->
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
import FileSaver from 'file-saver';
import XLSX from 'xlsx';
export default {
	data() {
		let _this = this;
		return {
			tableFlters: {
				activityId: _this.$route.query.id
			},
			d: {},
			tableColumn: [
				{
					label: '编号',
					type: 'index',
					align: 'center'
				},
				{
					label: '昵称',
					prop: 'nickName',
					align: 'center'
				},
				{
					label: '打卡地址',
					prop: 'address',
					align: 'center'
				},
				{
					label: '经度',
					prop: 'lat',
					align: 'center'
				},
				{ label: '纬度', prop: 'lng', align: 'center' },
				{ label: '打卡时间', prop: 'createTime', align: 'center' }
			]
		};
	},

	methods: {
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
			let res = await this.$service.app.applyActivity.page(params);
			let data = [];
			let tableColumn = this.tableColumn;

			res.list.forEach((e) => {
				let obj = {};
				e.auditStatus = this.auditStatusFormatter(e.auditStatus);
				e.NO = 'no.' + e.NO;
				if (e.orderStatus) {
					e.orderStatus = e.orderStatus == 0 ? '未支付' : '支付完成';
				}
				for (let i = 0; i < tableColumn.length; i++) {
					const e2 = tableColumn[i];
					obj[e2.label] = e[e2.prop];
				}
				delete obj['操作'];
				console.log(obj);
				data.push(obj);
			});

			console.log(data);
			var ws = XLSX.utils.json_to_sheet(data);
			/* 获取二进制字符串作为输出 */
			var wb = XLSX.utils.book_new(); /*新建book*/
			XLSX.utils.book_append_sheet(wb, ws, '活动报名详情'); /* 生成xlsx文件(book,sheet数据,sheet命名) */
			XLSX.writeFile(wb, '活动报名.xlsx'); /*写文件(book,xlsx文件名称)*/
		},
		//
		onLoad({ ctx, app }) {
			ctx
				.service({
					page: async (params) => {
						let res = await this.$service.app.activity.clockinList(params);
						return res;
					}
				})
				.done();
			app.refresh({
				...this.tableFlters
			});
		}
		//
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
