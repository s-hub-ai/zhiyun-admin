<template>
	<cl-crud @load="onLoad">
		<el-row type="flex" align="middle">
			<cl-search-key field="serachName" placeholder="请输入用户姓名、手机号、套票号"></cl-search-key>
			<cl-flex1></cl-flex1>
			<el-button size="mini" type="primary" @click="addDialogShow = true">新增消息</el-button>
		</el-row>

		<el-row>
			<cl-table :columns="tableColumn">
				<!-- 操作 -->
				<template #column-op="{ scope }">
					<el-button size="mini" type="text" @click="$router.push({ path: 'MessageDetail', query: { id: scope.row.id } })">查看详情</el-button>
					<el-button size="mini" type="text" @click="$router.push({ path: 'EditMessage', query: { id: scope.row.id } })">编辑</el-button>
					<el-button size="mini" type="text" @click="deleteFn(scope.row.id)">删除</el-button>
				</template>
			</cl-table>
		</el-row>

		<el-row type="flex">
			<cl-flex1></cl-flex1>
			<cl-pagination></cl-pagination>
		</el-row>

		<!-- 新增编辑弹出框 -->
		<el-dialog title="新增消息" :visible.sync="addDialogShow" width="800px">
			<add-dialog></add-dialog>
		</el-dialog>
	</cl-crud>
</template>

<script>
const userList = [
	{
		id: 1,
		status: 35.2,
		useDate: '2019年09月05日',
		useNum: 242.1,
		type: 72.1,
		images: ['https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/1.jpg']
	},
	{
		id: 2,
		name: '陈二',
		status: 35.2,
		useDate: '2019年09月05日',
		useNum: 242.1,
		type: 72.1,
		salesStatus: 1,
		images: ['https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/2.jpg']
	}
];
import addDialog from './AddMessage';
export default {
	components: {
		addDialog
	},
	data() {
		return {
			addDialogShow: false,
			serach: '',
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
		}
	}
};
</script>
