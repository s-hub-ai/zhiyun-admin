<template>
	<cl-crud @load="onLoad">
		<el-row type="flex" align="middle">
			<cl-refresh-btn></cl-refresh-btn>
			<cl-flex1></cl-flex1>
			<cl-search-key field="serachName" placeholder="请输入用户姓名、手机号、套票号"></cl-search-key>
			<el-button size="mini" type="primary" @click="openForm">导出</el-button>
		</el-row>

		<el-row>
			<cl-table :columns="tableColumn">
				<!-- 头像 -->
				<template #column-avatar="{ scope }">
					<cl-avatar shape="square" size="medium" :src="scope.row.headImg | default_avatar" :style="{ margin: 'auto' }"> </cl-avatar>
				</template>
				<!-- 操作 -->
				<template #column-op="{ scope }">
					<el-link type="primary">详情</el-link>
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
const userList = [
	{
		id: 1,
		name: '刘一',
		phoneNum: '131604922228',
		ticketPackageUser: '基础套票',
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
import { ticketPackageUserDict, useCcertificationDict, vipLevelDict, zhiyunCardStatusDict } from '@/dict/index.js';
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
					label: '头像',
					prop: 'avatar',
					align: 'center',
					width: 70
				},
				{
					label: '昵称',
					align: 'center',
					prop: 'nickName'
				},
				{
					label: '手机号',
					prop: 'phoneNum',
					align: 'center',
					width: 105
				},
				{
					label: '微信号',
					prop: 'weChatAccount',
					align: 'center'
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
					label: '球迷会',
					prop: 'fanClub',
					filters: [],
					align: 'center'
				},
				{
					label: '实名状态',
					prop: 'useCcertification',
					filters: useCcertificationDict,
					align: 'center',
					width: 90
				},
				{
					label: '姓名',
					prop: 'useName',
					align: 'center'
				},
				{ label: '可用积分', prop: 'availablePoints', align: 'center' },
				{
					label: '累计积分',
					prop: 'accumulatedPoints',
					align: 'center'
				},
				{
					label: '积分排名',
					prop: 'pointsRank',
					align: 'center',
					sortable: true,
					width: 100
				},
				{
					label: '会员等级',
					prop: 'vipLevel',
					filters: vipLevelDict,
					align: 'center',
					width: 90
				},
				{
					label: '支云卡状态',
					prop: 'zhiyunCardStatus',
					align: 'center',
					filters: zhiyunCardStatusDict,
					width: 100
				},
				{
					label: '操作',
					prop: 'op',
					align: 'center',
					fixed: 'right',
					width: 60
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
