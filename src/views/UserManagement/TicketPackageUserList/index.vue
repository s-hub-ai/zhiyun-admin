<template>
	<cl-crud @load="onLoad">
		<el-row type="flex" align="middle">
			<cl-refresh-btn></cl-refresh-btn>
			<cl-search-key field="serachName" placeholder="请输入用户姓名、手机号,套票号"></cl-search-key>
			<cl-flex1></cl-flex1>
			<el-button size="mini" type="primary" @click="openForm">导出</el-button>
		</el-row>

		<el-row>
			<cl-table :columns="tableColumn" :props="{ height: '70vh' }">
				<!-- 操作 -->
				<template #column-op="{ scope }">
					<el-link type="primary" @click="$router.push({ path: 'TicketPackageRechargeRecord', query: { id: scope.row.id } })">充值记录</el-link>
				</template>
			</cl-table>
		</el-row>

		<el-row type="flex">
			<cl-flex1></cl-flex1>
			<cl-pagination></cl-pagination>
		</el-row>

		<!-- 自定义表单 -->
		<cl-form ref="form"></cl-form>
	</cl-crud>
</template>

<script>
import { ticketPackageUserDict } from '@/dict/index.js';
export default {
	data() {
		return {
			tableColumn: [
				{
					type: 'index',
					label: '编号',
					align: 'center',
					width: 50
				},
				{
					label: '姓名',
					prop: 'useName',
					align: 'center'
				},
				{
					label: '手机号',
					prop: 'phoneNum',
					align: 'center',
					width: 105
				},
				{
					label: '套票类型',
					prop: 'ticketPackageUser',
					filters: ticketPackageUserDict,
					align: 'center',
					width: 90
				},
				{
					label: '套票号',
					prop: 'ticketPackageNum',
					align: 'center'
				},
				{
					label: '套票有效期',
					prop: 'ticketPackageValidity',
					align: 'center'
				},
				{
					label: '球迷会',
					prop: 'fanClubName',
					align: 'center'
				},
				{
					label: '球迷会区域',
					prop: 'fanClubRegionName',
					align: 'center'
				},
				{
					label: '电子会员卡',
					prop: 'electronicVipCard',
					align: 'center'
				},
				{
					label: '操作',
					align: 'center',
					prop: 'op'
				}
			]
		};
	},

	methods: {
		openForm() {
			this.$refs['form'].open({
				props: {
					title: '自定义表单'
				},
				items: [
					{
						label: '姓名',
						prop: 'name',
						value: '神仙都没用',
						component: {
							name: 'el-input'
						},
						rules: {
							required: true,
							message: '姓名不能为空'
						}
					}
				],
				on: {
					open(data, { close, submit, done }) {
						console.log('cl-form 打开钩子', data);
					},

					close(action, done) {
						console.log('cl-form 关闭钩子', action);
						done();
					},

					submit: (data, { close, done, next }) => {
						console.log('cl-form 提交钩子', data);

						setTimeout(() => {
							close();
							this.$message.success('提交成功');
						}, 1500);
					}
				}
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
