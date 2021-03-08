<template>
    <div>
        <el-button v-if="crrtList.length==0" size="mini" type="text" @click="open">添加教练</el-button>
        <el-button v-else size="mini" @click="open" type="text">{{crrtList.length}}</el-button>
        <el-dialog title="添加教练" :visible.sync="show" width="1000px" >
            <el-form class="text-left">
                <el-transfer v-loading="loading" filterable filter-placeholder="请输入用户手机号" :titles="['教练列表', '已选教练']" 
                    v-model="list" :data="userList">
                    <span slot-scope="{ option }">{{ option.label}}</span>
                </el-transfer>
                <div class="py-2 text-center">
                    <el-button type="primary" 
                    v-permission="{
                        or: [$service.training.classroom.permission.addCoach]
                    }"
                     @click="confirm()">确定</el-button>
                    <el-button @click="show=false">取消</el-button>
                </div>
            </el-form>
            
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:"AppendCoach",
    props:['crrtList','userList','loading','id'],
    data:()=>({
        show:false,
        list:[]
    }),
    methods:{
        open(){
            this.list = this.crrtList.map(el=>el.id);
            this.show = true;
        },
        async confirm(){
            await this.$service.training.classroom.addCoach({ 
                classroomId:this.id,
                coachIds:this.list.join(',')
            });

            this.$message.success('修改成功')
            this.show = false
            this.$emit('refresh')
        }
    }
}
</script>
<style lang="scss" scoped>
    ::v-deep .el-transfer{
        display: flex;
    }
    ::v-deep .el-transfer-panel{
        flex-grow: 1 !important;
    }
    ::v-deep .el-transfer__buttons{
            align-self: center;
    }
</style>