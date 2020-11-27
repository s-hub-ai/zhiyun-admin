<template>
	<cl-dialog
		title="商品选择"
		:props="{
			width: '1200px',
			'append-to-body': true
		}"
		:visible.sync="visible"
	>
		<cl-crud @load="onLoad">
			<el-row type="flex">
				<cl-refresh-btn></cl-refresh-btn>
				<el-button size="mini" type="primary" :disabled="selection.length == 0" v-if="multiple" @click="multiSelect">选择</el-button>
				<cl-flex1></cl-flex1>
				<cl-search-key></cl-search-key>
			</el-row>

			<el-row>
				<cl-table ref="table" v-bind="table" @selection-change="onSelectionChange" :props="{ height: '70vh' }">
					<!-- 轮播图 -->
					<template #column-pics="{ scope }">
						<el-image class="goods-pic" fit="cover" lazy :src="scope.row.pics | goods_pics(0)" :preview-src-list="scope.row.pics | goods_pics"></el-image>
					</template>
				</cl-table>
			</el-row>

			<el-row type="flex" justify="end">
				<cl-pagination></cl-pagination>
			</el-row>
		</cl-crud>
	</cl-dialog>
</template>

<script>
import { ActivityGoodsStatus } from '@/dict/index.js';

export default {
	name: 'goods-select',

	props: {
		multiple: Boolean
	},

	data() {
		return {
			visible: false,
			table: {
				props: {
					'max-height': '500px'
				},
				columns: [
					{
						type: 'selection',
						align: 'center',
						width: 60,
						hidden: !this.multiple
					},
					{
						type: 'op',
						align: 'center',
						width: '100px',
						layout: [
							({ scope }) => {
								return (
									<el-button
										size="mini"
										round
										on-click={() => {
											this.select(scope.row);
										}}
									>
										选择
									</el-button>
								);
							}
						]
					},
					{
						label: '商品图',
						align: 'center',
						prop: 'pics'
					},
					{
						label: '商品名称',
						align: 'center',
						prop: 'title',
						'min-width': 180,
						'show-overflow-tooltip': true
					},
					{
						label: '商品售价',
						align: 'center',
						prop: 'price'
					},
					{
						label: '销量',
						align: 'center',
						prop: 'sales'
					},
					// {
					// 	label: "库存",
					// 	align: "center",
					// 	prop: "inventory"
					// },
					{
						label: '状态',
						align: 'center',
						prop: 'status',
						dict: ActivityGoodsStatus
					}
				],
				on: {
					'cell-dblclick': (row) => {
						this.select(row);
					}
				}
			},
			params: {},
			selection: []
		};
	},

	filters: {
		goods_pics(str, index) {
			let arr = (str || '').split(',');
			return index === undefined ? arr : arr[index];
		}
	},

	methods: {
		open(params) {
			this.params = params || {};
			this.selection = [];
			this.visible = true;
		},

		close() {
			this.visible = false;
		},

		select(row) {
			this.$emit('select', row);
			this.close();
		},

		multiSelect() {
			this.$emit('select', ...this.selection);
			this.close();
		},

		onLoad({ ctx, app }) {
			ctx
				.service({
					page: (params) => {
						if (this.params.couponId) {
							// 优惠券商品列表
							return this.$service.biz.activity.couponGoods.select(params);
						} else if (this.params.activityId) {
							// 活动商品列表
							return this.$service.biz.activity.infoGoods.select(params);
						} else {
							// 默认商品列表
							return this.$service.biz.goods.info.page(params);
						}
					}
				})
				.done();

			app.refresh(this.params);
		},

		onSelectionChange(selection) {
			this.selection = selection;
		}
	}
};
</script>

<style lang="scss" scoped>
.goods-pic {
	height: 50px;
	width: 50px;
	position: relative;
	top: 4px;
}

.selection {
	&__label {
		font-size: 14px;
		margin-bottom: 10px;
	}

	&__item {
		padding: 10px;
		border-radius: 3px;
		border: 1px solid #eee;
		position: relative;
		margin-bottom: 10px;

		&:hover {
			.selection__delete {
				display: block;
			}
		}
	}

	&__delete {
		display: none;
		position: absolute;
		right: 0;
		top: 0;
		border: 0;
		background-color: #f56c6c;
		color: #fff;
		padding: 2px 5px;
		font-size: 12px;
		cursor: pointer;

		&:hover {
			background-color: #f78989;
		}
	}
}
</style>
