<template>
	<div class="conf-oss">
		<el-form-item label="AccessKeyId">
			<el-input v-model="form.oss.ossAccessKeyId" placeholder="AccessKeyId"></el-input>
		</el-form-item>

		<el-form-item label="AccessKeySecret">
			<el-input
				v-model="form.oss.ossAccessKeySecret"
				placeholder="AccessKeySecret"
			></el-input>
		</el-form-item>

		<el-form-item label="Bucket">
			<el-input v-model="form.oss.ossBucket" placeholder="Bucket"></el-input>
		</el-form-item>

		<el-form-item label="Endpoint">
			<el-input v-model="form.oss.ossEndpoint" placeholder="Endpoint"></el-input>
		</el-form-item>

		<el-form-item label="Timeout">
			<el-input v-model="form.oss.ossTimeout" placeholder="Timeout"></el-input>
		</el-form-item>
	</div>
</template>

<script>
export default {
	inject: ["form"]
};
</script>
