<template>
	<div class="conf-sms">
		<el-form-item label="名称">
			<el-input v-model="form.sms.smsSignName" placeholder="请填写名称"></el-input>
		</el-form-item>
		<el-form-item label="key">
			<el-input v-model="form.sms.smsAccessKeyId" placeholder="key"></el-input>
		</el-form-item>
		<el-form-item label="secret">
			<el-input v-model="form.sms.smsAccessSecret" placeholder="secret"></el-input>
		</el-form-item>

		<el-row type="flex" :gutter="10">
			<el-col :span="12">
				<el-form-item label="模板ID">
					<el-input
						v-model="form.sms.smsVerifyTemplate.code"
						placeholder="code"
					></el-input>
				</el-form-item>
			</el-col>

			<el-col :span="12">
				<el-form-item label="模板内容">
					<el-input
						v-model="form.sms.smsVerifyTemplate.template"
						placeholder="template"
					></el-input>
				</el-form-item>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	inject: ["form"]
};
</script>
