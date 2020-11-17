<template>
	<cl-crud @load="onLoad">
		<el-row type="flex" align="middle">
			<h4>积分设置</h4>
			<cl-flex1></cl-flex1>
		</el-row>
		<div class="flex items-center my-3">
			<div class="w-32 text-right text-gray-700">
				积分抵扣比例：
			</div>
			<div class="pl-5 text-gray-600 test-sm">
				注：抵扣比例×商品价格（或优惠价，不含运费）=抵扣金额
			</div>
		</div>
		<div class="flex items-center my-3">
			<div class="w-32 text-right text-gray-700 ">
				商城购物：
			</div>
			<div class="pl-5 flex items-center">
				 <el-input v-model="globalConfig.scoreDeductionRatio" class="w-10 mr-2"></el-input> %
			</div>
		</div>
		<div class="flex items-center my-3">
			<div class="w-32 text-right text-gray-700">
				积分消耗比例：
			</div>
			<div class="pl-5 text-gray-600 test-sm">
				注：抵扣金额÷消耗比例=消耗积分，积分取整
			</div>
		</div>
		<div class="flex items-center my-3">
			<div class="w-32 text-right text-gray-700 ">
				商城购物：
			</div>
			<div class="pl-5 flex items-center">
				 <el-input v-model="globalConfig.scoreCostRatio" class="w-10 mr-2"></el-input> %
			</div>
		</div>
		<div class="flex items-center my-3">
			<div class="w-32 text-right text-gray-700">
				积分奖励比例：
			</div>
			<div class="pl-5 text-gray-600 test-sm">
				注：奖励比例×商品价格（或优惠价，不含运费）=奖励积分，积分取整
			</div>
		</div>
		<div class="flex items-center my-3">
			<div class="w-32 text-right text-gray-700 ">
				 商城购物：
			</div>
			<div class="pl-5 flex items-center">
				 <el-input v-model="globalConfig.scoreRewardRatio" class="w-10 mr-2"></el-input> %
			</div>
		</div>
	 
		<el-row type="flex" align="middle">
			<h4>运费设置</h4>
			<cl-flex1></cl-flex1>
		</el-row>
		<el-form>
			<el-form-item label="配送方式：">
				<el-checkbox-group v-model="deliveryMethod">
				<el-checkbox  label="0" name="type">普通快递</el-checkbox>
				<el-checkbox  label="1" name="type">到店自提</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
		</el-form>

		<el-row>
			<cl-table
				:props="{
					'span-method': objectSpanMethod
				}"
				:columns="tableColumn"
			>
			<template #column-deleveryChargeValue="{ scope }">
				<span v-if="editing!=scope.row">{{scope.row.deleveryChargeValue}}</span>
				<span v-else>
					<el-input type="number" v-model="scope.row.deleveryChargeValue"></el-input>
				</span>
			</template>
			<template #column-op="{ scope }">
				<el-button type="text" v-if="editing!=scope.row" @click="editing = scope.row">修改</el-button>
				<el-button type="text" v-else @click="update(scope.row)">确认</el-button>
			</template>
			</cl-table>
		</el-row>

		<el-row type="flex">
			<el-button @click="updateGlobalConfig">确定</el-button>
			<cl-flex1></cl-flex1>
		</el-row>
	</cl-crud>
</template>

<script>
export default {
	name:'deliverCharge',
	data() {
		return {
			globalConfig:{
				scoreCostRatio:"",
				scoreRewardRatio:"",
				scoreDeductionRatio:"",
				deliveryMethod:""
			},
			deliveryMethod:[],
			editing:'',
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
	created(){
		this.getGlobalConfig()
	},
	methods: {
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
		async getGlobalConfig(){
			try {
				let data = await this.$service.app.commodity.globalConfig.info( );
				Object.assign(this.globalConfig,data);
				this.deliveryMethod = data.deliveryMethod.split(',')
			} catch (error) {
				this.$message.error(error);
			}
		},
		//更新全局设置
		async updateGlobalConfig(){
			let data = Object.assign(this.globalConfig,{
				deliveryMethod:this.deliveryMethod.join(',')
			})
			console.log(data);
			try {
				await this.$service.app.commodity.globalConfig.update(data);
				this.$message.success('修改成功');
			} catch (error) {	
				this.$message.error(error);
			}
		},
		update(v){
			console.log(v);
			this.editing = ""
		},
		onLoad({ ctx, app }) {
			const _this = this
			ctx
				// .service(this.$service.app.commodity.delivery)
				.service({
					page:async ()=>{
						return Promise.resolve([
							{deliveryMethod:35,deliveryRegion:"江浙沪",deleveryChargeValue:'6'},
							{deliveryMethod:35,deliveryRegion:"其他地区",deleveryChargeValue:'20'}
						])
					}
				})
				.done();
			app.refresh()
		}
	}
};
</script>
