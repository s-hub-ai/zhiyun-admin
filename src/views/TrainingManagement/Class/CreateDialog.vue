<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
		<el-form-item label="班级名称" prop="name">
			<el-input v-model="ruleForm.name"></el-input>
		</el-form-item>
		<el-form-item label="训练时间"  >
			 <el-time-select
				placeholder="起始时间"
				v-model="trainingStartTime"
				:picker-options="{
				start: '08:30',
				end: '18:30'
				}">
			</el-time-select>
			<el-time-select
				placeholder="结束时间"
				v-model="trainingEndTime"
				:picker-options="{
				start: '08:30',
				end: '18:30',
				minTime: startTime
				}">
			</el-time-select>
		</el-form-item>
		<el-form-item label="训练地点" prop="trainingPosition">
			<el-input v-model="ruleForm.trainingPosition"></el-input>
		</el-form-item>
		<el-form-item label="打卡位置" >
			<Map v-bind:radius="ruleForm.checkRadius"  @setlngAndLat="setlngAndLat"/>			 
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		</el-form-item>
	</el-form>
</template>


<script>

export default {
	components:{
		Map:()=>import('./map')
	},
	data() {
		return {
			startTime:null,
			endTime:null,
            ruleForm: {
				name:"",
				trainingStartTime:"",
				trainingEndTime:"",
				trainingPosition:"",
				trainingPhotoArray:"",
				checkLongitude:"",
				checkLatitude:"",
				checkRadius:"",
				subType:"",
				type:"",

            },
            rules: {

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
						await this.$service.training.classroom.update(params);
					} else {
						await this.$service.training.classroom.add(params);
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
		//设置经纬度
		setlngAndLat(d) {
			this.ruleForm.addressName = d.addressName;
			this.ruleForm.checkLongitude = d.lng;
			this.ruleForm.checkLatitude = d.lat;
		},
		resetForm(formName) {
			console.log('重置表单');
			this.$refs[formName].resetFields();
		}
	}
};
</script>

<style lang="scss" scoped>
.demo-ruleForm {
	height: 100%;
}
</style>
