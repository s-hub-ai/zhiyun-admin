<template>    
    <el-popover
        placement="top-start"
            title="所属班级"
            width="200"
            trigger="hover"
            effect="dark"
            :open-delay="200"
        >
        <div>
            <div v-if="classroom && classroom.length==0">暂无</div>
            <div class="mb-1" :key="item.id" v-for="item in classroom || []">
                {{item.name}}
            </div>
        </div>      
        <el-button slot="reference" size="mini" @click="show=true" type="text">
            <span>{{classroom && classroom.length}}</span>
            <el-dialog title="加入课程" :visible.sync="show" width="600px" append-to-body>
                <div v-if="show">
                    <div>
                        <div>已加入的班级/球队：</div>
                        <div class="flex my-1">
                            <div v-if="classroom && classroom.length==0">暂无</div>
                            <div class="mr-2" :key="item.id" v-for="item in classroom || []">
                                {{item.name}}
                            </div>
                        </div>
                    </div>
                    <div class="my-3">
                        <span>请选择要加入班级：</span>
                        <el-select multiple size="mini" v-model="selectedId"  placeholder="请选择">
                            <el-option
                            v-for="item in filteredClass"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id" >
                            </el-option>
                        </el-select>
                    </div>
                    <div>
                        <el-button :disabled="selectedId.length==0" :loading="loading" size="mini" @click="addClassroom" type="primary">
                            确定加入
                        </el-button>
                    </div>
                </div>
            </el-dialog>
        </el-button>
    </el-popover> 
</template>
<script>
export default {
    props:['classroom','id','list'],
    name:"JoinClass",
    data:()=>({
        show:false,
        selectedId:[],
        loading:false
    }),
    computed:{
        filteredClass(){
            return (this.list || []).filter(el=>{
                return !(this.classroom || []).find(e=>e.id==el.id)
            })
        }
    },
    methods:{
        async addClassroom(){
            this.loading = true;
            try{
                const res = await this.$service.training.student.addClassrooms({
                    studentId:this.id,
                    classroomIds:this.selectedId.join(',')
                })
                this.$message.success('加入成功')
                this.$emit('refresh')
                this.selectedId = [];
                this.show = false
            }catch(err){
                console.log(err)
                this.$message.error(err)
            }
            this.loading = false
        }
    }
}
</script>
<style lang="scss" scoped>

</style>