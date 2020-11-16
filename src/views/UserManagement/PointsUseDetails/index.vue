<template>
	<cl-crud @load="onLoad">
		<el-row type="flex" align="middle">
			<span style="padding-right: 10px">选择时间:</span>
			<el-date-picker size="small" v-model="serach" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
			<cl-flex1></cl-flex1>
		</el-row>

		<el-row>
			<cl-table :props="tableProps" :columns="tableColumn"> </cl-table>
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
import { pointsUseDetailTypeDict } from '@/dict/index.js';
export default {
	data() {
		return {
			serach: '',
			tableProps: { 'show-summary': true },
			tableColumn: [
				{
					label: '时间',
					prop: 'useDate',
					align: 'center'
				},
				{
					label: '获取/使用',
					prop: 'fanClub',
					filters: [
						{ value: 1, text: '获取' },
						{ value: 2, text: '使用' }
					],
					align: 'center'
				},
				{
					label: '积分数量',
					prop: 'useNum',
					align: 'center'
				},
				{
					label: '事件类型',
					filters: pointsUseDetailTypeDict,
					prop: 'type',
					align: 'center'
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
			ctx.service(this.$service.app.scope).done();
			app.refresh({
				userId: this.$route.query.userId
			});
		}
	}
};
</script>
