<template> 
        <el-button 
            v-permission="{
				or: [$service.training.coach.permission.detail]
			}"
             :loading="loading"
            type="text" size="mini" @click="open">考核
         <el-dialog title="教练考核" :visible.sync="show" width="700px" append-to-body>
            <div class="flex py-2 justify-between">
                <span class="text-xl">考勤详情</span>
                <el-select  size="mini" v-model="detailQuery.year" @change="getDetail">
                    <el-option
                        v-for="item in years"
                        :key="item"
                        :label="item"
                        :value="item">
                    </el-option>
                </el-select>
            </div>
            <el-table :data="[detail]" border style="width: 100%">
                <el-table-column
                    prop="absence"
                    label="出勤次数" >
                </el-table-column>
                <el-table-column
                    prop="attendance"
                    label="缺勤次数" >
                </el-table-column>
                <el-table-column
                    prop="attendanceRate"
                    label="出勤率" >
                </el-table-column>
            </el-table>
        </el-dialog>     
            
        </el-button>
       
</template>
<script> 
const years = ()=>{
    let year=new Date().getFullYear();
    return Array(year-2020).fill(0).map((_,i)=>2021+i)
}
export default {
    name:"CheckinDialog",
    props:['id'],
    data:(vm)=>({
        show:false,
        loading:false,
        detail:{},
        detailQuery:{
            studentId:vm.id,
            year:new Date().getFullYear(),
        },
        years:years()
    }),
    methods:{
        async open(){
            this.loading=true;
            try{
                await this.getDetail()

            }catch(err){
                this.$message.error(err)
            }
            this.show = true;
            this.loading = false
        },
        async getDetail(){
            const res = await this.$service.training.coach.detail(this.detailQuery)
            this.detail = res;
        }
    }
}
</script>
<style lang="scss" scoped>

</style>