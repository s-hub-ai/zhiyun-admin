<template>
	<div class="home">
		<el-row :gutter="15">
			<el-col :span="12" :xl="6">
				<div class="card">
					<count-sales></count-sales>
				</div>
			</el-col>
			<!-- 			<el-col :span="12" :xl="6">
				<div class="card">
					<count-views></count-views>
				</div>
			</el-col>
			<el-col :span="12" :xl="6">
				<div class="card">
					<count-paid></count-paid>
				</div>
			</el-col> -->
			<el-col :span="12" :xl="6">
				<div class="card">
					<count-effect></count-effect>
				</div>
			</el-col>
		</el-row>

		<!-- 		<el-row :gutter="15">
			<el-col :span="24" :xl="14">
				<div class="card">
					<tab-chart></tab-chart>
				</div>
			</el-col>
			<el-col :span="24" :xl="10">
				<div class="card">
					<sales-rank></sales-rank>
				</div>
			</el-col>
		</el-row> -->

		<el-row :gutter="15">
			<el-col :span="24" :xl="14">
				<div class="card card--last">
					<count-goods></count-goods>
				</div>
			</el-col>
			<!-- 			<el-col :span="24" :xl="10">
				<div class="card card--last">
					<category-ratio></category-ratio>
				</div>
			</el-col> -->
		</el-row>
	</div>
</template>

<script>
import CategoryRatio from '@/components/home/category-ratio';
import CountSales from '@/components/home/count-sales';
import CountViews from '@/components/home/count-views';
import CountPaid from '@/components/home/count-paid';
import CountEffect from '@/components/home/count-effect';
import TabChart from '@/components/home/tab-chart';
import SalesRank from '@/components/home/sales-rank';
import HotSearch from '@/components/home/hot-search';
import CountGoods from '@/components/home/count-goods';

export default {
	components: {
		CountSales,
		CountEffect,
		CountGoods
	},

	data() {
		return {};
	},

	methods: {}
};
</script>

<style lang="scss" scoped>
.home {
	overflow: hidden auto;

	.card {
		background-color: #fff;
		border-radius: 5px;
		margin-bottom: 15px;

		&--last {
			margin-bottom: 0;
		}
	}
}
</style>
