<template>
	<cl-crud @load="onLoad" ref="crud">
		<el-row type="flex" align="middle">
			<cl-search-key placeholder="请输入消息标题"></cl-search-key>
			<cl-flex1></cl-flex1>
			<el-button size="mini" type="primary" @click="addDialogShow = true">新增消息</el-button>
		</el-row>

		<el-row>
			<cl-table :columns="tableColumn" :props="{ height: '70vh' }">
				<!-- 操作 -->
				<template #column-op="{ scope }">
					<el-button size="mini" type="text" @click="editDialog(scope.row.id)">查看详情</el-button>
				</template>
			</cl-table>
		</el-row>

		<el-row type="flex">
			<cl-flex1></cl-flex1>
			<cl-pagination></cl-pagination>
		</el-row>

		<!-- 新增编辑弹出框 -->
		<el-dialog title="新增消息" :visible.sync="addDialogShow" width="1000px" @close="addDialogClose">
			<add-dialog ref="editDialog" :addDialogShow.sync="addDialogShow"></add-dialog>
		</el-dialog>

		<!-- 详情弹出框 -->
		<el-dialog title="推送详情" :visible.sync="addDialogDetailShow" width="1000px" @close="detailDialogClose">
			<detail-dialog ref="detailDialog" :addDialogShow.sync="addDialogDetailShow"></detail-dialog>
		</el-dialog>
	</cl-crud>
</template>

<script>
import addDialog from './AddMessage';
import detailDialog from './MessageDetail';
export default {
	components: {
		addDialog,
		detailDialog
	},
	data() {
		return {
			addDialogShow: false,
			addDialogDetailShow: false,
			tableColumn: [
				{
					type: 'index',
					label: '编号',
					align: 'center',
					width: 50
				},
				{
					label: '消息标题',
					prop: 'messageTitle',
					align: 'center'
				},
				{
					label: '消息内容',
					prop: 'messageContent',
					align: 'center'
				},
				{
					label: '推送时间',
					prop: 'pushTime',
					align: 'center'
				},
				{
					label: '推送方式',
					prop: 'pushMethod',
					align: 'center',
					formatter(row) {
						switch (Number(row.pushMethod)) {
							case -1:
								return '全部';
								break;
							case 1:
								return '站内信';
								break;
							case 2:
								return '短信';
								break;
							default:
								break;
						}
					}
				},
				{
					label: '操作',
					prop: 'op',
					width: 100,
					align: 'center'
				}
			]
		};
	},

	methods: {
		//删除
		deleteFn(id) {
			this.$confirm('此操作将删除该条消息推送, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
		},
		//编辑
		editDialog(id) {
			this.addDialogDetailShow = true;
			this.$nextTick(() => {
				this.$refs.detailDialog.getEditInfo(id);
			});
		},
		onLoad({ ctx, app }) {
			ctx.service(this.$service.app.message).done();
			app.refresh();
		},
		addDialogClose() {
			this.$refs.editDialog.resetForm('ruleForm');
			this.$refs.editDialog.ruleForm = {};
			this.$refs['crud'].refresh();
		},
		detailDialogClose() {
			this.$refs.detailDialog.ruleForm = {};
			this.$refs['crud'].refresh();
		}
	}
};
</script>
