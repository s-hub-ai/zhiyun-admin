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
				<el-button size="mini" @click="addCostLineDialog=true" >添加折扣</el-button>
			</el-col>
		</el-row>
		<el-row type="flex" v-for="(costInfo,i) in costInfoList" :key="`costInfo-${i}`" align="middle">
			
				<div class="w-32 text-right text-gray-700">折扣{{i+1}}:</div>
				
				<div class="pl-5 flex items-center"><el-input min="1" max="100" type="number" v-model="costInfo.rate" class="w-10 mr-2" size="mini"></el-input> %</div>
				
				<el-button @click="showCommodityDialog(i)" size="mini" class="ml-10">选择应用商品</el-button>
				
				<el-button @click="deleteDiscount(costInfo,i)" size="mini" class="ml-10">删除</el-button>
		</el-row>
		<el-row type="flex" justify="space-between" class="my-10">
			<el-col :span="12">
				<h4>自提点设置</h4>
			</el-col>
			<el-col :span="12">
				<el-button size="mini" @click="addPkStation" >添加自提点</el-button>
			</el-col>
		</el-row>
		<el-row type="flex" v-for="(pkStation,i) in pkStationList" :key="`pkStation-${i}`" align="middle">
			
				<div class="w-32 text-right text-gray-700">自提点{{i+1}}:</div>
				
				<div class="pl-5 flex items-center"><el-input v-model="pkStation.fullName" placeholder="全称" class="w-10 mr-2" size="mini"></el-input></div>
			
				<div class="pl-5 flex items-center"><el-input v-model="pkStation.name" placeholder="简称" class="w-10 mr-2" size="mini"></el-input></div>
				
				<el-button @click="deletePkStation(i)" size="mini" class="ml-10">删除</el-button>
			
		</el-row>
		
		<el-row
			v-permission="{
				or: [$service.app.commodity.deliveryCharge.permission.add, $service.app.commodity.deliveryCharge.permission.update, $service.app.commodity.deliveryCharge.permission.delete]
			}"
		>
			<div style="display: flex; align-items: center; margin-bottom: 10px;margin-top: 20px;">
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
		<cl-dialog :visible.sync="addCostLineDialog" title="添加折扣">
			<el-form label-width="100px">
				<el-form-item label="折扣">
					<el-input size="mini" style="width:120px" type="number" v-model="addCostLineDialogRate"></el-input>
				</el-form-item>
 				<el-button @click="addCostLine">确定</el-button>
			</el-form>
		</cl-dialog>
		<cl-dialog :visible.sync="commodityVisible">
			<CommodityDialog 
				@refresh="updateCommodityDiscount" 
				:index="costInfoIndex" 
				:costInfoList="costInfoList"
				/>
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
			
			pkStationList: [
				{
					fullName: '',
					name: ''
				}
			],
			commodityVisible: false,
			costPanel: false,
			//costInfoId: null,
			costInfoIndex: 0,
			costInfoList: [
				{
					rate:100
					//discountId:
					//commodityId
				}
			],
			addCostLineDialog:false,
			addCostLineDialogRate:0,
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
		async deleteDiscount({discountId},i){
			let flag = await this.$confirm('是否删除折扣？折扣商品将恢复原价。', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
			if(flag){
				await this.$service.app.discount.deleteDiscount({
					discountId,
				})
				this.$message.success('删除成功');
			  await this.getGlobalConfig()
			}
		},
		async deletePkStation(i) {
			console.log("delete i")
			console.log(i)
			console.log(this.pkStationList)
			if (this.pkStationList.length>0){
				if (confirm("确定删除吗")) {
					 
					
					await this.$service.app.pkStation.update({
						id: this.pkStationList[i].pkStationId,
						isDeleted: 1
					})
					this.pkStationList.splice(i,i+1);
				}
				
				
			}
			
		},
		addPkStation() {
			if (this.pkStationList.length>0) {
				let pkStation = this.pkStationList[this.pkStationList.length-1];
				if (!(pkStation.fullName == "" && pkStation.name == "")) {
					this.pkStationList.push({
						fullName: "",
						name: ""
					})
				}
			}
			else {
				this.pkStationList.push({
					fullName: "",
					name: ""
				})
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
		async addCostLine() {
			this.costInfoList.push({
				rate:this.addCostLineDialogRate,
				value:100,
				commodityId:"",
			})
			await this.$service.app.discount.createDiscount({
				discountList:this.costInfoList
			});
			this.addCostLineDialog = false
			let discountInfo = await this.$service.app.discount.list();
			this.costInfoList = discountInfo;
			// if (this.costInfoList.length>0){
			// 	let costInfoLast = this.costInfoList[this.costInfoList.length-1];
			// 	if (costInfoLast.value!="" || Number(costInfoLast.value)!=100) {
			// 		this.costInfoList.push({
			// 			value:100,
			// 			commodityId:"",
			// 			rate:0
			// 		})
			// 	}
			// }
			// else {
			// 	this.costInfoList.push({
			// 		value:100,
			// 		commodityId:"",
			// 			rate:0
			// 	})
			// }
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
				this.pkStationList=[];
				let _pkInfo = await this.$service.app.pkStation.page({
					size: 99999,
					page: 1,
					sort: '',
					isDeleted: 0
				});
				console.log(_pkInfo)
				let _pkStationList = _pkInfo.list;
				for (let i in _pkStationList) {
					this.pkStationList.push({
						pkStationId: _pkStationList[i].id,
						fullName: _pkStationList[i].fullName,
						name: _pkStationList[i].name
					})
				}
				console.log("pkStationList")
				console.log(this.pkStationList)
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
				for (let i in this.costInfoList) {
					let costInfo = this.costInfoList[i];
					if (!costInfo.rate || costInfo.rate=="") {
						alert("需填写折扣率")
						return;
					}
				}
				for (let i in this.pkStationList) {
					let pkStation = this.pkStationList[i];
					if (!pkStation.name || pkStation.name == ""){
						alert("需填写自提点简称")
						return;
					}
				}
				for (let i in this.pkStationList) {
					let pkStation = this.pkStationList[i];
					if (!pkStation.fullName || pkStation.fullName == ""){
						alert("需填写自提点全称")
						return;
					}
				}
				console.log("submit")
				console.log(this.costInfoList)
				await this.$service.app.discount.createDiscount({
					discountList:this.costInfoList
				});
				await this.$service.app.pkStation.createPkStation({
					pkStationList: this.pkStationList
				})
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
