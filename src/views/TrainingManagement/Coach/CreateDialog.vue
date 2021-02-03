<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
		<el-form-item label="教练头像" prop="portrait" >
			<cl-upload
				:value="ruleForm.portrait"
				class="avatar-uploader"
				:size="[150, 150]"
				icon="el-icon-plus"
				accept="image/*"
				:on-success="imgUploadSuccess"
			></cl-upload>
		</el-form-item>
		<el-form-item label="教练姓名：" prop="name">
			<el-input v-model="ruleForm.name"></el-input>
		</el-form-item>
		<el-form-item label="教练等级：" prop="level">
			<el-select  v-model="ruleForm.level">
				<el-option
					v-for="item in ['A','B','C','D','E']"
					:key="item"
					:label="item"
					:value="item">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="手机号码：" prop="phoneNum">
			<el-input maxlength="11" show-word-limit v-model="ruleForm.phoneNum"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')">{{ruleForm.id?'修改':'新增'}}</el-button>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
import { floatFix1 , phoneRule} from '../com/rules'
export default {
	data() {
		return {
            ruleForm: {
				name:"",
				level:"",
				phoneNum:"",
				portrait:"",
            },
            rules: {
				name:[{required: true, message: '请填写姓名'}],
				level:[{required: true, message: '请选择等级'}],
				phoneNum:[{required: true, message: '请填写手机号'},{trigger:'blur',validator:phoneRule}]
            }
		};
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				 
				if (valid) {
					let params = {
						...this.ruleForm
					};
					if (params.id) {
						await this.$service.training.coach.update(params);
					} else {
						await this.$service.training.coach.add(params);
					}

					this.$alert(params.id ? '修改成功' : '添加成功', '提示', {
						confirmButtonText: '确定',
						callback: (action) => {
							this.$emit('update:addDialogShow', false);
						}
					});
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		async getEditInfo(id) {
			try {
				let res = await this.$service.training.coach.info({ id });
				this.ruleForm = res;
			} catch (error) {
				this.$message.error(error);
			}
		},
		resetForm(formName) {
			console.log('重置表单');
			this.$refs[formName].resetFields();
		},
		imgUploadSuccess(res, file, fileList) {
			console.log(res)
			this.ruleForm.portrait = res
		},
	}
};
</script>

<style lang="scss" scoped>
.demo-ruleForm {
	height: 100%;
}
</style>
