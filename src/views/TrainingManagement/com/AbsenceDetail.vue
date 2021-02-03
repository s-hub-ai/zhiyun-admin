<template>
    <div>
        <el-popover
            v-if="showTooltip"
            placement="top-start"
            title="考勤详细"
            width="200"
            trigger="hover"
            @show="getDetail"
            effect="dark"
            :open-delay="200"
            >
            <div v-loading="loading">
                <div v-if="type=='coach'">
                    <div v-for="item in list" :key="item.coachName">
                        <span>{{item.coachName}}</span>
                        : <span>{{item.absenceReason}}</span>
                    </div>
                </div>
                <div v-if="type=='student'">
                    <div v-for="item in list" :key="item.coachName">
                        <span>{{item.studentName}}</span>
                        : <span>{{item.absenceReason}}</span>
                    </div>
                </div>
            </div>
            <el-button slot="reference" size="mini" type="text">{{statusText}}</el-button>
        </el-popover>
        <span v-else>{{statusText}}</span>
    </div>
</template>
<script>
export default {
    name:"AbsenceDetail",
    props:['lessonId','type','status'],
    data:()=>({
        list:[],
        loading:false,
    }),
    computed:{
        showTooltip(){
            if(this.type=='coach' && this.status==0){
                return true
            }else if(this.type=='student' && !!this.status){
                return true
            }else{
                return false
            }
        },
        statusText(){
            if(this.type=='student'){
                return this.status
            }else if(this.type=='coach'){
                if(this.status ==1){
                    return '出勤'
                }else if(this.status == 0){
                    return '缺勤'
                }else{
                    return "-"
                }
            }else{
                return ''
            }
        }
    },
    methods:{
        async getDetail(){
            this.loading=true;
            if(this.type=='coach'){
                await this.coachDetail()  
            }else if(this.type =='student'){
                await this.studentDetail();
            }
            this.loading=false
        },
        async studentDetail(){
            const res = await this.$service.training.lesson.studentAbsenceReason({
                lessonId:this.lessonId
            });
            this.list =res;
        },
        async coachDetail(){
            const res = await this.$service.training.lesson.coachAbsenceReason({
                lessonId:this.lessonId
            });
            this.list=res;
        },

    }

}
</script>
<style lang="scss" scoped>

</style>