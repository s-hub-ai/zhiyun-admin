<template>
	<el-card class="box-card">
		<!-- 		<span>商品信息</span>
		<el-divider></el-divider> -->
		<el-tabs v-model="activeName" type="card">
			<el-tab-pane label="商城商品" name="1">
				<mall-form v-permission="$service.app.commodity.shopping.permission.add" v-if="activeName == 1"></mall-form>
			</el-tab-pane>
			<el-tab-pane label="积分商品" name="2">
				<integral-form v-permission="$service.app.commodity.score.permission.add" v-if="activeName == 2"></integral-form>
			</el-tab-pane>
			<el-tab-pane label="青训课程" name="3">
				<TrainForm v-permission="$service.app.commodity.score.permission.add" v-if="activeName == 3"></TrainForm>
			</el-tab-pane>
		</el-tabs>
	</el-card>
</template>

<script>
import MallForm from '@/views/CommodityManagement/ProductRelease/MallForm';
import IntegralForm from '@/views/CommodityManagement/ProductRelease/IntegralForm';

export default {
	components: {
		MallForm,
		IntegralForm,
		TrainForm:()=>import('./TrainForm.vue')
	},
	data() {
		return {
			activeName: '1'
		};
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
.box-card {
	overflow-y: auto;
}
</style>
