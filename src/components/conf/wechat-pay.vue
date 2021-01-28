<template>
	<div class="conf-wechat">
		<el-form-item label="商务号">
			<el-input v-model="form.wxPay.payWx.mchid" placeholder="mchid"></el-input>
		</el-form-item>

		<el-form-item label="密钥">
			<el-input v-model="form.wxPay.payWx.partnerKey" placeholder="partnerKey"></el-input>
		</el-form-item>

		<el-form-item label="回调地址">
			<el-input v-model="form.wxPay.payWx.notify_url" placeholder="notify_url"></el-input>
		</el-form-item>
	</div>
</template>

<script>
export default {
	inject: ["form"]
};
</script>
