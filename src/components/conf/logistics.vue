<template>
	<div class="conf-logistics">
		<el-form-item label="appcode">
			<el-input v-model="form.logistics.logisticsAppCode" placeholder="appcode"></el-input>
		</el-form-item>
	</div>
</template>

<script>
export default {
	inject: ["form"]
};
</script>
