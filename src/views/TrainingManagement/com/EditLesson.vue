<template>
    <div>
        <el-button size="mini" @click="show=true" type="text">
            <slot name="btnConent"></slot>
        </el-button>
        <el-dialog title="查看课节" :visible.sync="show" width="1000px" append-to-body>
            <div class="flex justify-between px-3">
                <span class="text-xl">课节列表</span>
                <el-button
                v-permission="{
                    or: [$service.training.lesson.permission.add]
                }"  size="mini"
                @click="showAddDialog"
                >添加课节</el-button >
            </div>
            <cl-crud v-if="show" @load="onLoad" :ref="`lesson-crud-${id}`" :key="`lesson-crud-${id}`">
                <cl-table :columns="tableColumn" :props="{ height: '50vh' }">
                    <template #column-date="{ scope }">
                        <span>{{dateWithWeek(scope.row.lessonDate)}}</span>
                    </template>
                    <template #column-coachStatus="{ scope }">
                        <AbsenceDetail :lessonId="scope.row.lessonId" :status="scope.row.coachStatus" type="coach"/>
                    </template>
                    <template #column-studentStatus="{ scope }">
                        <AbsenceDetail :lessonId="scope.row.lessonId" :status="scope.row.studentStatus" type="student"/>
                    </template>
                    <template #column-op="{ scope }">
                        <el-button
                        v-permission="{
                            or: [$service.training.lesson.permission.delete]
                        }" 
                        type="text" size="mini"
                        @click="deleteFn(scope.row.lessonId)"
                        >删除</el-button >
                    </template>
                </cl-table>
                <el-row type="flex">
                    <cl-flex1></cl-flex1>
                    <cl-pagination></cl-pagination>
                </el-row>
            </cl-crud>

        </el-dialog> 
        <el-dialog title="编辑课节" append-to-body :visible.sync="addDialog">
            <el-form ref="editForm" class="text-left" :model="addForm" :rules="rules" label-width="160px">
                <el-form-item label="选择课程" prop="classroomCourseId" >
                     <el-select size="mini" v-model="addForm.classroomCourseId" @change="handleCourseChange" placeholder="请选择">
                        <el-option
                        v-for="item in list"
                        :key="item.classroomCourseId"
                        :label="item.courseName"
                        :value="item.classroomCourseId"
                        no-data-text="无课程，请先添加">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上课时间"  prop="classStartTimeStr" >
                    <el-date-picker size="mini"
                        v-model="addForm.classStartTimeStr"
                        type="datetime"
                        :picker-options="{disabledDate:isDisabledDate}"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item> 
                <el-form-item label="课程时长（分钟）" prop="duration">
                    <el-input style="width:10em" type="number" size="mini" v-model="addForm.duration"></el-input>
                </el-form-item>
                <div class="text-right pa-2">
                    <el-button type="primary" @click="submitAppend()" :loading="appendLoading">确定</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import  { weekDict } from '@/dict'
const moment = require('moment');
moment.locale('zh-cn');
export default {
    name:"EditLesson",
    props:['id','crrtList','range'],
    components:{
        AbsenceDetail:()=>import('./AbsenceDetail')
    },
    data:(vm)=>({
        show:false,
        tableColumn:[
        {
            label: '上课日期',
            prop:'date',
            align: 'center'
        },
        {
            label: '课程名称',
            prop:'courseName',
            align: 'center', 
            width:200
        },
        {
            label: '课程时间段',
            prop:'lessonRange',
            align: 'center'
        },
        {
            label: '教练考勤',
            prop:'coachStatus',
            align: 'center'
        },
        {
            label: '学员考勤',
            prop:'studentStatus',
            align: 'center'
        },
        {
            label: '操作',
            prop: 'op',
            align: 'center',
            fixed: 'right',
            width: 120
        }
        ],
        addDialog:false,
        appendLoading:false,
        addForm:{
            classroomCourseId:'',
            classStartTimeStr:'',
            duration:0
        },
        rules: {
            classroomCourseId:[{required: true, message: '选择'}],
            classStartTimeStr:[{required: true, message: '选择'}],
            duration:[{required: true, message: '请填写'},{ validator:(rule, value, callback)=>{
                if(value<=0){
                    callback(new Error('请填写不为0的正整数'))
                }else{
                    callback()
                }
            }}]
        },
        list:[]

    }),
    methods:{
        handleCourseChange(){
            let course = this.list.find(el=>el.classroomCourseId === this.addForm.classroomCourseId);
            this.addForm.duration = course.courseDuration
        },
        isDisabledDate(time){
            let t = time.getTime();
            let min = new Date(this.range.start).getTime(),
                max = new Date(this.range.end).getTime();
            return t>max || t<min
        },
        dateWithWeek(d){
            return moment(d).format('YYYY-MM-DD(dddd)')
        },
        onLoad({ ctx, app }) {
            ctx.service(this.$service.training.lesson).done();
            app.refresh({
				prop: 'createTime',
                order: 'desc',
                classroomId:this.id
			});
        },
        refresh(){
            this.$refs[`lesson-crud-${this.id}`].refresh({
                classroomId:this.id
            });
        },
        showAddDialog(){
            this.listCourse()
            this.addDialog = true
        },
        async listCourse(){
            if(this.list.length>0)return;
            const res = await this.$service.training.classroom.listCourse({
                classroomId:this.id
            })
            this.list = res;
        },
          async submitAppend(){
            this.$refs['editForm'].validate(async (valid) => {	
                if (valid) { 
                    let start = moment(this.addForm.classStartTimeStr)
                    let param={
                        classroomCourseId:this.addForm.classroomCourseId,
                        classStartTimeStr:start.format('YYYY-MM-DD HH:mm'),
                        classEndTimeStr:start.add(this.addForm.duration,'minutes').format('YYYY-MM-DD HH:mm')
                    }; 
                    try{
                        await this.$service.training.lesson.add(param);
                        this.refresh()
                        this.appendLoading = false;
                        this.addDialog=false
                        this.$alert('添加成功', '提示', {
                            confirmButtonText: '确定',
                            callback: (action) => {
                                
                                }
                        });
                    }catch(err){
                        this.appendLoading = false;
                        this.$message.error(err)
                    }
				}
			});
        },
        deleteFn(id){
            this.$confirm('是否确定删除课节？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async () => {
                try {
                    await this.$service.training.lesson.delete({ id });
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.refresh()
                } catch (error) {
                    this.$message.error(error);
                }
            })
        }
    }
}
</script>
<style lang="scss">
	.table-form {
	::v-deep .el-form-item {
		margin: 0 10px 0 0;
	}
}
</style>