<template>
	<div class="count-effect">
		<div class="card">
			<div class="card__header">
				<span class="label">总订单数</span>
				<span class="value">{{ d.all }}</span>
			</div>

			<div class="card__container" style="display: flex">
				<span style="padding-right: 10px">付款占比 </span>
				<el-progress style="flex: 1" :percentage="(((d.yfk + d.ywc + d.fqtk) / d.all) * 100) | fixed" :stroke-width="8"></el-progress>
			</div>

			<div class="card__footer">
				<ul class="count-effect__cop">
					<li>
						<span>待付款</span>

						<div class="fall">
							<!-- 	<i class="el-icon-bottom-right"></i> -->
							<span>{{ d.dfk|default }}</span>
						</div>
					</li>

					<li>
						<span>已付款</span>

						<div class="rise">
							<!-- 					<i class="el-icon-top-right"></i> -->
							<span>{{ d.yfk|default }}</span>
						</div>
					</li>
					<li>
						<span>退款申请</span>

						<div class="fall">
							<!-- 	<i class="el-icon-bottom-right"></i> -->
							<span>{{ d.fqtk|default }}</span>
						</div>
					</li>
					<li>
						<span>已完成</span>

						<div class="rise">
							<!-- 	<i class="el-icon-bottom-right"></i> -->
							<span>{{ d.ywc|default }}</span>
						</div>
					</li>
					<li>
						<span>已关闭</span>

						<div class="fall">
							<!-- 	<i class="el-icon-bottom-right"></i> -->
							<span>{{ d.ygb|default }}</span>
						</div>
					</li>
				</ul>
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
				this.d = await this.$service.app.count.orders();
			} catch (error) {
				this.$message.error(error);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import './common.scss';

.count-effect {
	&__cop {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;

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

	.card__container {
		padding-top: 15px;
		padding-right: 10px;
		box-sizing: border-box;
	}
}
</style>
