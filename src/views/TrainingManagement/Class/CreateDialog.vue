<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
		<el-form-item label="班级名称" prop="name">
			<el-input v-model="ruleForm.name"></el-input>
		</el-form-item>
		<el-form-item label="训练时间"  prop="trainingStartTime">
			<el-date-picker
				v-model="ruleForm.trainingStartTime"
				type="date"
				placeholder="起始时间">
			</el-date-picker>
			~
			<el-date-picker
				v-model="ruleForm.trainingEndTime"
				type="date"
				placeholder="结束时间">
			</el-date-picker>
		</el-form-item>
		<el-form-item label="训练地点" prop="trainingPosition">
			<el-input v-model="ruleForm.trainingPosition"></el-input>
		</el-form-item>
		<el-form-item label="打卡位置" >
			<Map v-bind:radius="ruleForm.checkRadius"  @setlngAndLat="setlngAndLat" 
			
			 :addressName="ruleForm.trainingPosition" />
			<div class="flex">
				<el-form-item label="经度" label-width="90px" required>
					<el-input readonly v-model="ruleForm.checkLongitude"></el-input>
				</el-form-item>
				<el-form-item label="纬度" required label-width="90px">
					<el-input readonly v-model="ruleForm.checkLatitude"></el-input>
				</el-form-item>
				<el-form-item label="半径" prop="radius" label-width="90px">
					<el-input-number v-model="ruleForm.checkRadius" :min="0"></el-input-number>
				</el-form-item>	
			</div>		 
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')">{{ruleForm.id?'修改':'新增'}}</el-button>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		</el-form-item>
	</el-form>
</template>


<script>

export default {
	components:{
		Map:()=>import('../com/map')
	},
	data(vm) {
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
				checkRadius:"300",
				subType:"",
				type:0

            },
            rules: {
				name:[{required: true, message: '请填写'}],
				trainingStartTime:[{required: true, message: '请填写'},{validator(rule, value, callback){
					if(!vm.ruleForm.trainingEndTime){
						callback(new Error('请选择结束时间'))
					}else{
						callback()
					}
				}}],
				trainingPosition:[{required: true, message: '请填写'}], 
				checkRadius:[{required: true, message: '请填写'}] 
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
				let res = await this.$service.training.classroom.info({ id });
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
