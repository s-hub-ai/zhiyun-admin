<template>
	<cl-crud @load="onLoad" ref="crud">
		<!-- <el-row type="flex" align="middle">
			<span style="padding-right: 10px">选择时间:</span>
			<el-date-picker size="small" v-model="serach" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
			<cl-flex1></cl-flex1>
		</el-row> -->

		<el-row>
			<cl-refresh-btn></cl-refresh-btn>
			<el-button v-permission="$service.app.user.info.permission.updateScore" size="mini" @click="visible = true">增加积分</el-button>
			<el-button v-permission="$service.app.user.info.permission.updateScore" size="mini" @click="visible2 = true">减少积分</el-button>
		</el-row>
		<el-row>
			<cl-table :columns="tableColumn" :props="{ height: '70vh' }">
				<template #column-score="{ scope }">
					<span :class="scope.row.scoreType ? 'text-green-400' : 'text-red-500'">
						{{ ` ${scope.row.scoreType ? '+' : '-'}${scope.row.score}` }}
					</span>
				</template>
			</cl-table>
		</el-row>

		<el-row type="flex">
			<cl-flex1></cl-flex1>
			<cl-pagination></cl-pagination>
		</el-row>
		<cl-dialog title="增加积分" :visible.sync="visible">
			<el-form label-width="100px">
				<el-form-item label-width="输入要增加的积分数量">
					<el-input-number :min="0" :max="999999" v-model="addScore"></el-input-number>
				</el-form-item>
				<el-button @click="submitAdd">确定添加</el-button>
			</el-form>
		</cl-dialog>
		<cl-dialog title="减少" :visible.sync="visible2">
			<el-form label-width="100px">
				<el-form-item label-width="输入要减少的积分数量">
					<el-input-number :min="0" :max="999999" v-model="minusScore"></el-input-number>
				</el-form-item>
				<el-button @click="submitMinus">确定减少</el-button>
			</el-form>
		</cl-dialog>
		<!-- 自定义表单 -->
		<cl-form ref="form"></cl-form>
	</cl-crud>
</template>

<script>
import { pointsUseDetailTypeDict, pointStatusDict } from '@/dict/index.js';
export default {
	data() {
		return {
			visible: false,
			visible2: false,
			serach: '',
			addScore: 0,
			minusScore: 0,
			// tableProps: { 'show-summary': true },
			tableColumn: [
				{
					label: '时间',
					prop: 'createTime',
					align: 'center'
				},
				{
					label: '获取/使用',
					prop: 'scoreType',
					// filters: [
					// 	{ value: 1, text: '获取' },
					// 	{ value: 2, text: '使用' }
					// ],
					align: 'center',
					formatter(row) {
						return ['使用', '获取'][row.scoreType];
					}
				},
				{
					label: '积分状态',
					prop: 'scoreStatus',
					// filters: [
					// 	{ value: 1, text: '获取' },
					// 	{ value: 2, text: '使用' }
					// ],
					align: 'center',
					formatter(row) {
						let res;
						pointStatusDict.map((value) => {
							if (row.scoreStatus == value.value) {
								res = value.text;
							}
						});
						return res;
					}
				},
				{
					label: '积分数量',
					prop: 'score',
					align: 'center'
				},
				{
					label: '事件类型',
					filters: pointsUseDetailTypeDict,
					prop: 'scoreSource',
					align: 'center',
					formatter(row) {
						let res;
						pointsUseDetailTypeDict?.map((el) => {
							if (row.scoreSource == el.value) {
								res = el.text;
							}
						});
						return res || '其他';
					}
				}
			]
		};
	},

	methods: {
		async submitAdd() {
			await this.$service.app.user.info.updateScore({
				userId: this.$route.query.id,
				score: this.addScore
			});
			this.visible = false;
			this.$refs.crud.refresh();
		},
		async submitMinus() {
			await this.$service.app.user.info.updateScore({
				userId: this.$route.query.id,
				score: -this.minusScore
			});
			this.visible2 = false;
			this.$refs.crud.refresh();
		},
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
			ctx.service(this.$service.app.score).done();
			app.refresh({
				userId: this.$route.query.id
			});
		}
	}
};
</script>
