<template>
	<cl-crud @load="onLoad">
		<el-row type="flex" align="middle">
			<cl-search-key placeholder="请输入分类名称"></cl-search-key>
			<cl-flex1></cl-flex1>
			<cl-add-btn></cl-add-btn>
		</el-row>

		<el-row>
			<cl-table :columns="tableColumn" :props="{ height: '70vh' }">
				<!-- 状态-->
				<template #column-commodityTypeStatus="{ scope }">
					<el-switch v-model="scope.row.commodityTypeStatus" @change="updateTableRow(scope.row)" :active-value="1" :inactive-value="0"></el-switch>
				</template>
				<!-- 排序 -->
				<template #column-commodityTypeOrder="{ scope }">
					<el-input-number style="width: 100px" size="mini" v-model="scope.row.commodityTypeOrder" @change="updateTableRow(scope.row)"></el-input-number>
				</template>
			</cl-table>
		</el-row>

		<el-row type="flex">
			<cl-flex1></cl-flex1>
			<cl-pagination></cl-pagination>
		</el-row>

		<!-- 编辑、新增 -->
		<cl-upsert ref="upsert" v-bind="upsert.props" v-on="upsert.on"></cl-upsert>
	</cl-crud>
</template>

<script>
export default {
	data() {
		return {
			tableColumn: [
				{
					type: 'index',
					label: '编号',
					align: 'center'
				},
				{
					label: '分类名称',
					align: 'center',
					prop: 'commodityTypeName'
				},
				{
					label: '分类状态',
					align: 'center',
					width: 100,
					filters: [
						{
							value: '',
							text: '全部'
						},
						{
							value: 0,
							text: '停用'
						},
						{
							value: 1,
							text: '启用'
						}
					],
					prop: 'commodityTypeStatus',
					'filter-method': (value, row, column) => {
						return row[column['property']] === value;
					}
				},
				{
					label: '排序',
					sortable: true,
					align: 'center',
					width: 140,
					prop: 'commodityTypeOrder'
				},
				{
					label: '操作',
					align: 'center',
					type: 'op'
				}
			],
			upsert: {
				on: {
					open() {
						console.log('cl-upsert 打开');
					},

					close(action) {
						console.log('cl-upsert 关闭', action);
					}
				},
				props: {
					onOpen(data) {
						console.log('cl-upsert 打开钩子', data);
					},

					onClose(action, done) {
						console.log('cl-upsert 关闭钩子', action);
						done();
					},

					onInfo(data, { next, done, close }) {
						console.log('cl-upsert 详情钩子', data);
						next(data);
					},

					onSubmit(isEdit, data, { next, close, done }) {
						console.log('cl-upsert 提交钩子', `是否编辑 ${isEdit}`, data);
						next(data);
					},

					items: [
						{
							label: '分类名称',
							prop: 'commodityTypeName',
							component: {
								name: 'el-input'
							},
							rules: {
								required: true,
								message: '请填写分类名称'
							}
						},
						{
							label: '排序',
							prop: 'commodityTypeOrder',
							value: 0,
							component: {
								name: 'el-input-number',
								props: {
									min: 1
								}
							},
							rules: {
								required: true,
								message: '请填写顺序'
							}
						},
						{
							label: '分类状态',
							prop: 'commodityTypeStatus',
							value: 1,
							component: {
								name: 'el-switch',
								props: {
									'active-text': '启用',
									'active-value': 1,
									'inactive-text': '禁用',
									'inactive-value': 0
								}
							}
						}
					]
				}
			}
		};
	},

	methods: {
		//
		async updateTableRow(params) {
			try {
				await this.$service.app.commodityType.update(params);
			} catch (error) {
				this.$message.error(error);
			}
		},
		onLoad({ ctx, app }) {
			ctx.service(this.$service.app.commodityType).done();
			app.refresh();
		}
	}
};
</script>
