<template>
	<div class="page-layout" :class="{ collapse: menuCollapse }">
		<div class="page-layout__left">
			<slider></slider>
		</div>

		<div class="page-layout__right">
			<div class="page-layout__topbar">
				<topbar></topbar>
			</div>

			<div class="page-layout__process" v-if="conf.showProcess">
				<process></process>
			</div>

			<div class="page-layout__container">
				<div class="page-layout__view">
					<keep-alive>
						<router-view v-if="$route.meta.keepAlive"></router-view>
					</keep-alive>

					<router-view v-if="!$route.meta.keepAlive"></router-view>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import Topbar from "./topbar";
import Slider from "./slider";
import Process from "./process";

export default {
	components: {
		Topbar,
		Slider,
		Process
	},

	computed: {
		...mapGetters(["menuCollapse", "conf"])
	}
};
</script>

<style lang="scss" scoped>
.page-layout {
	background-color: #f7f7f7;
	height: 100%;
	width: 100%;
	display: flex;
	overflow: hidden;

	&__left {
		background-color: $color-main;
		overflow: hidden;
		height: 100%;
		width: 255px;
	}

	&__right {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: calc(100% - 255px);
	}

	&__topbar {
		margin-bottom: 10px;
	}

	&__process {
		margin-bottom: 10px;
		padding: 0 10px;
	}

	&__container {
		width: 100%;
		box-sizing: border-box;
		flex: 1;
		overflow: hidden;
		margin-bottom: 10px;
	}

	&__view {
		height: 100%;
		width: 100%;
		box-sizing: border-box;
		padding: 0 10px;
		border-radius: 3px;

		& > div {
			height: 100%;
		}
	}

	&.collapse {
		.page-layout__left {
			width: 64px;
		}

		.page-layout__right {
			width: calc(100% - 64px);
		}
	}
}
</style>
