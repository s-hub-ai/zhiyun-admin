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

		<el-row type="flex" align="middle">
			<h4>运费设置</h4>
			<el-button small @click="dialog = true">新增</el-button>
			<cl-refresh-btn></cl-refresh-btn>
		</el-row>

		<el-form>
			<el-form-item label="配送方式：">
				<el-checkbox-group v-model="deliveryMethod">
					<el-checkbox label="0" name="type">普通快递</el-checkbox>
					<el-checkbox label="1" name="type">到店自提</el-checkbox>
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

		<el-row type="flex">
			<el-button @click="updateGlobalConfig">确定</el-button>
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
	</cl-crud>
</template>

<script>
export default {
	name: 'deliverCharge',
	data() {
		return {
			dialog: false,
			globalConfig: {
				scoreCostRatio: '',
				scoreRewardRatio: '',
				scoreDeductionRatio: '',
				deliveryMethod: ''
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
	created() {
		this.getGlobalConfig();
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
		async getGlobalConfig() {
			try {
				let data = await this.$service.app.commodity.globalConfig.info();
				Object.assign(this.globalConfig, data);
				this.deliveryMethod = data.deliveryMethod.split(',');
			} catch (error) {
				this.$message.error(error);
			}
		},
		//更新全局设置
		async updateGlobalConfig() {
			let data = Object.assign(this.globalConfig, {
				deliveryMethod: this.deliveryMethod.join(',')
			});
			console.log(data);
			try {
				await this.$service.app.commodity.globalConfig.update(data);
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
::v-deep .cl-crud {
	overflow-y: auto;
}
</style>
