<template>
	<cl-crud @load="onLoad" ref="crud">
		<el-row type="flex" align="middle">
			<el-form class="table-form" :inline="true" :model="tableFlters" size="mini">
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
			</el-form>
		</el-row>

		<el-row>
			<cl-table :columns="tableColumn">

				<template #[`column-${slot.name}`]="{ scope }" v-for="slot in customSolts"> 
					<VideoDialog v-if="slot.type == 'video'" :url="scope.row[slot.name]" :key="slot.name"/>
					<ImageDialog v-if="slot.type == 'image'" :url="scope.row[slot.name]" :key="slot.name"/>
				</template>

				<template #column-pact="{ scope }"> 
					{{scope.row.pact?"已同意":'未同意'}}
				</template>
				<!-- 操作 -->
				<template #column-op="{ scope }">
					<el-button v-permission="$service.app.applyActivity.permission.audit" v-if="d.applyAudit == 1 && scope.row.auditStatus == 2" size="mini" type="text" @click="auditFn(scope.row.id)"
						>审核</el-button
					>
					<el-button size="mini" type="text" @click="$router.push({ name: '全部用户', params: { userId: scope.row.userId } })">详情</el-button>
				</template>
			</cl-table>
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
	components:{
		ImageDialog:()=>import('./ImageDialog'),
		VideoDialog:()=>import('./VideoDialog')
	},
	data() {
		let _this = this;
		return {
			addDialogShow: false,
			search: '',
			addDialogTitle: '',
			tableFlters: {
				auditStatus: -1,
				payStatus: -1,
				id: _this.$route.query.id
			},
			d: {},
			tableColumn: [
				{
					label: '操作',
					prop: 'op',
					width: 150,
					align: 'center'
				}
			],
			customSolts:[]
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
		auditStatusFormatter(num) {
			switch (num) {
				case 0:
					return '未通过';
					break;
				case 1:
					return '通过';
					break;
				case 2:
					return '待审核';
					break;
				default:
					break;
			}
		},
		//审核
		auditFn(id) {
			this.$confirm('是否通过该条报名数据?', '提示', {
				distinguishCancelAndClose: true,
				confirmButtonText: '通过',
				cancelButtonText: '不通过',
				type: 'warning'
			})
				.then(async () => {
					try {
						await this.$service.app.applyActivity.audit({ id, auditStatus: 1 });
						this.$message({
							type: 'success',
							message: '审核通过!'
						});
						this.$refs['crud'].refresh();
					} catch (error) {
						this.$message.error(error);
					}
				})
				.catch(async (action) => {
					if (action == 'close') {
						this.$message({
							type: 'info',
							message: '已取消'
						});
					} else {
						try {
							await this.$service.app.applyActivity.audit({ id, auditStatus: 0 });
							this.$message({
								type: 'success',
								message: '已拒绝!'
							});
							this.$refs['crud'].refresh();
						} catch (error) {
							this.$message.error(error);
						}
					}
				});
		},
		//
		onLoad({ ctx, app }) {
			ctx
				.service({
					page: async (params) => {
						let res = await this.$service.app.applyActivity.page(params);
						this.tableColumnFn(res.activity);
						this.d = res.activity;
						return res;
					}
				})
				.done();
			app.refresh({
				...this.tableFlters
			});
		},
		tableColumnFn(d) {
			let infoField = JSON.parse(d.infoField);
			if (this.tableColumn.length < 3) {
				if (d.applyAudit == 1) {
					this.tableColumn.unshift({
						label: '审核状态',
						prop: 'auditStatus',
						align: 'center',
						formatter(row) {
							switch (Number(row.auditStatus)) {
								case 0:
									return '未通过';
									break;
								case 1:
									return '通过';
									break;
								case 2:
									return '待审核';
									break;
								default:
									break;
							}
						}
					});
				}
				if (d.isPay == 1) {
					this.tableColumn.unshift({
						label: '支付状态',
						prop: 'orderStatus',
						align: 'center',
						formatter(row) {
							switch (Number(row.payStatus)) {
								case 0:
									return '未支付';
								default:
									return '支付成功';
									break;
							}
						}
					});
				}
				for (let i = infoField.length-1; i >=0 ; i--) {
					const e = infoField[i];
					let column = {
						label: e.label,
						prop: e.value,
						align: 'center'
					};
					if(['video','image'].includes(e.formType)){
						this.customSolts.push({
							type:e.formType,
							name:e.value
						})
					}
					this.tableColumn.unshift(column);
 
				}
				this.tableColumn.unshift({
					label: '系统姓名',
					prop: 'userName',
					align: 'center'
				});
				this.tableColumn.unshift({
					label: '系统手机号',
					prop: 'phoneNum',
					align: 'center'
				});
				this.tableColumn.unshift({
					label: '编号',
					prop: 'NO',
					width: 45,
					align: 'center',
					formatter(row) {
						return 'no.' + row.NO;
					}
				});
			}
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
