<template>
	<el-card class="box-card">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<span>{{ id == null ? '新增轮播图' : '编辑轮播图' }}</span>
			<el-divider></el-divider>
			<div style="max-width: 900px">
				<el-form-item label="名称" prop="bannerName">
					<el-input v-model="ruleForm.bannerName" placeholder="请输入轮播图名称"></el-input>
				</el-form-item>
				<el-form-item label="位置" required>
					<el-select v-model="ruleForm.bannerShowLocation" placeholder="请选择">
						<el-option
							v-for="item in [
								{ value: 'home', text: '首页' },
								{ value: 'mall', text: '商城' }
							]"
							:key="item.value"
							:label="item.text"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<div style="display: flex">
					<el-form-item class="form-item" label="URL" prop="bannerLinkType">
						<el-select v-model="ruleForm.bannerLinkType" placeholder="请选择">
							<el-option
								v-for="item in [
									{ value: 1, text: '站内信' },
									{ value: 2, text: '短信' }
								]"
								:key="item.value"
								:label="item.text"
								:value="item.value"
							>
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="form-item" label-width="10px" required>
						<el-input v-model="ruleForm.bannerLinkUrl" placeholder="请填写链接地址">
							<template slot="prepend">https://</template>
						</el-input>
					</el-form-item>
				</div>
				<el-form-item label="图片" required>
					<cl-upload
						:value="ruleForm.bannerImg"
						:filePath="ruleForm.bannerImg"
						class="avatar-uploader"
						:size="[150, 350]"
						icon="el-icon-plus"
						accept="*"
						:on-success="bannerImgUploadSuccess"
					></cl-upload>
					<span style="color: #909399">注：限上传一张,建议图片大小350*150</span>
				</el-form-item>
				<el-form-item label="排序" required>
					<el-input-number v-model="ruleForm.sort" :min="1"></el-input-number>
					<span style="color: #909399; padding-left: 10px">注：数字越小,轮播图越靠前</span></el-form-item
				>
				<el-form-item label="状态">
					<el-switch
						size="large"
						active-text="启用"
						inactive-text="停用"
						v-model="ruleForm.startStatus"
						:active-value="1"
						:inactive-value="0"
						active-color="#13ce66"
						inactive-color="#ff4949"
					></el-switch
				></el-form-item>
				<el-form-item style="text-align: center">
					<el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
				</el-form-item>
			</div>
		</el-form>
	</el-card>
</template>

<script>
export default {
	computed: {
		id() {
			return this.$route.query.id;
		}
	},
	data() {
		return {
			ruleForm: {
				sort: 1,
				startStatus: 0
			},
			rules: {
				bannerName: [{ required: true, message: '请输入轮播图名称', trigger: 'blur' }]
			}
		};
	},
	methods: {
		bannerImgUploadSuccess() {}
	}
};
</script>

<style lang="scss" scoped>
.box-card {
	overflow-y: auto;
}
.form-item {
	::v-deep .el-input {
		min-width: 300px;
	}
}
</style>
