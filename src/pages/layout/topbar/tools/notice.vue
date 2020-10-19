<template>
	<li class="app-tools-notice">
		<el-badge :value="number" :is-dot="number == 0">
			<i class="el-icon-message-solid"></i>
		</el-badge>
	</li>
</template>

<script>
export default {
	data() {
		return {
			number: 9
		};
	}
};
</script>

<style lang="scss" scoped>
.app-tools-notice {
	position: relative;

	.el-icon-message-solid {
		font-size: 20px;
	}

	/deep/.el-badge {
		transform: scale(0.8);
	}
}
</style>
