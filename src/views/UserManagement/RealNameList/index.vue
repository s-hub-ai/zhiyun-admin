<template>
	<cl-crud @load="onLoad">
		<el-row type="flex" align="middle">
			<cl-refresh-btn></cl-refresh-btn>
			<cl-search-key placeholder="请输入用户姓名、手机号"></cl-search-key>
			<cl-flex1></cl-flex1>
			<!-- 	<el-button size="mini" type="primary" @click="openForm">导出</el-button> -->
		</el-row>

		<el-row>
			<cl-table :columns="tableColumn" :props="{ height: '70vh' }">
				<!-- 证件有效期 -->
				<template #column-userCertificateValidity="{ scope }">
					<span>{{ scope.row.userCertificateValidityStart }}至{{ scope.row.userCertificateValidityEnd }}</span>
				</template>
				<!-- 身份证图片 -->
				<template #column-userCertificatePositiveImg="{ scope }">
					<el-image style="width: 79px; height: 50px" :src="scope.row.userCertificatePositiveImg | default_avatar" :preview-src-list="[scope.row.userCertificatePositiveImg]"> </el-image>
				</template>
				<template #column-userCertificateNegativeImg="{ scope }">
					<el-image style="width: 79px; height: 50px" :src="scope.row.userCertificateNegativeImg | default_avatar" :preview-src-list="[scope.row.userCertificateNegativeImg]"> </el-image>
				</template>
				<template #column-userCertificatePortraitImg="{ scope }">
					<el-image style="width: 79px; height: 50px" :src="scope.row.userCertificatePortraitImg | default_avatar" :preview-src-list="[scope.row.userCertificatePortraitImg]"> </el-image>
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
export default {
	computed: {
		fanClubList() {
			let list = this.$store.state.common.fanClub;
			let arr = list.map((value, index, array) => {
				let o = {
					value: value.id,
					text: value.fanClubName
				};
				return o;
			});
			return arr;
		}
	},
	data() {
		let _this = this;
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
					prop: 'userName',
					align: 'center'
				},
				{
					label: '球迷会',
					prop: 'fanClubId',
					filters: [],
					align: 'center',
					formatter(row) {
						let regionName = '-';
						_this.fanClubList.map((value) => {
							if (row.fanClubId == value.value) {
								regionName = value.text;
							}
						});
						return regionName;
					},
					'filter-method': (value, row, column) => {
						console.log(value);
						console.log(row);
						return row[column['property']] == value;
					}
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
					align: 'center',
					formatter(row) {
						if (row.userCertificateType == 1) {
							return '身份证';
						}
					}
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
					label: '身份证(反)',
					prop: 'userCertificatePositiveImg',
					align: 'center',
					width: 100
				},
				{
					label: '身份证(正)',
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
			this.tableColumn[2].filters = this.fanClubList;
			console.log(this.fanClubList);
			ctx.service(this.$service.app.user.info).done();
			app.refresh({ userCertification: 1 });
		}
	}
};
</script>
