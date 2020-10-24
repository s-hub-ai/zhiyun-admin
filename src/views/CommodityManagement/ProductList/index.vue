<template>
	<cl-crud @load="onLoad">
		<el-row type="flex" align="center">
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<!-- 新增按钮 -->
			<cl-add-btn />
			<!-- 删除按钮 -->
			<cl-multi-delete-btn />
			<cl-flex1 />
			<!-- 关键字搜索按钮 -->

			<cl-search-key />
		</el-row>

		<el-row>
			<!-- 表格 -->
			<cl-table ref="table" v-bind="table"></cl-table>
		</el-row>

		<el-row type="flex" justify="end">
			<!-- 分页 -->
			<cl-pagination />
		</el-row>

		<!-- 编辑 -->
		<cl-upsert ref="upsert" v-bind="upsert"></cl-upsert>
	</cl-crud>
</template>

<script>
export default {
	data() {
		return {
			// 表格配置
			table: {
				props: {
					// 默认排序
					'default-sort': {
						prop: 'endTime',
						order: 'descending'
					}
				},

				// 表格列
				columns: [
					{
						type: 'selection',
						width: 60
					},
					{
						label: 'id',
						prop: 'id'
					},
					{
						label: '昵称',
						prop: 'name'
					},
					{
						label: '期限',
						prop: 'endTime',
						sortable: 'custom'
					},
					// 操作栏
					{
						type: 'op',
						layout: ['edit', 'delete']
					}
				]
			},

			// 新增、编辑配置
			upsert: {
				props: {
					width: '800px',
					'label-width': '80px'
				},

				// 表单项
				items: [
					{
						label: '昵称',
						prop: 'name',
						component: {
							name: 'el-input'
						},
						rules: {
							required: true,
							message: '昵称不能为空'
						}
					},
					{
						label: '期限',
						prop: 'endTime',
						component: {
							name: 'el-date-picker',
							props: {
								type: 'datetime',
								'format-value': 'yyyy-MM-dd HH:mm:ss'
							}
						}
					}
				]
			}
		};
	},

	methods: {
		onLoad({ ctx, app }) {
			ctx
				.service({
					page() {
						return Promise.resolve([
							{
								id: 1,
								name: '刘一',
								endTime: '2019年09月02日'
							},
							{
								id: 2,
								name: '陈二',
								endTime: '2019年09月05日'
							},
							{
								id: 3,
								name: '张三',
								endTime: '2019年09月12日'
							}
						]);
					}
				})
				.done();

			app.refresh({
				prop: 'endTime',
				order: 'desc'
			});
		}
	}
};
</script>

<style></style>
