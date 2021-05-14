<template>
    <div>
        <el-form :inline="true" :model="form" ref="form" size="mini" class="demo-form-inline" :rules="rules">
            <el-row>
                <el-form-item label="输入城市" prop="value">
                    <el-input v-model="form.value">
                    </el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-button type="primary" @click="submit('form')">确定</el-button>
            </el-row>
        </el-form>
    </div>
</template>
<script>
export default {
    name: "CityAdd",
    props: ["id","provinceId","cityValue"],
    data(){
        return {
            form: {
                value:this.cityValue
            },
            rules: {
                value:[{required: true, message: '必填'}]
            }
        }
		
	},
    methods: {
        submit(formName) {
            this.$refs[formName].validate(async (valid) => {
				if (valid) {
                    if (this.id) {
                        this.$service.app.city.update({
                            id: this.id,
                            provinceId: this.provinceId,
                            city: this.form.value
                        })
                    }
                    else {
                        this.$service.app.city.add({
                            provinceId: this.provinceId,
                            city: this.form.value
                        })
                    }
                    this.$emit('freash')
                }
                else{
                    console.log('error submit!!');
					return false;
                }
            })
        }
    }
}
</script>