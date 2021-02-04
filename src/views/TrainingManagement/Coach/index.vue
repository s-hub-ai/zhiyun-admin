<template>
	<cl-crud @load="onLoad"  ref="crud">
		<el-row type="flex" align="middle">
			<cl-search-key field="name" v-model="searchName" placeholder="请输入教练名字"></cl-search-key>
			<cl-flex1></cl-flex1>
			<el-button
				v-permission="{
					or: [$service.training.coach.permission.add]
				}"
				size="mini"
				type="primary"
				@click="addDialog()"
				>新增教练</el-button
			>
		</el-row>
		<el-row type="flex" align="middle">

			<cl-flex1></cl-flex1>
			<CoachExport :searchName="searchName"/>
		</el-row>

		<el-row>
			<cl-table :columns="tableColumn" :props="{ height: '70vh' }">
				<template #column-portrait="{ scope }">
					<cl-avatar shape="square" size="medium" :src="scope.row.portrait | default_avatar" :style="{ margin: 'auto' }"> </cl-avatar>
				</template>
				 <template #column-op="{ scope }">
					<el-button
						size="mini"
						v-permission="{
							or: [$service.training.coach.permission.add]
						}"
						type="text"
						@click="editDialog(scope.row.id)"
						>编辑</el-button
					>
					<el-button
					size="mini"
						v-permission="{
							or: [$service.training.coach.permission.add]
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
import addDialog from './CreateDialog';
export default {
	components: {
		addDialog,
		CoachExport:()=>import('./CoachExport')
	},
	data() {
		return {
			addDialogShow:false,
			addDialogTitle:"新增教练",
			searchName:"",
			tableColumn:[
				{
					label: '教练ID',
					prop:'id',
					align: 'center',
					width:100
				},
				{
					label: '头像',
					prop:'portrait',
					align: 'center',
				},
				{
					label: '姓名',
					prop:'name',
					align: 'center',
				},
				{
					label: '等级',
					prop:'level',
					align: 'center',
				},
				{
					label: '手机号',
					prop: 'phoneNum',
					align: 'center',
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
			this.$refs.crud.refresh( );
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
			this.$confirm('是否确定删除教练？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async () => {
					try {
						await this.$service.training.coach.delete({ ids });
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
        },
        addDialogClose() {
			this.$refs.editDialog.resetForm('ruleForm');
			this.$refs.editDialog.ruleForm = {};
			this.$refs['crud'].refresh();
		},
		onLoad({ ctx, app }) {
			ctx.service(this.$service.training.coach).done();
			app.refresh({
				prop: 'createTime',
				order: 'desc'
			});
		}
	}
};

</script>