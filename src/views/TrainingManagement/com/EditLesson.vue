<template>
    <div>
        <el-button size="mini" @click="show=true" type="text">
            <slot name="btnConent"></slot>
        </el-button>
        <el-dialog title="查看课节" :visible.sync="show" width="1000px" append-to-body>
            <div class="flex justify-between px-3">
                <span class="text-xl">课节列表</span>
                <div>
                    <!--<el-button
                        v-permission="{
                            or: [$service.training.lesson.permission.update]
                        }"  size="mini"
                        @click="showUpdateDialog"
                        >批量修改</el-button >-->
                    <el-button
                        v-permission="{
                            or: [$service.training.lesson.permission.add]
                        }"  size="mini"
                        @click="showAddDialog(null)"
                        >添加课节</el-button >
                </div>
            </div>
            <!--
            <div class="align-center px-3 py-3">
                <span>
                    课程名称
                </span>
                <el-select size="mini" v-model="tableFilter.classroomCourseId" value-key="classroomCourseId" @change="handleCourseSelect" placeholder="请选择">
                    <el-option
                    v-for="item in list"
                    :key="item.classroomCourseId"
                    :label="item.courseName"
                    :value="item.classroomCourseId"
                    no-data-text="无课程，请先添加">
                    </el-option>
                </el-select>
            </div>
            -->
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
                            or: [$service.training.lesson.permission.update]
                        }" 
                        type="text" size="mini"
                        @click="showAddDialog(scope.row)"
                        >修改</el-button >
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
            <el-form ref="addForm" class="text-left" :model="addForm" :rules="rules" label-width="160px">
                <el-form-item label="选择课程" prop="classroomCourseId" >
                     <el-select size="mini" v-model="addForm.classroomCourseId" value-key="classroomCourseId" @change="handleCourseChange" placeholder="请选择">
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
                    <el-button type="primary" @click="submitAppend(lessonId)" :loading="appendLoading">确定</el-button>
                </div>
            </el-form>
        </el-dialog>
        <!--<el-dialog title="批量修改"  append-to-body :visible.sync="updateDialog">
            <el-form ref="updateForm" class="text-left" :model="updateForm" :rules="updateRules" label-width="160px">
                <el-form-item label="原上课日期" prop="oldLessonDate">
                    <el-date-picker size="mini"
                        v-model="updateForm.oldLessonDate"
                        type="date"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="新上课日期" prop="newLessonDate">
                    <el-date-picker size="mini"
                        v-model="updateForm.newLessonDate"
                        type="date"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <div class="text-right pa-2">
                    <el-button type="primary" @click="submitUpdate()" >全部修改</el-button>
                </div>
            </el-form>
        </el-dialog>-->
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
        /*
        {
            label: '教练考勤',
            prop:'coachStatus',
            align: 'center'
        },
        */
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
        /*
        updateRules: {
            oldLessonDate:[{required: true, message: '请选择日期'}],
            newLessonDate:[{required: true, message: '请选择新日期'}]
        },
        */
        list:[],
        tableFilter: {
            classroomCourseId: ''
        }
        /*
        updateDialog: false,
        updateForm: {
            oldLessonDate: '',
            newLessonDate: ''
        }
        */
    }),
    watch:{
        show(val){
            if(!val){
                this.$emit('refresh')
            }
        }
    },
    mounted() {
        this.listCourse();
    },
    methods:{
        /*
        submitUpdate() {
            this.$refs['updateForm'].validate(async (valid) => {	
                if (valid) { 
                    let {oldLessonDate, newLessonDate} = this.updateForm;
                    let oldDate = moment(this.updateForm.oldLessonDate).format("YYYY-MM-DD");
                    let newDate = moment(this.updateForm.newLessonDate).format("YYYY-MM-DD");
                    let param={
                        oldLessonDate: oldDate,
                        newLessonDate: newDate
                    }; 
                    console.log("updateDateBatch")
                    console.log(param)
                    try{
                        await this.$service.training.lesson.updateDateBatch(param);
                        this.refresh()
                        this.appendLoading = false;
                        this.updateDialog = false;
                        this.$alert('修改成功', '提示', {
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
        */
        showUpdateDialog() {
            this.updateDialog = true;
        },
        handleCourseSelect() {
            let id = this.id;
            console.log("id=", id)
            this.$refs[`lesson-crud-${id}`].refresh({
                ...this.tableFilter,
				prop: 'createTime',
                order: 'desc',
                classroomId:id
                 
			});
        },
        handleCourseChange(){
            let course = this.list.find(el=>el.classroomCourseId === this.addForm.classroomCourseId);
            this.addForm.duration = course.courseDuration
        },
        isDisabledDate(time){
            let t = time.getTime();
            let min = new Date(this.range.start).getTime(),
                max = new Date(this.range.end).getTime();
            return t>max || ( t<min ||  t<(Date.now()-24*60*60*1000) )
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
        showAddDialog(row){
            console.log("row")
            console.log(row)
            //this.listCourse()
            this.addDialog = true
            this.lessonId = row.lessonId;
            
            if (row){
                let lessonTimeItems = row.lessonRange.split("-");
                let duration = moment("2000-01-01 "+lessonTimeItems[1]+":00").diff(moment("2000-01-01 "+lessonTimeItems[0]+":00"), 'minutes')
                
                this.addForm = {
                    classroomCourseId: String(row.classroomCourseId),
                    classStartTimeStr: row.lessonDate+" "+lessonTimeItems[0],
                    duration: duration
                }
            }
            
        },
        async listCourse(){
            if(this.list.length>0)return;
            const res = await this.$service.training.classroom.listCourse({
                classroomId:this.id
            })
            this.list = res;
        },
        async submitAppend(id){
            //console.log("lessonId")
            //console.log(this.lessonId)
            //console.log(id)
            this.$refs['addForm'].validate(async (valid) => {	
                if (valid) { 
                    
                    let start = moment(this.addForm.classStartTimeStr)
                    let param={
                        classroomCourseId:this.addForm.classroomCourseId,
                        classStartTimeStr:start.format('YYYY-MM-DD HH:mm'),
                        classEndTimeStr:start.add(this.addForm.duration,'minutes').format('YYYY-MM-DD HH:mm')
                    }; 
                    try{
                        if (!id) {
                            await this.$service.training.lesson.add(param);
                            this.refresh()
                            this.appendLoading = false;
                            this.addDialog=false
                            this.$alert('添加成功', '提示', {
                            confirmButtonText: '确定',
                            callback: (action) => {
                                
                                }
                            });
                        }
                        else {
                            param = {
                                ...param,
                                id
                            }
                            await this.$service.training.lesson.update(param);
                            this.refresh()
                            this.appendLoading = false;
                            this.addDialog=false
                            this.$alert('修改成功', '提示', {
                            confirmButtonText: '确定',
                            callback: (action) => {
                                
                                }
                            });
                        }
                        
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
<style lang="scss" scoped>
	.table-form {
	::v-deep .el-form-item {
		margin: 0 10px 0 0;
	}
    .align-center {
        display: flex;
        align-items: center;
        margin: 5px;
    }
}
</style>