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
					<cl-search-key placeholder="请输入关键字"></cl-search-key>
				</el-form-item>
			</el-form>
		</el-row>

		<el-row>
			<cl-table :columns="tableColumn">
				<!-- 操作 -->
				<template #column-op="{ scope }">
					<el-button v-if="d.applyAudit == 1 && scope.row.auditStatus == 2" size="mini" type="text" @click="auditFn(scope.row.id)">审核</el-button>
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
export default {
	data() {
		let _this = this;
		return {
			addDialogShow: false,
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
			]
		};
	},

	methods: {
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
				for (let i = 0; i < infoField.length; i++) {
					const e = infoField[i];
					let column = {
						label: e.label,
						prop: e.value,
						align: 'center'
					};
					this.tableColumn.unshift(column);
				}
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
