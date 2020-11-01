<template>
	<cl-crud @load="onLoad">
		<el-row type="flex" align="middle">
			<cl-flex1></cl-flex1>
			<el-button size="mini" type="primary" @click="$router.push({ path: 'AddConsult' })">新增</el-button>
		</el-row>

		<el-row>
			<cl-table :columns="tableColumn">
				<!-- 二维码 -->
				<template #column-qrCode="{ scope }">
					<el-image style="width: 100px; height: 100px" :src="scope.row.qrCode" :preview-src-list="[scope.row.qrCode]"> </el-image>
				</template>
				<!-- 操作 -->
				<template #column-op="{ scope }">
					<el-button size="mini" type="text" @click="$router.push({ path: 'EditConsult', query: { id: scope.row.id } })">编辑</el-button>
					<el-button size="mini" type="text" @click="deleteFn(scope.row.id)">删除</el-button>
				</template>
			</cl-table>
		</el-row>

		<el-row type="flex">
			<cl-flex1></cl-flex1>
			<cl-pagination></cl-pagination>
		</el-row>
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
		qrCode: 'https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/1.jpg'
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
export default {
	data() {
		return {
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
					prop: 'startStatus',
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
			this.$confirm('是否删除该球迷会?', '提示', {
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
