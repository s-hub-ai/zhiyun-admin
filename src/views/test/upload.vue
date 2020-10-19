<template>
	<div class="demo-upload">
		<div class="demo-upload__item">
			<p>多图上传</p>

			<cl-upload multiple :limit="3" listType="picture-card"></cl-upload>
		</div>

		<div class="demo-upload__item">
			<p>单图上传</p>
			<cl-upload accept="*"></cl-upload>
		</div>

		<div class="demo-upload__item">
			<p>文件上传</p>
			<cl-upload multiple :limit="3" accept="*" list-type="file"></cl-upload>
		</div>

		<div class="demo-upload__item">
			<p>文件空间</p>
			<cl-upload v-model="urls" is-space></cl-upload>

			{{ urls }}
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			urls: ""
		};
	}
};
</script>

<style lang="scss" scoped>
.demo-upload {
	overflow: hidden auto;

	.demo-upload__item {
		margin-bottom: 20px;
		background-color: #fff;
		padding: 10px;

		& > p {
			margin-bottom: 10px;
			font-size: 14px;
		}
	}
}
</style>
