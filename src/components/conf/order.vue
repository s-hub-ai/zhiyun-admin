<template>
	<div class="conf-order">
		<el-form-item label="确认时间（天）">
			<el-input-number v-model="form.order.orderConfirm" :min="1" :max="30"></el-input-number>
		</el-form-item>

		<el-form-item label="关闭时间（天）">
			<el-input-number v-model="form.order.orderClose" :min="1" :max="30"></el-input-number>
		</el-form-item>
	</div>
</template>

<script>
export default {
	inject: ["form"]
};
</script>
