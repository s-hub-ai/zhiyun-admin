<template>
	<cl-crud ref="crud" @load="onLoad">
		<el-row type="flex">
			<cl-refresh-btn></cl-refresh-btn>

			<el-button v-permission="$service.system.log.permission.clear" size="mini" type="danger" @click="clear"> 清空 </el-button>

			<div class="keep-day">
				<span>日志保存天数</span>

				<el-input-number controls-position="right" size="mini" :max="10000" :min="1" v-model="day" @blur="saveDay"></el-input-number>
			</div>

			<cl-flex1 />
			<cl-search-key placeholder="请输入操作用户昵称"></cl-search-key>
		</el-row>

		<el-row>
			<cl-table v-bind="table.props"></cl-table>
		</el-row>

		<el-row type="flex" justify="end">
			<cl-pagination></cl-pagination>
		</el-row>
	</cl-crud>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			day: 1,
			table: {
				props: {
					props: {
						'default-sort': {
							prop: 'createTime',
							order: 'descending'
						}
					},
					columns: [
						{
							type: 'index',
							label: '#',
							align: 'center',
							width: 60
						},
						{
							prop: 'userId',
							label: '用户ID',
							align: 'center'
						},
						{
							prop: 'name',
							label: '昵称',
							align: 'center',
							minWidth: '150'
						},
						{
							prop: 'urlName',
							label: '操作名称',
							minWidth: '150',
							align: 'center'
						},
						{
							prop: 'createTime',
							label: '操作时间',
							minWidth: '150',
							align: 'center',
							sortable: true
						},
						{
							prop: 'action',
							label: '请求地址',
							align: 'center',
							minWidth: '200',
							'show-overflow-tooltip': true
						},
						{
							prop: 'params',
							label: '传递参数',
							align: 'center',
							minWidth: '200',
							'show-overflow-tooltip': true
						}
					]
				}
			}
		};
	},

	computed: {
		...mapGetters(['permission'])
	},

	created() {
		this.$service.system.log.getKeep().then((res) => {
			this.day = res;
		});
	},

	methods: {
		onLoad({ ctx, app }) {
			ctx.service(this.$service.system.operation).done();
			app.refresh();
		},

		saveDay() {
			this.$service.system.log.setKeep(this.day).then(() => {
				this.$message.success('保存成功');
			});
		},

		clear() {
			this.$confirm('是否要清空日志', '提示', {
				type: 'warning'
			})
				.then(() => {
					this.$service.system.log
						.clear()
						.then(() => {
							this.$message.success('清空成功');
							this.$refs['crud'].refresh();
						})
						.catch((err) => {
							this.$message.error(err);
						});
				})
				.catch(() => {});
		}
	}
};
</script>

<style lang="scss" scoped>
.keep-day {
	span {
		font-size: 12px;
		margin: 0 10px;
	}

	.el-input-number {
		margin-right: 10px;
	}
}
</style>
