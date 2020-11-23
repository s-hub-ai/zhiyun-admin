<template>
	<div class="conf-ali-pay">
		<el-row :gutter="10">
			<el-col :span="12">
				<el-form-item label="appId">
					<el-input v-model="form.aliPay.payAli.appId" placeholder="appId"></el-input>
				</el-form-item>
			</el-col>

			<el-col :span="12">
				<el-form-item label="notifyUrl">
					<el-input
						v-model="form.aliPay.payAli.notifyUrl"
						placeholder="notifyUrl"
					></el-input>
				</el-form-item>
			</el-col>

			<el-col :span="12">
				<el-form-item label="sandbox">
					<el-switch v-model="form.aliPay.payAli.sandbox"></el-switch>
				</el-form-item>
			</el-col>

			<el-col :span="12">
				<el-form-item label="sinType">
					<el-select v-model="form.aliPay.payAli.sinType">
						<el-option value="RSA2" label="RSA2"></el-option>
						<el-option value="RSA" label="RSA"></el-option>
					</el-select>
				</el-form-item>
			</el-col>
		</el-row>

		<el-form-item label="private key">
			<el-input
				v-model="form.aliPay.payAliPrivate"
				placeholder="PRIVATE KEY"
				type="textarea"
				rows="5"
			></el-input>
		</el-form-item>

		<el-form-item label="public key">
			<el-input
				v-model="form.aliPay.payAliPublic"
				placeholder="PUBLIC KEY"
				type="textarea"
				rows="5"
			></el-input>
		</el-form-item>
	</div>
</template>

<script>
export default {
	inject: ["form"]
};
</script>
