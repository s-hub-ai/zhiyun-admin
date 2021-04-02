<template>
	<cl-crud @load="onLoad" ref="crud">
		<el-row type="flex" align="middle">
			<el-form v-permission="$service.app.activity.permission.page" class="table-form" :inline="true" :model="tableFlters" size="mini">
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
				<el-form-item label="活动类型">
					<el-select style="width: 120px" v-model="tableFlters.isType" placeholder="请选择" @change="$refs['crud'].refresh({ ...tableFlters })">
						<el-option label="支云活动" :value="0">支云活动</el-option>
						<el-option label="青训活动" :value="1">青训活动</el-option>
						<el-option label="所有" :value="-1">所有</el-option> 
					</el-select>
				</el-form-item>
				<el-form-item>
					<cl-search-key placeholder="请输入活动名称"></cl-search-key>
				</el-form-item>
			</el-form>
			<cl-flex1></cl-flex1>
			<el-button v-permission="$service.app.activity.permission.add" size="mini" type="primary" @click="(addDialogTitle = '新增活动'), (addDialogShow = true)">新增活动</el-button>
		</el-row>

		<el-row>
			<cl-table :columns="tableColumn">
				<!-- 活动时间段 -->
				<template #column-title="{ scope }"> 
					<span >{{ scope.row.title }} </span>
					<el-popover
						placement="top-start"
						title="活动二维码"
						width="200"
						trigger="hover"
						effect="dark"
						:open-delay="200"
						v-if="scope.row.isType == 1"
					>	
						<div>
							<div>
								<el-avatar shape="square" :size="200" fit="fit" :src="scope.row.qrCode"></el-avatar> 
							</div>
							<div class="text-right">
								<el-button size="small" >
									<a :href="scope.row.qrCode" target="_blank" download>下载图片</a>
								</el-button>
							</div>
						</div>
						<span slot="reference" class="text-green-500 text-xl"><i class="el-icon-mobile"></i></span>
					</el-popover>
				</template>
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
					<el-button v-permission="$service.app.applyActivity.permission.page" size="mini" type="text" @click="$router.push({ path: 'ApplyDetail', query: { id: scope.row.id } })">查看报名</el-button>
					<el-button
						v-permission="$service.app.activity.permission.clockinList"
						v-if="scope.row.isClockin == 1"
						size="mini"
						type="text"
						@click="$router.push({ path: 'ClockinList', query: { id: scope.row.id } })"
						>打卡记录</el-button
					>
					<el-button v-permission="$service.app.activity.permission.update" size="mini" type="text" @click="editDialog(scope.row.id)">编辑</el-button>
					<el-button v-permission="$service.app.activity.permission.delete" size="mini" type="text" @click="deleteFn(scope.row.id)">删除</el-button>
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
import { trainingStatusDict } from '@/dict/index.js';

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
				activityStatus: -1,
				isType:-1,
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
					align: 'center'
				}
			],

			...{trainingStatusDict}
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
			this.$refs.editDialog.ruleForm.detail = null;
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
						await this.$service.app.activity.delete({ ids: id });
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
