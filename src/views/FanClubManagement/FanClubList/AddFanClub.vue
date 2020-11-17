<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		<div style="max-width: 500px">
			<el-form-item label="球迷会名称" prop="fanClubName">
				<el-input v-model="ruleForm.fanClubName" placeholder="请输入球迷会的名称"></el-input>
			</el-form-item>
			<el-form-item class="form-item" prop="fanClubRegion" label="区域">
				<el-select style="width: 100%" v-model="ruleForm.fanClubRegion" placeholder="请选择">
					<el-option v-for="item in fanClubRegionList" :key="item.id" :label="item.regionName" :value="item.id"> </el-option>
				</el-select>
			</el-form-item>

			<el-form-item class="form-item" label="负责人" prop="personLiable">
				<el-input type="text" v-model="ruleForm.personLiable" placeholder="请输入负责人姓名"></el-input>
			</el-form-item>
			<el-form-item class="form-item" label="手机号" prop="phoneNum">
				<el-input type="text" v-model="ruleForm.phoneNum" placeholder="请输入负责人手机号" maxlength="11"></el-input>
			</el-form-item>
			<el-form-item label="球迷会封面" prop="fanClubCover">
				<cl-upload multiple :limit="5" :value="ruleForm.fanClubCover" class="avatar-uploader" :size="[150, 150]" icon="el-icon-plus" accept="*" :on-success="fanClubCoverUploadSuccess"></cl-upload>
			</el-form-item>
			<el-form-item style="text-align: center">
				<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</div>
	</el-form>
</template>

<script>
export default {
	computed: {
		fanClubRegionList() {
			return this.$store.state.common.fanClubRegion;
		}
	},
	data() {
		return {
			ruleForm: {
				fanClubName: '',
				fanClubRegion: '',
				personLiable: '',
				phoneNum: '',
				fanClubCover: ''
			},
			rules: {
				fanClubName: [{ required: true, message: '请输入球迷会名称', trigger: 'blur' }],
				fanClubRegion: [{ required: true, message: '请选择区域', trigger: 'change' }],
				personLiable: [{ required: true, message: '请填写负责人', trigger: 'blur' }],
				phoneNum: [{ required: true, message: '请填写负责人手机号', trigger: 'blur' }],
				fanClubCover: [{ required: true, message: '请上传球迷会封面', trigger: 'blur' }]
			}
		};
	},
	created() {},
	methods: {
		async getEditInfo(id) {
			try {
				let res = await this.$service.app.fanClub.info({ id });
				this.ruleForm = res;
			} catch (error) {
				this.$message.error(error);
			}
		},
		fanClubCoverUploadSuccess(res) {
			if (res) {
				this.ruleForm.fanClubCover = res;
			}
		},
		//
		submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					try {
						let params = {
							...this.ruleForm
						};
						await this.$service.app.fanClub.add(params);

						this.$emit('update:addDialogShow', false);
					} catch (error) {
						this.$message.error(error);
					}
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		}
	}
};
</script>

<style lang="scss" scoped>
.box-card {
	overflow-y: auto;
}
.form-item {
	::v-deep .el-input {
		min-width: 250px;
	}
}
</style>
