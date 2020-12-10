<template>
	<cl-crud @load="onLoad">
		<el-row type="flex" align="middle">
			<cl-search-key placeholder="请输入活动名称"></cl-search-key>
			<cl-flex1></cl-flex1>
			<el-button size="mini" type="primary" @click="(addDialogTitle = '新增活动'), (addDialogShow = true)">新增活动</el-button>
		</el-row>

		<el-row>
			<cl-table :columns="tableColumn">
				<!-- 操作 -->
				<template #column-op="{ scope }">
					<el-button size="mini" type="text" @click="editDialog(scope.row.id)">查看报名</el-button>
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
		<el-dialog :title="addDialogTitle" :visible.sync="addDialogShow" @close="addDialogClose" width="800px">
			<add-dialog v-if="addDialogShow" ref="editDialog" :addDialogShow.sync="addDialogShow"></add-dialog>
		</el-dialog>
	</cl-crud>
</template>

<script>
const userList = [
	{
		id: 1,
		name: '刘一',
		process: 42.2,
		endTime: '2019年09月02日',
		price: 75.99,
		salesRate: 52.2,
		salesStatus: 1,
		images: ['https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/1.jpg'],
		children: [
			{
				id: 6,
				name: '刘一儿子',
				process: 35.2,
				endTime: '2019年09月05日',
				price: 242.1,
				salesRate: 72.1,
				salesStatus: 1,
				images: []
			}
		]
	},
	{
		id: 2,
		name: '陈二',
		process: 35.2,
		endTime: '2019年09月05日',
		price: 242.1,
		salesRate: 72.1,
		salesStatus: 1,
		images: ['https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/2.jpg']
	},
	{
		id: 3,
		name: '张三',
		process: 10.2,
		endTime: '2019年09月12日',
		price: 74.11,
		salesRate: 23.9,
		salesStatus: 0,
		images: ['https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/3.jpg']
	},
	{
		id: 4,
		name: '李四',
		process: 75.5,
		endTime: '2019年09月13日',
		price: 276.64,
		salesRate: 47.2,
		salesStatus: 0,
		images: ['https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/4.jpg']
	},
	{
		id: 5,
		name: '王五',
		process: 25.4,
		endTime: '2019年09月18日',
		price: 160.23,
		salesRate: 28.3,
		salesStatus: 1,
		images: ['https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/5.jpg']
	}
];
import addDialog from './AddActivity';
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
					type: 'selection'
				},
				{
					label: '姓名',
					prop: 'name'
				},
				{
					label: '存款',
					prop: 'price',
					sortable: true
				},
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
		onLoad({ ctx, app }) {
			ctx
				.service({
					page: (p) => {
						console.log('GET[page]', p);
						return Promise.resolve({
							list: userList,
							pagination: {
								page: p.page,
								size: p.size,
								total: 200
							}
						});
					},
					info: (d) => {
						console.log('GET[info]', d);
						return new Promise((resolve) => {
							resolve({
								name: 'icssoa',
								price: 100
							});
						});
					},
					add: (d) => {
						console.log('POST[add]', d);
						return Promise.resolve();
					},
					delete: (d) => {
						console.log('POST[delete]', d);
						return Promise.resolve();
					},
					update: (d) => {
						console.log('POST[update]', d);
						return Promise.resolve();
					}
				})
				.permission(() => {
					return {
						add: true,
						update: true,
						delete: true
					};
				})
				.done();

			app.refresh();
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
		}
	}
};
</script>
