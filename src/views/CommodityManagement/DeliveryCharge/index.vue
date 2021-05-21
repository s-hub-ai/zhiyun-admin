<template>
	<cl-crud @load="onLoad">
		<el-row type="flex" align="middle">
			<h4>积分设置</h4>
			<cl-flex1></cl-flex1>
		</el-row>
		<div class="flex items-center my-3">
			<div class="w-32 text-right text-gray-700">积分抵扣比例：</div>
			<div class="pl-5 text-gray-600 test-sm">注：抵扣比例×商品价格（或优惠价，不含运费）=抵扣金额</div>
		</div>
		<div class="flex items-center my-3">
			<div class="w-32 text-right text-gray-700">商城购物：</div>
			<div class="pl-5 flex items-center"><el-input v-model="globalConfig.scoreDeductionRatio" class="w-10 mr-2"></el-input> %</div>
		</div>
		<div class="flex items-center my-3">
			<div class="w-32 text-right text-gray-700">积分消耗比例：</div>
			<div class="pl-5 text-gray-600 test-sm">注：抵扣金额÷消耗比例=消耗积分，积分取整</div>
		</div>
		<div class="flex items-center my-3">
			<div class="w-32 text-right text-gray-700">商城购物：</div>
			<div class="pl-5 flex items-center"><el-input v-model="globalConfig.scoreCostRatio" class="w-10 mr-2"></el-input> %</div>
		</div>
		<div class="flex items-center my-3">
			<div class="w-32 text-right text-gray-700">积分奖励比例：</div>
			<div class="pl-5 text-gray-600 test-sm">注：奖励比例×商品价格（或优惠价，不含运费）=奖励积分，积分取整</div>
		</div>
		<div class="flex items-center my-3">
			<div class="w-32 text-right text-gray-700">商城购物：</div>
			<div class="pl-5 flex items-center"><el-input v-model="globalConfig.scoreRewardRatio" class="w-10 mr-2"></el-input> %</div>
		</div>
		<div class="flex items-center my-3">
			<div class="w-32 text-right text-gray-700">套票购买：</div>
			<div class="pl-5 flex items-center"><el-input v-model="globalConfig.packageTicketscoreRewardRatio" class="w-10 mr-2"></el-input> %</div>
		</div>
		<div class="flex items-center my-3">
			<div class="w-32 text-right text-gray-700">支云卡用户套票购买额外奖励:</div>
			<div class="pl-5 flex items-center"><el-input v-model="globalConfig.packageTicketscoreRewardRatioZy" class="w-10 mr-2"></el-input> %</div>
		</div>
		<el-row type="flex" justify="space-between" class="my-10">
			<el-col :span="12">
				<h4>折扣设置</h4>
			</el-col>
			<el-col :span="12">
				<el-button size="mini" @click="addCostLine" >添加折扣</el-button>
			</el-col>
		</el-row>
		<el-row type="flex" v-for="(costInfo,i) in costInfoList" :key="i" align="middle">
			
				<div class="w-32 text-right text-gray-700">折扣{{i+1}}:</div>
				<div class="pl-5 flex items-center"><el-input min="1" max="100" type="number" v-model="costInfoList[i].rate" class="w-10 mr-2" size="mini"></el-input> %</div>
				
				<el-button @click="showCommodityDialog(i)" size="mini" class="ml-10">选择应用商品</el-button>
			
		</el-row>
		<el-row type="flex" justify="space-between" class="my-10">
			<el-col :span="12">
				<h4>自提点设置</h4>
			</el-col>
			<el-col :span="12">
				<el-button size="mini" @click="addCostLine" >添加折扣</el-button>
			</el-col>
		</el-row>
		<el-row type="flex" v-for="(deliveryPosition,i) in deliveryPositionList" :key="i" align="middle">
			
				<div class="w-32 text-right text-gray-700">自提点{{i+1}}:</div>
				<div class="pl-5 flex items-center"><el-input v-model="deliveryPositionList[i].position" class="w-10 mr-2" size="mini"></el-input></div>
				
				<el-button @click="deletePosition(i)" size="mini" class="ml-10">删除</el-button>
			
		</el-row>
		<el-row
			v-permission="{
				or: [$service.app.commodity.deliveryCharge.permission.add, $service.app.commodity.deliveryCharge.permission.update, $service.app.commodity.deliveryCharge.permission.delete]
			}"
		>
			<div style="display: flex; align-items: center；margin-bottom: 10px;margin-top: 20px;">
				<h4>运费设置</h4>
				<cl-refresh-btn style="margin-left: 10px"></cl-refresh-btn>
				<el-button size="mini" @click="dialog = true">新增</el-button>
			</div>

			<el-form style="width: 100%">
				<el-form-item label="配送方式：" style="margin-bottom: 0">
					<el-checkbox-group v-model="deliveryMethod">
						<el-checkbox label="0" name="type">普通快递</el-checkbox>
						<el-checkbox label="1" name="type">到店自提</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
			</el-form>
			<cl-table
				:props="{
					'span-method': objectSpanMethod
				}"
				:columns="tableColumn"
			>
				<template #column-deliveryMethod="{ scope }">
					<span>{{ ['快递', '自提'][scope.row.deliveryMethod] }}</span>
				</template>
				<template #column-deliveryChargeValue="{ scope }">
					<span v-if="editing != scope.row">{{ scope.row.deliveryChargeValue }}</span>
					<span v-else>
						<el-input type="number" v-model="scope.row.deliveryChargeValue"></el-input>
					</span>
				</template>
				<template #column-deliveryRegionName="{ scope }">
					<span v-if="editing != scope.row">{{ scope.row.deliveryRegionName }}</span>
					<span v-else>
						<el-input v-model="scope.row.deliveryRegionName"></el-input>
					</span>
				</template>
				<template #column-deliveryRegion="{ scope }">
					<span v-if="editing != scope.row">{{ scope.row.deliveryRegion }}</span>
					<span v-else>
						<el-input v-model="scope.row.deliveryRegion"></el-input>
					</span>
				</template>
				<template #column-op="{ scope }">
					<el-button type="text" v-if="editing != scope.row" @click="editing = scope.row">修改</el-button>
					<template v-else>
						<el-button type="text" @click="update(scope.row)">确认</el-button>
						<el-button type="text" @click="editing = ''">取消</el-button>
					</template>
				</template>
			</cl-table>
		</el-row>

		<el-row> </el-row>

		<el-row type="flex">
			<el-button v-permission="$service.app.commodity.globalConfig.info" @click="updateGlobalConfig">确定</el-button>
			<cl-flex1></cl-flex1>
		</el-row>

		<cl-dialog :visible.sync="dialog">
			<el-form label-width="100px">
				<el-form-item label="配送方式">
					<el-select v-model="ruleForm.deliveryMethod">
						<el-option
							v-for="item in [
								{ text: '自提', value: '1' },
								{ text: '快递', value: '0' }
							]"
							:key="item.value"
							:label="item.text"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="配送名称">
					<el-input v-model="ruleForm.deliveryRegionName"></el-input>
				</el-form-item>
				<el-form-item label="配送地,">
					<el-input v-model="ruleForm.deliveryRegion"></el-input>
				</el-form-item>
				<el-form-item label="运费">
					<el-input v-model="ruleForm.deliveryChargeValue"></el-input>
				</el-form-item>
				<el-button @click="add">确定</el-button>
			</el-form>
		</cl-dialog>
		<cl-dialog :visible.sync="commodityVisible">
			<CommodityDialog 
				@refresh="updateCommodityDiscount" 
				:index="costInfoIndex" 
				:discountId="costInfoList[costInfoIndex].discountId" 
				:commodityId="costInfoList[costInfoIndex].commodityId"/>
		</cl-dialog>
	</cl-crud>
