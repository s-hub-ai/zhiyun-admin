<template>
    <div>
        <el-form :inline="true" :model="form" ref="form" size="mini" class="demo-form-inline" :rules="rules">
            <el-row>
                <el-form-item label="输入乡镇" prop="value">
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
    name: "TownAdd",
    props: ["id","countyId","townValue"],
    data(){
        return{
            form: {
                value:this.townValue
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
                        this.$service.training.town.update({
                            id: this.id,
                            countyId: this.countyId,
                            town: this.form.value
                        })
                    }
                    else {
                        this.$service.training.town.add({
                            countyId: this.countyId,
                            town: this.form.value
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