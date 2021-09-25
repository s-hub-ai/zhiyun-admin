<template>
	<div class="home">
		<h1>欢迎使用</h1>
	</div>
</template>

<script>

export default {

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
