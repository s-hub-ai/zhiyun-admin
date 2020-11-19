<template>
	<cl-crud @load="onLoad" ref="crud">
		<el-row type="flex" align="middle">
			<cl-search-key placeholder="请输入商品名称"></cl-search-key>
			<cl-flex1></cl-flex1>
			<el-button type="text" size="mini" icon="el-icon-setting" @click="$router.push({ path: 'DeliveryCharge' })">全局设置</el-button>
			<el-button size="mini" type="primary" @click="$router.push({ path: 'ProductRelease' })">发布商品</el-button>
		</el-row>

		<el-row>
			<cl-table :columns="tableColumn">
				<!-- 商品封面 -->
				<template #column-commodityCover="{ scope }">
					<el-image style="width: 100px; height: 100px" :src="scope.row.commodityCover" :preview-src-list="[scope.row.commodityCover]"> </el-image>
				</template>
				<!-- 自定义销量 -->
				<template #column-fakeSalesVolume="{ scope }">
					<el-input-number style="width: 100px" v-model="scope.row.fakeSalesVolume" @change="updateFakeSaleVolume(scope.row)" size="mini" controls-position="right" :min="0"></el-input-number>
				</template>
				<!-- 销量展示 -->
				<template #column-salesVolumeShow="{ scope }">
					<el-switch v-model="scope.row.salesVolumeShow" @change="updateShowSaleVolume(scope.row)" :active-value="1" :inactive-value="0" active-text="自定义" inactive-text="真实"> </el-switch>
				</template>
				<!-- 状态 -->
				<template #column-commodityStatus="{ scope }">
					<el-switch
						v-model="scope.row.commodityStatus"
						@change="updateStatus(scope.row)"
						:active-value="1"
						:inactive-value="0"
						active-color="#13ce66"
						inactive-color="#ff4949"
						active-text="上架"
						inactive-text="下架"
					>
					</el-switch>
				</template>
				<!-- 排序 -->
				<template #column-commodityOrder="{ scope }">
					<el-input-number style="width: 100px" size="mini" v-model="scope.row.commodityOrder" @change="updateCommodityOrder(scope.row)" :min="1"></el-input-number>
				</template>
				<!-- 操作 -->
				<template #column-op="{ scope }">
					<el-button type="text" 
					@click="editing = scope.row;$refs.editDialog.editDialog=true;"
					@cacnel="editing=null">编辑</el-button>
					<el-button type="text" @click="deleteFn(scope.row)">删除</el-button>
				</template>
			</cl-table>
		</el-row>

		<el-row type="flex">
			<cl-flex1></cl-flex1>
			<cl-pagination></cl-pagination>
		</el-row>

		<!-- 自定义表单 -->
		<cl-form ref="form"></cl-form>

		<!-- 编辑商品dialog -->
		<ProductEdit :item="editing" @update="refresh"  ref="editDialog"/>
	</cl-crud>
</template>

<script>
import { goodsTypeDict } from '@/dict/index.js';
export default {
	components:{
		ProductEdit:()=>import('./ProductEdit')
	},
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
					'filter-method': (value, row, column) => {
						if (value != -1) {
							return row[column['property']] === value;
						} else {
							return row[column['property']];
						}
					},
					formatter(row) {
						let name = '-';
						goodsTypeDict.map((value) => {
							if (row.goodsType == value.value) {
								name = value.text;
							}
						});
						return name;
					},
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
					'filter-method': (value, row, column) => {
						return row[column['property']] === value;
					},
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
			],
			editing:null
		};
	},

	methods: {
		//删除商品
		deleteFn(params) {
			this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(async () => {
					try {
						let { id, goodsType } = params;
						goodsType = Number(goodsType);
						if (goodsType == 0) {
							await this.$service.app.commodity.shopping.delete({ ids: id });
						} else if (goodsType == 2) {
							await this.$service.app.commodity.score.delete({ ids: id });
						}
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.$refs['crud'].refresh();
					} catch (error) {
						this.$message.error(error);
					}
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
		},
		//编辑手动销量
		async updateShowSaleVolume(params) {
			console.log(params);
			try {
				let { id, goodsType, salesVolumeShow } = params;
				console.log(id);
				await this.$service.app.commodity.common.updateShowSaleVolume({ id, goodsType, salesVolumeShow });
				this.$message({
					message: '修改成功',
					type: 'success'
				});
			} catch (error) {
				this.$message.error(error);
			}
		},
		//编辑上架状态
		async updateStatus(params) {
			console.log(params);
			try {
				let { id, goodsType, commodityStatus } = params;
				console.log(id);
				await this.$service.app.commodity.common.updateStatus({ id, goodsType, commodityStatus });
				this.$message({
					message: '修改成功',
					type: 'success'
				});
			} catch (error) {
				this.$message.error(error);
			}
		},
		//编辑手动销量

		async updateFakeSaleVolume(params) {
			console.log(params);
			try {
				let { id, goodsType, fakeSaleVolume } = params;
				console.log(id);
				await this.$service.app.commodity.common.updateFakeSaleVolume({ id, goodsType, fakeSaleVolume });
				this.$message({
					message: '修改成功',
					type: 'success'
				});
			} catch (error) {
				this.$message.error(error);
			}
		},
		//编辑排序
		async updateCommodityOrder(params) {
			console.log(params);
			try {
				let { id, goodsType, commodityOrder } = params;
				console.log(id);
				await this.$service.app.commodity.common.updateCommodityOrder({ id, goodsType, commodityOrder });
				this.$message({
					message: '修改成功',
					type: 'success'
				});
			} catch (error) {
				this.$message.error(error);
			}
		},
		refresh(){
			this.$refs.crud.refresh({
				goodsType: -1,
				prop: 'createTime',
				order: 'desc'
			})
		},
		onLoad({ ctx, app }) {
			ctx.service(this.$service.app.commodity.common).done();
			app.refresh({
				goodsType: -1,
				prop: 'createTime',
				order: 'desc'
			});
		}
	}
};
</script>
