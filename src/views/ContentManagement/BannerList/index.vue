<template>
	<cl-crud @load="onLoad" ref="crud">
		<el-row type="flex" align="middle">
			<cl-search-key placeholder="请输入轮播图名称"></cl-search-key>
			<cl-flex1></cl-flex1>
			<el-button size="mini" type="primary" @click="(addDialogTitle = '新增轮播图'), (addDialogShow = true)">新增轮播</el-button>
		</el-row>

		<el-row>
			<cl-table :columns="tableColumn" :props="{ height: '70vh' }">
				<!-- 轮播图-->
				<template #column-bannerImg="{ scope }">
					<el-image style="width: 175px; height: 75px" :preview-src-list="[scope.row.bannerImg]" :src="scope.row.bannerImg"> </el-image>
				</template>
				<!-- 状态-->
				<template #column-enableStauts="{ scope }">
					<el-switch v-model="scope.row.enableStatus" :active-value="1" :inactive-value="0" @change="updateTableRow(scope.row)"></el-switch>
				</template>
				<!-- 排序 -->
				<template #column-sort="{ scope }">
					<el-input-number style="width: 100px" size="mini" v-model="scope.row.sort" @change="updateTableRow(scope.row)"></el-input-number>
				</template>

				<!-- 操作 -->
				<template #column-op="{ scope }">
					<el-button size="mini" type="text" @click="editDialog(scope.row.id)">编辑</el-button>
					<el-button size="mini" type="text" @click="deleteFn(scope.row.id)">删除</el-button>
				</template>
			</cl-table>
		</el-row>

		<el-row type="flex">
			<cl-flex1></cl-flex1>
			<cl-pagination></cl-pagination>
		</el-row>

		<!-- 新增编辑弹出框 -->
		<!-- 新增编辑弹出框 -->
		<el-dialog :title="addDialogTitle" :visible.sync="addDialogShow" @close="addDialogClose" width="800px">
			<add-dialog v-if="addDialogShow" ref="editDialog" :addDialogShow.sync="addDialogShow"></add-dialog>
		</el-dialog>
	</cl-crud>
</template>

<script>
import addDialog from './AddBanner';
export default {
	components: {
		addDialog
	},
	data() {
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
					label: '轮播图',
					prop: 'bannerImg',
					align: 'center',
					width: 200
				},
				{
					label: '名称',
					prop: 'bannerName',
					align: 'center'
				},
				{
					label: '位置',
					prop: 'bannerShowLocation',
					align: 'center',
					formatter(row) {
						if (row.bannerShowLocation == 1) {
							return '首页';
						}
						if (row.bannerShowLocation == 2) {
							return '商城';
						}
						if (row.bannerShowLocation == 3) {
							return '球票';
						}
					}
				},
				{
					label: '类型',
					prop: 'bannerLinkType',
					align: 'center',
					formatter(row) {
						if (row.bannerLinkType == 1) {
							return '内部链接';
						}
						if (row.bannerLinkType == 2) {
							return '外部链接';
						}
					}
				},
				{
					label: '状态',
					prop: 'enableStauts',
					align: 'center',
					width: 80
				},
				{
					label: '排序',
					prop: 'sort',
					align: 'center',
					width: 130
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
		//
		async updateTableRow(params) {
			try {
				await this.$service.app.carousel.update(params);
			} catch (error) {
				this.$message.error(error);
			}
		},
		//
		editDialog(id) {
			this.addDialogTitle = '编辑轮播';
			this.addDialogShow = true;
			this.$nextTick(() => {
				this.$refs.editDialog.getEditInfo(id);
			});
		},
		//删除
		deleteFn(id) {
			this.$confirm('是否删除该条轮播数据?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(async () => {
					try {
						await this.$service.app.carousel.delete({ ids: id });
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
			ctx.service(this.$service.app.carousel).done();
			app.refresh();
		},
		addDialogClose() {
			this.$refs.editDialog.resetForm('ruleForm');
			this.$refs['crud'].refresh();
		}
	}
};
</script>
