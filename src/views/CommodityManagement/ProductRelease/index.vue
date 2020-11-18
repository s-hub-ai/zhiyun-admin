<template>
	<el-card class="box-card">
		<!-- 		<span>商品信息</span>
		<el-divider></el-divider> -->
		<el-tabs v-model="activeName" type="card">
			<el-tab-pane label="商城商品" name="1">
				<mall-form v-if="activeName == 1"></mall-form>
			</el-tab-pane>
			<el-tab-pane label="积分商品" name="2">
				<integral-form v-if="activeName == 2"></integral-form>
			</el-tab-pane>
			<el-tab-pane label="票务商品" name="3">
				<ticket-form v-if="activeName == 3"></ticket-form>
			</el-tab-pane>
			<el-tab-pane label="付费活动" name="4">
				<pay-form v-if="activeName == 4"></pay-form>
			</el-tab-pane>
		</el-tabs>
	</el-card>
</template>

<script>
import MallForm from '@/views/CommodityManagement/ProductRelease/MallForm';
import IntegralForm from '@/views/CommodityManagement/ProductRelease/IntegralForm';
import PayForm from '@/views/CommodityManagement/ProductRelease/PayForm';
import TicketForm from '@/views/CommodityManagement/ProductRelease/TicketForm';

export default {
	components: {
		MallForm,
		IntegralForm,
		PayForm,
		TicketForm
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
