<template>
    <div>
        <el-form :inline="true" :model="form" ref="form" size="mini" class="demo-form-inline" :rules="rules">
            <el-row>
                <el-form-item label="输入省份" prop="value">
                    <el-input  v-model="form.value">
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
    name: "ProvinceAdd",
    props: ["id","provinceValue"],
    data(){
        return {
            form: {
                value:this.provinceValue
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
                        this.$service.app.province.update({
                            id: this.id,
                            province: this.form.value
                        })
                    }
                    else {
                        this.$service.app.province.add({
                            province: this.form.value
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