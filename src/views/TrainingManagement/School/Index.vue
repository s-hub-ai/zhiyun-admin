<template>
	<div>
        <el-row type="flex" align="middle" justify="end">
			
			<el-col :span="2" type="flex" align="middle" justify="end">
                <div class="button-wrap">
                    <el-button
                        v-permission="{
                            and: [$service.training.student.permission.add]
                        }"
                        size="mini"
                        type="primary"
                        
                        @click="addProvinceDialog()"
                        >新增省份</el-button
                    >
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-dialog :visible.sync="provinceVisible" title="编辑省份" width="900px">
			    <ProvinceAdd class="mr-2" @freash="closeProvinceDialog" :id="provinceId" :provinceValue="provinceValue"/>
            </el-dialog>
            <el-dialog :visible.sync="cityVisible" title="编辑城市" width="900px">
                <CityAdd class="mr-2" @freash="closeCityDialog()" :id="cityId"  :provinceId="rowProvinceId" :cityValue="cityValue"/>
            </el-dialog>
            <el-dialog :visible.sync="countyVisible" title="编辑区县" width="900px">
                <CountyAdd class="mr-2" @freash="closeCountyDialog" :id="countyId"  :cityId="rowCityId" :countyValue="countyValue"/>
            </el-dialog>
            <el-dialog :visible.sync="townVisible" title="编辑乡镇" width="900px">
                <TownAdd class="mr-2" @freash="closeTownDialog" :id="townId" :countyId="rowCountyId" :townValue="townValue"/>
            </el-dialog>
            <el-dialog :visible.sync="schoolVisible" title="编辑学校" width="900px">
                <SchoolAdd class="mr-2" @freash="closeSchoolDialog" :id="schoolId" :townId="rowTownId" :schoolValue="schoolValue"/>
			</el-dialog>
            <el-table size="mini" border :data="tableData" max-height="500px">
                <el-table-column 
                    align="center"
                    prop="type"
                    label="类型" />
                <el-table-column 
                    align="center"
                    prop="value"
                    label="名称" />
                <el-table-column 
                    align="center"
                    prop="value"
                    label="操作" >
                    <template #default="scope">
                        <el-button v-if="scope.row.type!='school'"
                            size="mini"
                            @click="addChildDialog(scope.$index, scope.row)">添加子元素</el-button>
                        <el-button
                            size="mini"
                            @click="addUpdateDialog(scope.$index, scope.row)">修改</el-button>
                        <el-button
                            size="mini"
                            @click="deleteDialog(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

		</el-row>
    </div>
</template>
<script>
import ProvinceAdd from "./ProvinceAdd";
import CityAdd from "./CityAdd";
import CountyAdd from "./CountyAdd";
import TownAdd from "./TownAdd";
import SchoolAdd from "./SchoolAdd";
export default({
    components: {
		ProvinceAdd,
        CityAdd,
        CountyAdd,
        TownAdd,
        SchoolAdd
    },
    data: () => ({
		form: {},
        rules: {
            value:[{required: true, message: '必填'}]
        },
        provinceVisible: false,
        cityVisible: false,
        countyVisible: false,
        townVisible: false,
        schoolVisible: false,
        provinceId: null,
        cityId: null,
        countyId: null,
        townId: null,
        schoolId: null,
        rowProvinceId: null,
        rowCityId: null,
        rowCountyId: null,
        rowTownId: null,
        provinceValue: '',
        cityValue: '',
        countyValue: '',
        townValue: '',
        schoolValue: '',
        tableData: []
	}),

    async mounted(){
        this.tableData = await this.$service.training.student.listSchool();
    },
    methods: {

        async closeProvinceDialog(){
            this.provinceVisible = false;
            this.tableData = await this.$service.training.student.listSchool();
            //this.$refs['crud'].refresh()
        },
        async closeCityDialog(){
            this.cityVisible = false;
            this.tableData = await this.$service.training.student.listSchool();
            //this.$refs['crud'].refresh()
        },
        async closeCountyDialog(){
            this.countyVisible = false;
            this.tableData = await this.$service.training.student.listSchool();
            //this.$refs['crud'].refresh()
        },
        async closeTownDialog(){
            this.townVisible = false;
            this.tableData = await this.$service.training.student.listSchool();
            //this.$refs['crud'].refresh()
        },
        async closeSchoolDialog(){
            this.schoolVisible = false;
            this.tableData = await this.$service.training.student.listSchool();
            //this.$refs['crud'].refresh()
        },
        addProvinceDialog() {
            this.provinceVisible = true;
        },
        addChildDialog(index, row) {
            switch(row.type) {
                case "province": {
                    rowProvinceId = row.id;
                    cityVisible = true;
                    break;
                }
                case "city": {
                    rowCityId = row.id;
                    countyVisible = true;
                    break;
                }
                case "county": {
                    rowCountyId = row.id;
                    townVisible = true;
                    break;
                }
                case "town": {
                    rowTownId = row.id;
                    schoolVisible = true;
                    break;
                }
                
            }
        },
        updateDialog(index, row) {
            switch(row.type) {
                case "province": {
                    provinceId = row.id;
                    provinceValue = row.value;
                    provinceVisible = true;
                    break;
                }
                case "city": {
                    cityId = row.id;
                    rowProvinceId = row.provinceId;
                    cityValue = row.value;
                    cityVisible = true;
                    break;
                }
                case "county": {
                    countyId = row.id;
                    rowCityId = row.cityId;
                    countyValue = row.value;
                    countyVisible = true;
                    break;
                }
                case "town": {
                    townId = row.id;
                    rowCountyId = row.countyId;
                    townValue = row.value;
                    townVisible = true;
                    break;
                }
                case "school": {
                    schoolId = row.id;
                    rowTownId = row.townId;
                    schoolValue = row.value;
                    schoolVisible = true;
                    break;
                }
            }
        }
    }
})
    
</script>
<style scoped>
.button-wrap{
    padding-top: 10px;
    padding-bottom: 10px;
    display:flex;
    justify-content:flex-end;
    align-items:center;
}
</style>