<template>
	<cl-crud @load="onLoad">
		<el-row type="flex" align="middle">
			<cl-refresh-btn></cl-refresh-btn>
			<cl-search-key field="serachName" placeholder="请输入用户姓名、手机号"></cl-search-key>
			<cl-flex1></cl-flex1>
			<el-button size="mini" type="primary" @click="openForm">导出</el-button>
		</el-row>

		<el-row>
			<cl-table :columns="tableColumn">
				<!-- 身份证图片 -->
				<template #column-userCertificatePositiveImg="{ scope }">
					<el-image
						style="width: 79px; height: 50px"
						:src="scope.row.userCertificatePositiveImg | default_avatar"
						:preview-src-list="[scope.row.userCertificatePositive, scope.row.userCertificateNegativeImg, scope.row.userCertificatePortraitImg]"
					>
					</el-image>
				</template>
				<template #column-userCertificateNegativeImg="{ scope }">
					<el-image
						style="width: 79px; height: 50px"
						:src="scope.row.userCertificatePositiveImg | default_avatar"
						:preview-src-list="[scope.row.userCertificatePositive, scope.row.userCertificateNegativeImg, scope.row.userCertificatePortraitImg]"
					>
					</el-image>
				</template>
				<template #column-userCertificatePortraitImg="{ scope }">
					<el-image
						style="width: 79px; height: 50px"
						:src="scope.row.userCertificatePortraitImg | default_avatar"
						:preview-src-list="[scope.row.userCertificatePositive, scope.row.userCertificateNegativeImg, scope.row.userCertificatePortraitImg]"
					>
					</el-image>
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
		id: 2,
		name: '陈二',
		process: 35.2,
		endTime: '2019年09月05日',
		price: 242.1,
		salesRate: 72.1,
		salesStatus: 1,
		userCertificatePortraitImg: 'https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/2.jpg'
	},
	{
		id: 3,
		name: '张三',
		process: 10.2,
		endTime: '2019年09月12日',
		price: 74.11,
		salesRate: 23.9,
		salesStatus: 0,
		userCertificatePortraitImg: 'https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/3.jpg'
	},
	{
		id: 4,
		name: '李四',
		process: 75.5,
		endTime: '2019年09月13日',
		price: 276.64,
		salesRate: 47.2,
		salesStatus: 0,
		userCertificatePortraitImg: 'https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/4.jpg'
	},
	{
		id: 5,
		name: '王五',
		process: 25.4,
		endTime: '2019年09月18日',
		price: 160.23,
		salesRate: 28.3,
		salesStatus: 1,
		userCertificatePortraitImg: 'https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/5.jpg'
	}
];
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
					label: '球迷会',
					prop: 'fanClub',
					filters: [],
					align: 'center'
				},
				{
					label: '手机号',
					prop: 'phoneNum',
					align: 'center',
					width: 105
				},
				{
					label: '生日',
					prop: 'userBirthday',
					align: 'center'
				},
				{
					label: '性别',
					prop: 'userSex',
					align: 'center'
				},
				{
					label: '证件类型',
					prop: 'userCertificateType',
					align: 'center'
				},
				{
					label: '证件号码',
					prop: 'userCertificateNum',
					align: 'center'
				},
				{
					label: '有效期',
					prop: 'userCertificateValidity',
					align: 'center'
				},
				{
					label: '身份证住址',
					prop: 'userCertificateAddress',
					align: 'center'
				},
				{
					label: '身份证(正)',
					prop: 'userCertificatePositiveImg',
					align: 'center',
					width: 100
				},
				{
					label: '身份证(反)',
					prop: 'userCertificateNegativeImg',
					align: 'center',
					width: 100
				},
				{
					label: '人像照片',
					prop: 'userCertificatePortraitImg',
					align: 'center',
					width: 100
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
