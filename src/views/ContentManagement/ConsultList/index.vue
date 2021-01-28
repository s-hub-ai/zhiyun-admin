<template>
	<cl-crud @load="onLoad" ref="crud">
		<el-row type="flex" align="middle">
			<cl-flex1></cl-flex1>
			<el-button
				v-permission="{
					or: [$service.app.consult.permission.add]
				}"
				size="mini"
				type="primary"
				@click="(addDialogTitle = '新增咨询'), (addDialogShow = true)"
				>新增</el-button
			>
		</el-row>

		<el-row>
			<cl-table :columns="tableColumn" :props="{ height: '70vh' }">
				<!-- 二维码 -->
				<template #column-qrCode="{ scope }">
					<el-image style="width: 100px; height: 100px" :src="scope.row.qrCode" :preview-src-list="[scope.row.qrCode]"> </el-image>
				</template>
				<!-- 状态-->
				<template #column-enableStatus="{ scope }">
					<el-switch
						v-if="checkPermFn($service.app.consult.permission.update)"
						size="large"
						active-text="启用"
						inactive-text="停用"
						v-model="scope.row.enableStatus"
						:active-value="1"
						:inactive-value="0"
						active-color="#13ce66"
						inactive-color="#ff4949"
						@change="updateTableRow(scope.row)"
					></el-switch>
					<el-switch
						v-else
						size="large"
						active-text="启用"
						inactive-text="停用"
						:value="scope.row.enableStatus"
						:active-value="1"
						:inactive-value="0"
						active-color="#13ce66"
						inactive-color="#ff4949"
					></el-switch>
				</template>
				<!-- 操作 -->
				<template #column-op="{ scope }">
					<el-button
						v-permission="{
							or: [$service.app.consult.permission.update]
						}"
						size="mini"
						type="text"
						@click="editDialog(scope.row.id)"
						>编辑</el-button
					>
					<el-button
						v-permission="{
							or: [$service.app.consult.permission.delete]
						}"
						size="mini"
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
		<el-dialog :title="addDialogTitle" :visible.sync="addDialogShow" @close="addDialogClose" width="800px">
			<add-dialog v-if="addDialogShow" ref="editDialog" :addDialogShow.sync="addDialogShow"></add-dialog>
		</el-dialog>
	</cl-crud>
</template>

<script>
import addDialog from './AddConsult';
import { checkPerm } from '@/cool';
export default {
	components: {
		addDialog
	},
	data() {
		return {
			addDialogShow: false,
			addDialogTitle: '',
			serach: '',
			tableColumn: [
				{
					type: 'index',
					label: '编号',
					align: 'center',
					width: 50
				},
				{
					label: '客服二维码',
					prop: 'qrCode',
					align: 'center'
				},
				{
					label: '咨询文案',
					prop: 'consultText',
					align: 'center'
				},
				{
					label: '状态',
					prop: 'enableStatus',
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
		//check
		checkPermFn(o) {
			return checkPerm(o);
		},
		//
		async updateTableRow(params) {
			try {
				await this.$service.app.consult.update(params);
				this.$refs['crud'].refresh();
			} catch (error) {
				this.$message.error(error);
			}
		},
		//编辑
		editDialog(id) {
			this.addDialogTitle = '编辑咨询信息';
			this.addDialogShow = true;
			this.$nextTick(() => {
				this.$refs.editDialog.getEditInfo(id);
			});
		},
		//删除
		deleteFn(id) {
			this.$confirm('是否删除该条咨询?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(async () => {
					try {
						await this.$service.app.consult.delete({ ids: id });
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
			ctx.service(this.$service.app.consult).done();
			app.refresh();
		},
		addDialogClose() {
			this.$refs.editDialog.resetForm('ruleForm');
			this.$refs['crud'].refresh();
		}
	}
};
</script>
