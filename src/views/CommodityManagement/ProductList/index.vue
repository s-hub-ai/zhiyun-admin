<template>
	<cl-crud @load="onLoad">
		<el-row type="flex" align="middle">
			<cl-search-key field="serachName" placeholder="请输入商品名称"></cl-search-key>
			<cl-flex1></cl-flex1>
			<el-button type="text" size="mini" icon="el-icon-setting" @click="$router.push({ path: 'DeliveryCharge' })">运费设置</el-button>
			<el-button size="mini" type="primary" @click="$router.push({ path: 'ProductRelease' })">发布商品</el-button>
		</el-row>

		<el-row>
			<cl-table :columns="tableColumn">
				<!-- 商品封面 -->
				<template #column-commodityCover="{ scope }">
					<el-image style="width: 100px; height: 100px" :src="scope.row.commodityCover" :preview-src-list="srcList"> </el-image>
				</template>
				<!-- 自定义销量 -->
				<template #column-fakeSalesVolume="{ scope }">
					<el-input-number style="width: 100px" :value="scope.row.fakeSalesVolume" size="mini" controls-position="right" :min="0"></el-input-number>
				</template>
				<!-- 销量展示 -->
				<template #column-salesVolumeShow="{ scope }">
					<el-switch :value="scope.row.salesVolumeShow" active-text="自定义" inactive-text="真实"> </el-switch>
				</template>
				<!-- 状态 -->
				<template #column-commodityStatus="{ scope }">
					<el-switch :value="scope.row.commodityStatus" active-color="#13ce66" inactive-color="#ff4949" active-text="上架" inactive-text="下架"> </el-switch>
				</template>
				<!-- 排序 -->
				<template #column-commodityOrder="{ scope }">
					<el-input-number style="width: 100px" size="mini" :value="scope.row.commodityOrder" :min="1"></el-input-number>
				</template>
				<!-- 操作 -->
				<template #column-op="{ scope }">
					<el-button type="text">编辑</el-button>
					<el-button type="text">删除</el-button>
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
		availablePoints: 52.2,
		salesStatus: 1,
		images: ['https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/1.jpg'],
		children: [
			{
				id: 6,
				name: '刘一儿子',
				process: 35.2,
				endTime: '2019年09月05日',
				price: 242.1,
				availablePoints: 72.1,
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
import { goodsTypeDict } from '@/dict/index.js';
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
					label: '商品封面',
					prop: 'commodityCover',
					align: 'center',
					width: 125
				},
				{
					label: '商品名称',
					align: 'center',
					prop: 'commodityName'
				},
				{
					label: '商品类型',
					prop: 'goodsType',
					filters: goodsTypeDict,
					align: 'center',
					width: 105
				},
				{
					label: '真实销量',
					prop: 'realSalesVolume',
					sortable: true,
					align: 'center',
					width: 105
				},
				{
					label: '自定义销量',
					prop: 'fakeSalesVolume',
					align: 'center',
					width: 125
				},
				{
					label: '销量展示',
					prop: 'salesVolumeShow',
					align: 'center',
					width: 160
				},
				{
					label: '状态',
					prop: 'commodityStatus',
					filters: [
						{ value: 0, text: '下架' },
						{ value: 1, text: '上架' }
					],
					align: 'center',
					width: 140
				},
				{
					label: '排序',
					prop: 'commodityOrder',
					sortable: true,
					align: 'center',
					width: 125
				},
				{
					label: '操作',
					prop: 'op',
					align: 'center',
					fixed: 'right',
					width: 120
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
