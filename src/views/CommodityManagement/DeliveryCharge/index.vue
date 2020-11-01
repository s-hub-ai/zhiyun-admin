<template>
	<cl-crud @load="onLoad">
		<el-row type="flex" align="middle">
			<h4>运费设置</h4>
			<cl-flex1></cl-flex1>
		</el-row>

		<el-row>
			<cl-table
				:props="{
					'span-method': objectSpanMethod
				}"
				:columns="tableColumn"
			>
				<!-- 自定义销量 -->
				<template #column-deleveryChargeValue="{ scope }">
					<el-input-number style="width: 100px" :value="scope.row.deleveryChargeValue" size="mini" controls-position="right" :min="0"></el-input-number>
				</template>
			</cl-table>
		</el-row>

		<el-row type="flex">
			<cl-flex1></cl-flex1>
		</el-row>
	</cl-crud>
</template>

<script>
const userList = [
	{
		id: 1,
		deliveryMethod: 35,
		deliveryRegion: '2019年09月05日',
		deleveryChargeValue: 242.1,
		type: 72.1,
		images: ['https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/1.jpg']
	},
	{
		id: 2,
		name: '陈二',
		deliveryMethod: 35,
		deliveryRegion: '2019年09月05日',
		deleveryChargeValue: 242.1,
		type: 72.1,
		salesStatus: 1,
		images: ['https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/2.jpg']
	}
];
export default {
	data() {
		return {
			tableColumn: [
				{
					label: '配送方式',
					prop: 'deliveryMethod',
					align: 'center'
				},
				{
					label: '配送地',
					prop: 'deliveryRegion',
					align: 'center'
				},
				{
					label: '运费(元)',
					prop: 'deleveryChargeValue',
					align: 'center'
				}
			]
		};
	},

	methods: {
		//合并第一列
		objectSpanMethod({ row, column, rowIndex, columnIndex }) {
			if (columnIndex === 0) {
				if (row.deliveryMethod == 35) {
					return {
						rowspan: 1,
						colspan: 1
					};
				}
			}
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