</template>

<script>
import CommodityDialog from "./commodityDialog.vue"
export default {
	components: {
		CommodityDialog
	},
	name: 'deliverCharge',
	data() {
		return {
			
			
			deliveryPositionList: [
				{
					position: ''
				}
			],
			commodityVisible: false,
			costPanel: false,
			//costInfoId: null,
			costInfoIndex: 0,
			costInfoList: [
				{
					rate:0
					//discountId:
					//commodityId
				}
			],
			dialog: false,
			globalConfig: {
				scoreCostRatio: '',
				scoreRewardRatio: '',
				scoreDeductionRatio: '',
				deliveryMethod: '',
				packageTicketscoreRewardRatio: '',
				packageTicketscoreRewardRatioZy: ''
			},
			deliveryMethod: [],
			editing: '',
			ruleForm: {
				deliveryRegionName: '',
				deliveryMethod: '0',
				deliveryRegion: '',
				deliveryChargeValue: 0
			},
			tableColumn: [
				{
					label: '配送方式',
					prop: 'deliveryMethod',
					align: 'center'
				},
				{
					label: '配送名',
					prop: 'deliveryRegionName',
					align: 'center'
				},
				{
					label: '配送地',
					prop: 'deliveryRegion',
					align: 'center'
				},
				{
					label: '运费(元)',
					prop: 'deliveryChargeValue',
					align: 'center'
				},
				{
					label: '操作',
					width: 200,
					prop: 'op',
					align: 'center'
				}
			]
		};
	},
	async created() {
		await this.getGlobalConfig();
	},
	methods: {
		deletePosition(i) {
			if (this.deliveryPositionList.length>0){
				delete this.deliveryPositionList[i];
			}
			
		},
		//[{index, commodityId}]
		updateCommodityDiscount(discountInfo) {
			let costInfo = this.costInfoList[discountInfo.index];
			
			//let discountId = costInfo.discountId;
			let commodityId = discountInfo.commodityId;
			//let rate = costInfo.rate;
			costInfo.commodityId = commodityId;
			
			this.commodityVisible=false;
		},
		showCommodityDialog(i) {
			let costInfo = this.costInfoList[i];
			//let id = costInfo.discountId;
			///this.costInfoId = id;
			this.costInfoIndex = i;
			this.commodityVisible=true;
		},
		addCostLine() {
			if (this.costInfoList.length>0){
				let costInfoLast = this.costInfoList[this.costInfoList.length-1];
				if (costInfoLast.value!="" || Number(costInfoLast.value)!=0) {
					this.costInfoList.push({
						value:0
					})
				}
			}
		},
		// 合并第一列
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
		//获取全局设置
		async getGlobalConfig() {
			try {
				let data = await this.$service.app.commodity.globalConfig.info();
				Object.assign(this.globalConfig, data);
				this.deliveryMethod = data.deliveryMethod.split(',');
				let discountInfo = await this.$service.app.discount.list();
				console.log("discountInfo")
				console.log(discountInfo)
				this.costInfoList = discountInfo;
			} catch (error) {
				this.$message.error(error);
			}
		},
		//更新全局设置
		async updateGlobalConfig() {
			let data = Object.assign(this.globalConfig, {
				deliveryMethod: this.deliveryMethod.join(',')
			});
			
			try {
				await this.$service.app.commodity.globalConfig.update(data);
				
				for (let i in this.costInfoList) {
					this.costInfoList[i].rate = Number(this.costInfoList[i].rate)
				}
				for (let i in this.costInfoList) {
					if (this.costInfoList[i].commodityId==null) {
						this.costInfoList[i].commodityId = "";
					}
				}
				console.log("submit")
				console.log(this.costInfoList)
				await this.$service.app.discount.createDiscount({
					discountList:this.costInfoList
				});
				this.$message.success('修改成功');
			} catch (error) {
				this.$message.error(error);
			}
		},
		async add() {
			let res = await this.$service.app.commodity.deliveryCharge.add({
				...this.ruleForm
			});
			
			this.dialog = false;
		},
		async update(v) {
			console.log(v);
			let res = await this.$service.app.commodity.deliveryCharge.update({
				...v
			});
			
			this.editing = '';
		},
		onLoad({ ctx, app }) {
			const _this = this;
			ctx
				.service({
					page: async () => {
						return await this.$service.app.commodity.deliveryCharge.list();
					}
				})
				.done();
			app.refresh();
		}
	}
};
</script>
<style lang="scss" scoped>
::v-deep.cl-crud {
	overflow-y: auto !important;
}
.my-10 {
	margin-top: 10px;
	margin-bottom: 10px;
}
.ml-10 {
	margin-left: 30px;
}
</style>
