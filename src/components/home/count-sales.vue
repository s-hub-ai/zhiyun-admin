<template>
	<div class="count-sales">
		<div class="card">
			<div class="card__header">
				<span class="label">总实付金额</span>
				<span class="value">￥{{ d.realPayment | fixed }}</span>
			</div>

			<div class="card__container">
				<ul class="count-sales__cop">
					<li>
						<span>总优惠金额</span>

						<div class="fall">
							<!-- 	<i class="el-icon-bottom-right"></i> -->
							<span>{{ d.salePromotion | fixed }}</span>
						</div>
					</li>

					<li>
						<span>总奖励积分</span>

						<div class="rise">
							<!-- 	<i class="el-icon-top-right"></i> -->
							<span>{{ Number(d.scoreReward) }}</span>
						</div>
					</li>
				</ul>
			</div>

			<div class="card__footer">
				<span class="label">日实付金额</span>
				<span class="value">￥{{ d.today_realPayment | fixed }}</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			d: {}
		};
	},
	created() {
		this.getData();
	},
	methods: {
		async getData() {
			try {
				this.d = await this.$service.app.count.sales();
			} catch (error) {
				this.$message.error(error);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import './common.scss';

.count-sales {
	&__cop {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 50px;

		li {
			display: flex;
			list-style: none;
			flex: 1;
			color: #d8d8d8;

			.fall,
			.rise {
				display: flex;
				align-items: center;
				margin-left: 10px;
			}

			.fall {
				color: #13ae7c;
			}

			.rise {
				color: #f21e37;
			}
		}
	}
}
</style>
