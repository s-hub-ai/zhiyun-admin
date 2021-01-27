<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
		<el-row :gutter="20">
			<el-col :span="12">
				<el-form-item label="学员姓名" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>

				<el-form-item label="身高(cm)" prop="height">
					<el-input v-model="ruleForm.height" type="number"></el-input>
				</el-form-item>
				<el-form-item label="体重(kg)" prop="weight">
					<el-input v-model="ruleForm.weight" type="number"></el-input>
				</el-form-item>

		 		<el-form-item label="手机号码" prop="phoneNumArray">
					 <MultiPhone  v-model="ruleForm.phoneNumArray"/>
				</el-form-item>
				<el-form-item label="学籍" prop="school">
					<el-input v-model="ruleForm.school"></el-input>
				</el-form-item>
				<el-form-item label="身份证" prop="identityCardNumber">
					<el-input v-model="ruleForm.identityCardNumber"></el-input>
				</el-form-item>
				
				
			</el-col>
			<el-col :span="12">
				<el-form-item label="学员头像" prop="portrait">
					<cl-upload
						:value="ruleForm.portrait"
						class="avatar-uploader"
						:size="[150, 150]"
						icon="el-icon-plus"
						accept="image/*"
						:on-success="imgUploadSuccess"
					></cl-upload>
				</el-form-item>
				<el-form-item label="学员姓别" prop="sex">
					<el-select  v-model="ruleForm.sex">
						<el-option
							v-for="item in sexDict"
							:key="item.text"
							:label="item.text"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="出生日期" prop="birthday">
					<el-date-picker
						v-model="ruleForm.birthday"
						type="date"
						placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="开始训练" prop="trainDate">
					<el-date-picker
						v-model="ruleForm.trainDate"
						type="date"
						placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="惯用脚" prop="foot">
					<el-select  v-model="ruleForm.foot">
						<el-option
							v-for="item in footDict"
							:key="item.text"
							:label="item.text"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="位置" prop="position">
					<el-select  v-model="ruleForm.position">
						<el-option
							v-for="item in positionDict"
							:key="item.text"
							:label="item.text"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="归属地" prop="address">
					<el-select  v-model="ruleForm.address">
						<el-option
							v-for="item in addressDict"
							:key="item.text"
							:label="item.text"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
		</el-row>
		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')">{{ruleForm.id?'修改':'新增'}}</el-button>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
import {sexDict , footDict, positionDict, addressDict} from '@/dict'
export default {
	components:{
		MultiPhone:()=>import('./MultiPhone')
	},
	data() {
		return {
            ruleForm: {
				name:"",
				sex:"",
				height:"",
				weight:"",
				birthday:"",
				trainDate:"",
				phoneNumArray:"",
				address:"",
				school:"",
				identityCardNumber:"",
				foot:"",
				position:"",
				portrait:"",
            },
            rules: {

			},
			...{sexDict , footDict, positionDict, addressDict}
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
						await this.$service.training.student.update(params);
					} else {
						await this.$service.training.student.add(params);
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
				let res = await this.$service.training.student.info({ id });
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
