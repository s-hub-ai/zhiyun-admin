<template>
	<cl-crud @load="onLoad">
		<el-row type="flex" align="middle">
			<h4>商品销量统计</h4>

			<cl-flex1></cl-flex1>
			<cl-search-key placeholder="请输入商品名称"></cl-search-key>
		</el-row>

		<el-row>
			<cl-table :columns="tableColumn" :props="{ height: '55vh' }">
				<!-- 商品封面 -->
				<template #column-commodityCover="{ scope }">
					<el-image style="width: 100px; height: 100px" :src="scope.row.commodityCover" :preview-src-list="[scope.row.commodityCover]"> </el-image>
				</template>
				<!-- 商品规格 -->
				<template #column-skus="{ scope }">
					<div v-for="(item, index) in scope.row.skus" :key="item.id">
						<el-divider v-if="index != 0" style="margin: 4px 0"></el-divider>
						<div style="display: flex">
							<div style="padding-right: 10px">规格名称:{{ item.name }}</div>
							<div style="padding-right: 10px">销售总数:{{ item.sellAmount|default }}</div>
							<div style="padding-right: 10px">今日销售:{{ item.todaySellAmount|default }}</div>
						</div>
					</div>
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
export default {
	data() {
		return {
			tableColumn: [
				{
					label: '编号',
					type: 'index',
					align: 'center'
				},
				{
					label: '商品图片',
					align: 'center',
					prop: 'commodityCover',
					width: 140
				},
				{
					label: '商品名称',
					prop: 'commodityName'
				},
				// {
				// 	label: '规格详情',
				// 	align: 'left',
				// 	prop: 'skus'
				// },
				{
					label: '今日销售',
					align: 'center',
					width: 100,
					prop: 'todaySellAmount'
				},
				{
					label: '销售总数',
					align: 'center',
					width: 100,
					prop: 'sellAmount'
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
							label: '姓名',
							prop: 'name',
							component: {
								name: 'el-input'
							}
						},
						{
							label: '金额',
							prop: 'price',
							component: {
								name: 'el-input-number',
								props: {
									min: 1,
									max: 1000000
								}
							},
							rules: {
								required: true,
								message: '金额不能为空'
							}
						},
						{
							label: '销售率',
							prop: 'salesRate',
							component: {
								name: 'el-input-number',
								props: {
									precision: 2,
									min: 0,
									max: 100
								}
							}
						},
						{
							label: '职业',
							prop: 'of',
							value: 1,
							component: {
								name: 'el-radio-group',
								options: [
									{
										label: '散仙',
										value: 1
									},
									{
										label: '游侠',
										value: 2
									},
									{
										label: '刀客',
										value: 3
									}
								],
								on: {
									change: (val) => {
										const { hiddenItem, toggleItem, showItem, setOptions } = this.$refs['upsert'];

										toggleItem('price');
									}
								}
							}
						}
					]
				}
			},
			advSearch: {
				on: {
					open(data) {
						console.log('adv-search 打开', data);
					},
					close() {
						console.log('adv-search 关闭');
					},
					reset() {
						console.log('adv-search 重置');
					},
					clear() {
						console.log('adv-search 清空');
					}
				},
				props: {
					onOpen(data, { next }) {
						console.log('adv-search 打开钩子', data);
						next();
					},
					onClose(done) {
						console.log('adv-search 关闭钩子');
						done();
					},
					onSearch(data, { next, close }) {
						console.log('adv-search 搜索钩子', data);
						next();
					},
					opList: ['search', 'reset', 'clear', 'close'],
					items: [
						{
							label: '姓名',
							prop: 'name',
							value: '',
							component: {
								name: 'ref-test',
								ref: 'name',
								render(h) {
									return h('p', 'icssoa');
								}
							}
						},
						{
							label: '金额',
							prop: 'price',
							component: {
								name: 'el-input-number',
								props: {
									min: 1,
									max: 1000000
								},
								on: {
									change: () => {
										this.$refs['adv-search'].toggleItem('salesRate');
									}
								}
							}
						},
						{
							label: '销售率',
							prop: 'salesRate',
							hidden: true,
							component: {
								name: 'el-input-number',
								props: {
									precision: 2,
									min: 0,
									max: 100
								}
							}
						}
					]
				}
			}
		};
	},

	methods: {
		onLoad({ ctx, app }) {
			ctx.service(this.$service.app.count).done();
	
			app.refresh({
				size:100
			});
		}
	}
};
</script>
