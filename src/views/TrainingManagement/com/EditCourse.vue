<template>
    <div>
        <el-button v-if="crrtList.length==0" size="mini" type="text" @click="show=true">添加课程</el-button>
        <el-button v-else size="mini" @click="show=true" type="text">{{crrtList.length}}</el-button>
        <el-dialog title="选择课程" :visible.sync="show" width="1000px" >
            <div class="flex justify-between p-2">
                <span class="font-bold text-xl">课程列表</span>
                <el-button @click="appendDialog=true" size="mini" 
                v-permission="{
                        or: [$service.training.classroom.permission.addCourse]
                }" >添加课程</el-button>
                    
            </div> 
            <el-dialog v-if="show"  width="560px" title="添加课程" :visible.sync="appendDialog" append-to-body>
                <el-form :model="appendForm" :rules="rules" ref="appendForm" class="text-left" label-width="120px">
                    <el-form-item label="选择课程" prop="courseId" >
                        <el-select value-key="id" size="mini" v-model="appendForm.courseId" placeholder="请选择课程">
                            <el-option 
                                v-for="item in courseList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                                >
                            </el-option>
                        </el-select>
                    </el-form-item> 
                    <el-form-item label="每周上课频率" prop="courseDate"  >
                        <el-select size="mini" v-model="appendForm.courseDate" multiple placeholder="请选择上课周期">
                            <el-option
                            v-for="item in weekDict"
                            :key="item.value"
                            :label="item.text"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="开始日期" prop="courseExpirationStartDateStr"  >
                        <el-date-picker size="mini"
                            v-model="appendForm.courseExpirationStartDateStr"
                            value-format="yyyy-MM-dd"
                            type="date"
                            :picker-options="{disabledDate:isDisabledDate}"
                            placeholder="选择开始日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束日期" prop="courseExpirationEndDateStr"  >
                        <el-date-picker size="mini"
                            v-model="appendForm.courseExpirationEndDateStr"
                            value-format="yyyy-MM-dd"
                            type="date"
                            :picker-options="{disabledDate:isDisabledDate}"
                            placeholder="选择课程结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="上课时间" prop="classStartTimeStr"  >
                        <el-time-picker size="mini"
                                value-format="HH:mm"
                            v-model="appendForm.classStartTimeStr"
                            placeholder="选择上课时间">
                        </el-time-picker>
                        
                    </el-form-item>
                    <el-form-item label="下课时间" prop="classStartTimeStr"  >
                            <span>下课时间将为：</span>
                            <span>{{classEndTimeStr == 'Invalid date'?'':classEndTimeStr}}</span>
                    </el-form-item>
                    <div class="my-2 text-right">
                        <el-button type="primary" @click="submitAppend" :loading="appendLoading">确定</el-button>
                    </div>
                </el-form>
            </el-dialog>
            <el-table
                :data="tableList"
                border
                style="width: 100%">
                <el-table-column
                    prop="courseName"
                    label="课程名称" >
                    </el-table-column>
                <el-table-column
                    prop="courseDate"
                    label="上课频率" >
                    <template slot-scope="scope">
                         <span>{{weekMap(scope.row.courseDate)}}</span>
                    </template>
                </el-table-column>

                <el-table-column 
                    label="上课时间">
                    <template slot-scope="scope">
                         <span>{{scope.row.classStartTimeStr}}~{{scope.row.classEndTimeStr}}</span>
                    </template>0
                </el-table-column>

                <el-table-column
                    label="开课日期">
                    <template slot-scope="scope">
                         <span>{{scope.row.courseExpirationStartDateStr}}~{{scope.row.courseExpirationEndDateStr}}</span>
                    </template>0
                </el-table-column>

                <el-table-column 
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button 
                        v-permission="{
                            or: [$service.training.classroom.permission.updateCourse]
                        }" @click="editCourse(scope.row)" type="text" size="small">修改</el-button>
                        <el-button 
                         v-permission="{
                            or: [$service.training.classroom.permission.deleteCourse]
                        }" @click="deleteCourse(scope.row.classroomCourseId)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table> 
        </el-dialog>
    </div>
</template>
<script>
import  {weekDict} from '@/dict'
const moment = require('moment');
export default {
    name:"EditCourse",
    props:['courseList','id','crrtList','range'],
    watch:{
        show(val){
            if(val){
                this.listCourse()
            }else{
                this.$emit('refresh')
            }
        },
        appendDialog(val){
            if(!val){
                Object.assign(this.appendForm,{
                    courseId:"",
                    classroomId:this.id,
                    courseDate:"",
                    courseExpirationStartDateStr:"",
                    courseExpirationEndDateStr:"",
                    classStartTimeStr:"",
                    classEndTimeStr:""
                })
            }
        }
    },
    data:(vm)=>({
        show:false,
        tableList:[],
        appendDialog:false,
        appendForm:{
            courseId:"",
            classroomId:vm.id,
            courseDate:"",
            courseExpirationStartDateStr:"",
            courseExpirationEndDateStr:"",
            classStartTimeStr:"",
            classEndTimeStr:""
        },
        rules:{
            courseId:[{required: true, message: '请填写'}],
            courseDate:[{required: true, message: '请填写'}],
            courseExpirationStartDateStr:[{required: true, message: '请填写'}],
            courseExpirationEndDateStr:[{required: true, message: '请填写'}],
            classStartTimeStr:[{required: true, message: '请填写'}]
        },
        appendLoading:false,
        ...{ weekDict }
    }),
    computed:{
        classEndTimeStr(){
            let duration = this.courseList.find(el=>el.id == this.appendForm.courseId)?.duration
            return moment(this.appendForm.classStartTimeStr,'HH:mm').
            add(duration||0, 'minutes').format('HH:mm')
        }
    },
    methods:{
        isDisabledDate(time){
            let t = time.getTime();
            let min = new Date(this.range.start).getTime(),
                max = new Date(this.range.end).getTime();
            //return t>max || ( t<min ||  t<(Date.now()-24*60*60*1000) )
            return t>max || t<min
        },
        async submitAppend(){
            this.$refs['appendForm'].validate(async (valid) => {	
                if (valid) {
                    this.appendLoading = true;	 
					let params = {
						...this.appendForm
					};
                    params.courseDate = this.appendForm.courseDate.join(',');
                    params.classEndTimeStr = this.classEndTimeStr;
                    params.courseExpirationStartDateStr = this.appendForm.courseExpirationStartDateStr + ' 00:00'
                    params.courseExpirationEndDateStr = this.appendForm.courseExpirationEndDateStr + ' 23:59'
                    try{
                        if(params.classroomCourseId){
                            await this.$service.training.classroom.updateCourse(params);
                        }else{
                            await this.$service.training.classroom.addCourse(params);
                        }
                        this.listCourse()
                        this.appendLoading = false;
                        this.appendDialog = false;
                        this.$emit('refresh')
                        this.$alert('成功', '提示', {
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
        editCourse(row){
            Object.assign(this.appendForm,row);
            this.appendForm.courseDate = row.courseDate.split(',')
            this.appendForm.courseId =String(row.courseId)
            this.appendDialog=true
        },
        async deleteCourse(id){
            await this.$service.training.classroom.deleteCourse({
                classroomId:this.id,
                classroomCourseId:id
            })
            this.listCourse()
        },
        async listCourse(){
            const res = await this.$service.training.classroom.listCourse({
                classroomId:this.id
            })
            this.tableList = res;
        },
        weekMap(str){
            return str.split(',').map(
                v=>weekDict.find(el=>el.value==v)?.text || ''
            ).join(',')
        }
    }
}
</script>
<style lang="scss" scoped>

</style>