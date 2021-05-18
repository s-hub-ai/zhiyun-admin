<template>
    <cl-crud @load="onLoad" ref="crud">
        
        <el-dialog :visible.sync="schoolInfoDialogVisible" title="编辑学籍" width="900px">
            <el-form :inline="true" :model="form" ref="form" size="mini" class="demo-form-inline" :rules="rules">
                <el-row>
                    <el-form-item label="输入省份" prop="province">
                        <el-input  v-model="form.province">
                        </el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="输入市" prop="city">
                        <el-input  v-model="form.city">
                        </el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="输入区县" prop="county">
                        <el-input  v-model="form.county">
                        </el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="输入乡镇" prop="town">
                        <el-input  v-model="form.town">
                        </el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="输入学校" prop="school">
                        <el-input  v-model="form.school">
                        </el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-button type="primary" @click="submit('form')">确定</el-button>
                </el-row>
            </el-form>
        </el-dialog>
        <el-row  type="flex" align="middle">
            
                <el-col :span="21">
                <el-form :inline="true" >
                    <el-form-item
                        label="省
                    "
                    class="my-0 py-0"
                    >
                        <el-select style="width: 120px" size="mini" v-model="tableFilters.provinceId" placeholder="请选择" @change="selectProvince">
                            <el-option v-for="(item, index) in provinceDict" :key="index" :label="item.text" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        label="市
                    "
                    class="my-0 py-0"
                    >
                        <el-select style="width: 120px" size="mini" v-model="tableFilters.cityId" placeholder="请选择" @change="selectCity">
                            <el-option v-for="(item, index) in cityDict" :key="index" :label="item.text" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        label="区县
                    "
                    class="my-0 py-0"
                    >
                        <el-select style="width: 120px" size="mini" v-model="tableFilters.countyId" placeholder="请选择" @change="selectCounty">
                            <el-option v-for="(item, index) in countyDict" :key="index" :label="item.text" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        label="乡镇
                    "
                    class="my-0 py-0"
                    >
                        <el-select style="width: 120px" size="mini" v-model="tableFilters.townId" placeholder="请选择" @change="selectTown">
                            <el-option v-for="(item, index) in townDict" :key="index" :label="item.text" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="3" >
                    <el-row type="flex" justify="end">
                    <el-button size="mini" type="primary" @click="addSchool">添加学籍参数</el-button>
                    </el-row>
                </el-col>
            
            
        </el-row>
        <cl-table :columns="tableColumn"> </cl-table>
    </cl-crud>
</template>
<script>
export default {
    data() {
        return {
            form: {
                province: '',
                city: '',
                county: '',
                town: '',
                school: ''
            },
            tableColumn: [
				
				{
					label: '省',
					align: 'province',
					prop: 'province',
					width: 140
				},
                {
					label: '市',
					align: 'city',
					prop: 'city',
					width: 140
				},
                {
					label: '区县',
					align: 'county',
					prop: 'county',
					width: 140
				},
                {
					label: '乡镇',
					align: 'town',
					prop: 'town',
					width: 140
				},
                {
					label: '学校',
					align: 'school',
					prop: 'school',
					width: 140
				},
				{
					label: "操作",
					align: "center",
					formatter: (row) => {
						return (
							<div>
								<el-button type="text" onClick={() => this.editSchool(row)} style="margin-right:20rpx">
									编辑
								</el-button>
								<el-button type="text" onClick={() => this.deleteSchool(row)}>
									删除
								</el-button>
							</div>
						);
					}
                }
			],
            tableFilters: {},
            schoolInfoDialogVisible: false,
            
            
            provinceDict:[],
            cityDict:[],
            countyDict:[],
            townDict:[],
            
        }
    },
    async mounted(){
        let _provinces = await this.$service.training.schoolInfo.listProvince();
        this.provinceDict = this.translateProvince(_provinces);
    },
    methods: {
        addSchool() {
            this.schoolInfoDialogVisible=true;
        },
        editSchool(row) {
            
            this.form.province = row.province;
            this.form.city = row.city;
            this.form.county = row.county;
            this.form.town = row.town;
            this.form.school = row.school;
            this.form.id = row.id;
            this.schoolInfoDialogVisible=true;
        },
        async deleteSchool(row) {
            if (confirm("确定删除吗")) {
                await this.$service.training.schoolInfo.delete({
                    id: row.id
                })
                this.$refs['crud'].refresh({ ...this.tableFilters });
            }
        },
        async selectProvince() {
            let _citys = await this.$service.training.schoolInfo.listCity({provinceId: this.tableFilters.provinceId});
            this.cityDict = this.translateCity(_citys);
            //this.tableFilters.provinceId = this.selectedProvinceId;
            this.$refs['crud'].refresh({ ...this.tableFilters });
        },
        async selectCity() {
            let _countys = await this.$service.training.schoolInfo.listCounty({cityId: this.tableFilters.cityId});
            this.countyDict = this.translateCounty(_countys);
            //this.tableFilters.cityId = this.selectedCityId;
            this.$refs['crud'].refresh({ ...this.tableFilters });
        },
        async selectCounty() {
            let _towns = await this.$service.training.schoolInfo.listTown({countyId: this.tableFilters.countyId});
            this.townDict = this.translateTown(_towns);
            //this.tableFilters.countyId = this.selectedCountyId;
            this.$refs['crud'].refresh({ ...this.tableFilters });
        },
        async selectTown() {
            //this.tableFilters.townId = this.selectedTownId;
            this.$refs['crud'].refresh({ ...this.tableFilters });
        },
        translateProvince(l) {
            return l.map(x=>{
                return {
                    value: x.id,
                    text: x.province
                }
            })
        },
        translateCity(l) {
            return l.map(x=>{
                return {
                    value: x.id,
                    text: x.city
                }
            })
        },
        translateCounty(l) {
            return l.map(x=>{
                return {
                    value: x.id,
                    text: x.county
                }
            })
        },
        translateTown(l) {
            return l.map(x=>{
                return {
                    value: x.id,
                    text: x.town
                }
            })
        },
        translateSchool(l) {
            return l.map(x=>{
                return {
                    value: x.id,
                    text: x.school
                }
            })
        },
        async submit(formName) {
            this.$refs[formName].validate(async (valid) => {
				if (valid) {
                    if (this.form.id) {
                        await this.$service.training.schoolInfo.update({
                            id: this.form.id,
                            province: this.form.province,
                            city: this.form.city,
                            county: this.form.county,
                            town: this.form.town,
                            school: this.form.school
                        })
                    }
                    else {
                        await this.$service.training.schoolInfo.add({
                            province: this.form.province,
                            city: this.form.city,
                            county: this.form.county,
                            town: this.form.town,
                            school: this.form.school
                        })
                    }
                    this.schoolInfoDialogVisible=false;
                    this.$refs['crud'].refresh({ ...this.tableFilters })
                }
                else{
                    console.log('error submit!!');
					return false;
                }
            })
        },

        onLoad({ ctx, app }) {
			ctx.service(this.$service.training.schoolInfo).done();
			app.refresh({
				...this.tableFilters
			});
		}
    }
}
</script>
<style>
.my-0{
    margin:0;
    padding:0;
}

</style>