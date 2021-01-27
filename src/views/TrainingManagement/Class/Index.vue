<template>
	<cl-crud @load="onLoad" ref="crud">
		<el-row type="flex" align="middle">
			<cl-search-key placeholder="请输入班级名称"></cl-search-key>
			<cl-flex1></cl-flex1>
			<el-button
				v-permission="{
					or: [$service.app.commodity.ticket.permission.add]
				}"
				size="mini"
				type="primary"
				@click="addDialog()"
				>新增班级</el-button
			>
		</el-row>

		<el-row>
			<cl-table :columns="tableColumn" :props="{ height: '70vh' }">
				<template #column-cover="{ scope }">
					<el-image style="width: 100px; height: 100px" :src="scope.row.cover" :preview-src-list="[scope.row.commodityCover]"> </el-image>
				</template>
				 <!-- 操作 -->
				<template #column-op="{ scope }">
					<el-button
						v-permission="{
							or: [$service.training.classroom.permission.add]
						}"
						type="text"
						@click="editDialog(scope.row.id)"
						>编辑</el-button
					>
					<el-button
						v-permission="{
							or: [$service.training.classroom.permission.add]
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
		<el-dialog title="新增班级" :visible.sync="addDialogShow" width="1000px" @close="addDialogClose">
			<add-dialog v-if="addDialogShow" ref="editDialog" :addDialogShow.sync="addDialogShow"></add-dialog>
		</el-dialog>
		<el-dialog title="编辑学员" :visible.sync="studentListDialog" width="1000px" >
             <el-transfer v-loading="loading" filterable filter-placeholder="请输入用户手机号" :titles="['学生列表', '已选学生']" 
			 v-model="ruleForm.userArgs" :data="userList">
				<span slot-scope="{ option }">{{ option.label }} - {{ option.nickName }}</span>
			</el-transfer>
		</el-dialog>
	</cl-crud>
</template>

<script>
import addDialog from './CreateDialog';
export default {
	components: {
        addDialog,
	},
	data() {
		return {
			userList:[],
			ruleForm:{},
            addDialogShow:false,
            studentListDialog:false,
            tableColumn: [
				{
					label: '班级ID',
					prop: 'id',
					align: 'center',
					width: 100
				},
				{
					label: '班级名称',
					prop: 'name',
					align: 'center',
					width: 125
				},
				{
					label: '训练时间',
					align: 'trainingTime',
					prop: 'ticketName'
				},
				{
					label: '训练地点',
					align: 'trainingPosition',
					prop: 'ticketName'
				},
				{
					label: '学员',
					prop: 'member',
					align: 'center',
					width: 105
				},
				{
					label: '教练',
					prop: 'coach',
					align: 'center',
					width: 140
				},
				{
					label: '课程',
					prop: 'lessons',
					// sortable: true,
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
        }
	},

	methods: {
		 
		refresh() {
			this.$refs.crud.refresh({
				...this.tableFlters
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
		//删除
		deleteFn(ids) {
			this.$confirm('是否确定删除学员？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async () => {
					try {
						await this.$service.training.classroom.delete({ ids });
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
        addDialog() {
			this.addDialogTitle = '新增';
			this.addDialogShow = true;
			this.$nextTick(() => {
				this.$refs.editDialog.createSpec();
			});
        },
        addDialogClose() {
			this.$refs.editDialog.resetForm('ruleForm');
			this.$refs.editDialog.ruleForm = {};
			this.$refs['crud'].refresh();
		},
		onLoad({ ctx, app }) {
			ctx.service(this.$service.training.classroom).done();
			app.refresh({
				prop: 'createTime',
				order: 'desc'
			});
		}
	}
};
</script>