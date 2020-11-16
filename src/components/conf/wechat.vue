<template>
	<div class="conf-wechat">
		<el-form-item label="开放平台">
			<el-row type="flex" :gutter="10">
				<el-col :span="12">
					<el-input
						v-model="form.wxOpen.wxOpenAccess.appid"
						placeholder="appid"
					></el-input>
				</el-col>
				<el-col :span="12">
					<el-input
						v-model="form.wxOpen.wxOpenAccess.secret"
						placeholder="appsecret"
					></el-input>
				</el-col>
			</el-row>
		</el-form-item>

		<el-form-item label="小程序">
			<el-row type="flex" :gutter="10">
				<el-col :span="12">
					<el-input
						v-model="form.wxMini.wxMiniAccess.appid"
						placeholder="appid"
					></el-input>
				</el-col>
				<el-col :span="12">
					<el-input
						v-model="form.wxMini.wxMiniAccess.secret"
						placeholder="appsecret"
					></el-input>
				</el-col>
			</el-row>
		</el-form-item>

		<el-form-item label="公众号">
			<el-row type="flex" :gutter="10">
				<el-col :span="12">
					<el-input v-model="form.wxMp.wxMpAccess.appid" placeholder="appid"></el-input>
				</el-col>
				<el-col :span="12">
					<el-input
						v-model="form.wxMp.wxMpAccess.secret"
						placeholder="appsecret"
					></el-input>
				</el-col>
			</el-row>
		</el-form-item>
	</div>
</template>

<script>
export default {
	inject: ["form"]
};
</script>
