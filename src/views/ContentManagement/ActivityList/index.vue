<template>
	<cl-crud @load="onLoad" ref="crud">
		<el-row type="flex" align="middle">
			<el-form class="table-form" :inline="true" :model="tableFlters" size="mini">
				<el-form-item label="是否打卡">
					<el-select style="width: 120px" v-model="tableFlters.isClockin" placeholder="请选择" @change="$refs['crud'].refresh({ ...tableFlters })">
						<el-option label="全部" value=""></el-option>
						<el-option label="否" :value="0"></el-option>
						<el-option label="是" :value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="活动状态">
					<el-select style="width: 120px" v-model="tableFlters.activityStatus" placeholder="请选择" @change="$refs['crud'].refresh({ ...tableFlters })">
						<el-option label="全部" :value="-1"></el-option>
						<el-option label="未开始" :value="0"></el-option>
						<el-option label="进行中" :value="1"></el-option>
						<el-option label="已结束" :value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<cl-search-key placeholder="请输入活动名称"></cl-search-key>
				</el-form-item>
			</el-form>
			<cl-flex1></cl-flex1>
			<el-button size="mini" type="primary" @click="(addDialogTitle = '新增活动'), (addDialogShow = true)">新增活动</el-button>
		</el-row>

		<el-row>
			<cl-table :columns="tableColumn">
				<!-- 活动时间段 -->
				<template #column-activityTime="{ scope }">
					<div>{{ scope.row.activityStartTime }}</div>
					<div>至</div>
					<div>{{ scope.row.activityEndTime }}</div>
				</template>
				<!-- 报名时间段 -->
				<template #column-applyTime="{ scope }">
					<div>{{ scope.row.applyStartTime }}</div>
					<div>至</div>
					<div>{{ scope.row.applyEndTime }}</div>
				</template>
				<!-- 操作 -->
				<template #column-op="{ scope }">
					<el-button size="mini" type="text" @click="$router.push({ path: 'ApplyDetail', query: { id: scope.row.id } })">查看报名</el-button>
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
		<el-dialog :title="addDialogTitle" :visible.sync="addDialogShow" @close="addDialogClose" width="1200px">
			<add-dialog v-if="addDialogShow" ref="editDialog" :addDialogShow.sync="addDialogShow"></add-dialog>
		</el-dialog>
	</cl-crud>
</template>

<script>
import addDialog from './AddActivity';
export default {
	components: {
		addDialog
	},
	data() {
		let _this = this;
		return {
			addDialogShow: false,
			addDialogTitle: '',
			tableFlters: {
				isClockin: '',
				activityStatus: -1
			},
			tableColumn: [
				{
					label: '编号',
					width: 45,
					type: 'index',
					align: 'center'
				},
				{
					label: 'ID',
					prop: 'id',
					width: 45,
					align: 'center'
				},
				{
					label: '活动名称',
					prop: 'title'
				},
				{
					label: '活动时间段',
					prop: 'activityTime',
					width: 180,
					align: 'center'
				},
				{
					label: '报名时间段',
					prop: 'applyTime',
					width: 180,
					align: 'center'
				},
				{
					label: '报名人数/报名名额',
					prop: 'percent',
					align: 'center',
					width: 130,
					formatter(row) {
						return row.joinPeopleNum + '/' + row.applyPeopleNum;
					}
				},
				{
					label: '报名占比',
					prop: 'percent2',
					align: 'center',
					width: 100,
					formatter(row) {
						return parseInt((row.joinPeopleNum / row.applyPeopleNum) * 100) + '%';
					}
				},
				{
					label: '是否打卡',
					prop: 'isClockin',
					align: 'center',
					width: 100,
					formatter(row) {
						return row.isClockin == 1 ? '是' : '否';
					}
				},
				{
					label: '活动状态',
					prop: 'activityStatus',
					align: 'center',
					width: 80,
					formatter(row) {
						if (row.activityStartStatus == 0) {
							return '已结束';
						}
						return _this.activityStatusFormatter(row.activityStartTime, row.activityEndTime);
					}
				},
				{
					label: '操作',
					fixed: 'right',
					prop: 'op',
					width: 150,
					align: 'center'
				}
			]
		};
	},

	methods: {
		activityStatusFormatter(s, e) {
			let d = new Date().getTime();
			s = new Date(s.replace(/-/g, '/')).getTime();
			e = new Date(e.replace(/-/g, '/')).getTime();
			if (e < d) {
				return '已结束';
			} else {
				if (s > d) {
					return '未开始';
				} else {
					return '进行中';
				}
			}
		},
		onLoad({ ctx, app }) {
			ctx.service(this.$service.app.activity).done();
			app.refresh({ ...this.tableFlters });
		},
		addDialogClose() {
			this.$refs.editDialog.resetForm('ruleForm');
			this.$refs['crud'].refresh();
		},
		//
		editDialog(id) {
			this.addDialogTitle = '编辑活动';
			this.addDialogShow = true;
			this.$nextTick(() => {
				this.$refs.editDialog.getEditInfo(id);
			});
		},
		//删除
		deleteFn(id) {
			this.$confirm('是否删除该条活动数据?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(async () => {
					try {
						await this.$service.app.activity.update({ id, isDeleted: 1 });
						this.$message({
							type: 'success',
							message: '删除成功!'
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
