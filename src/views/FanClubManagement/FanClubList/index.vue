<template>
	<cl-crud @load="onLoad" ref="crud">
		<el-row type="flex" align="middle">
			<cl-search-key v-permission="$service.app.fanClub.permission.page" placeholder="请输入球迷会名称"></cl-search-key>
			<cl-flex1></cl-flex1>
			<el-button v-permission="$service.app.fanClub.permission.add" size="mini" type="primary" @click="(addDialogTitle = '新增球迷会'), (addDialogShow = true)">新增球迷会</el-button>
		</el-row>

		<el-row>
			<cl-table :columns="tableColumn" :props="{ height: '70vh' }">
				<!-- 封面 -->
				<template #column-fanClubCover="{ scope }">
					<el-image style="width: 100px; height: 100px" :src="scope.row.fanClubCover"> </el-image>
				</template>
				<!-- 操作 -->
				<template #column-op="{ scope }">
					<el-button v-permission="$service.app.fanClub.permission.update" size="mini" type="text" @click="editDialog(scope.row.id)">编辑</el-button>
					<el-button v-permission="$service.app.fanClub.permission.delete" size="mini" type="text" @click="deleteFn(scope.row.id)">删除</el-button>
				</template>
			</cl-table>
		</el-row>

		<el-row type="flex">
			<cl-flex1></cl-flex1>
			<cl-pagination></cl-pagination>
		</el-row>

		<!-- 新增编辑弹出框 -->
		<el-dialog :title="addDialogTitle" :visible.sync="addDialogShow" @close="addDialogClose" width="400px">
			<add-dialog ref="editDialog" :addDialogShow.sync="addDialogShow"></add-dialog>
		</el-dialog>
	</cl-crud>
</template>

<script>
import addDialog from './AddFanClub';
export default {
	components: {
		addDialog
	},
	computed: {
		fanClubRegionList() {
			return this.$store.state.common.fanClubRegion;
		}
	},
	data() {
		let _this = this;
		return {
			addDialogShow: false,
			addDialogTitle: '',
			tableColumn: [
				{
					type: 'index',
					label: '编号',
					align: 'center',
					width: 50
				},
				{
					label: '球迷会封面',
					prop: 'fanClubCover',
					align: 'center'
				},
				{
					label: '球迷会名称',
					prop: 'fanClubName',
					align: 'center'
				},
				{
					label: '区域',
					prop: 'fanClubRegion',
					align: 'center',
					formatter(row) {
						let regionName = '-';
						_this.fanClubRegionList.map((value) => {
							if (row.fanClubRegion == value.id) {
								regionName = value.regionName;
							}
						});
						return regionName;
					}
				},
				{
					label: '负责人',
					prop: 'personLiable',
					align: 'center'
				},
				{
					label: '手机号',
					prop: 'phoneNum',
					align: 'center'
				},
				{
					label: '成员人数',
					prop: 'peopleNum',
					sortable: true,
					align: 'center'
				},
				{
					label: '积分排名',
					prop: 'pointsOrder',
					sortable: true,
					align: 'center'
				},
				{
					label: '积分总数',
					prop: 'accumulatedPoints',
					align: 'center'
				},
				{
					label: '操作',
					prop: 'op',
					align: 'center'
				}
			]
		};
	},

	methods: {
		//编辑
		editDialog(id) {
			this.addDialogTitle = '编辑球迷会';
			this.addDialogShow = true;
			this.$nextTick(() => {
				this.$refs.editDialog.getEditInfo(id);
			});
		},
		//删除
		deleteFn(id) {
			this.$confirm('是否删除该球迷会?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(async () => {
					try {
						await this.$service.app.fanClub.delete({ ids: id });
						await this.addDialogClose();
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
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
		onLoad({ ctx, app }) {
			ctx.service(this.$service.app.fanClub).done();
			app.refresh({
				order: 'ASC'
			});
		},
		addDialogClose() {
			this.$refs.editDialog.resetForm('ruleForm');
			this.$refs.editDialog.ruleForm = {};
			this.$refs['crud'].refresh();
		}
	}
};
</script>
