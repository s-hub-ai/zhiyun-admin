<template>
	<cl-crud @load="onLoad" ref="crud">
		<el-row type="flex" align="middle">
			<el-select size="mini" v-model="searchField" >
				<el-option
				v-for="item in [
					{
						label: '学员姓名',
						value: 'studentName'
					},
					{
						label: '教练姓名',
						value: 'coachName'
					},
					{
						label: '班级',
						value: 'classroomName'
					}
				]"
				:key="item.value"
				:label="item.label"
				:value="item.value">
				</el-option>
			</el-select>
			<el-input clearable class="cl-search-key__input mx-2" size="mini" v-model="searchString" placeholder="请输入"></el-input>
			<el-button size="mini" type="primary" @click="search">搜索</el-button>
			<!-- <cl-search-key  :field="searchField" :placeholder="'请输入'"></cl-search-key> -->
			<cl-flex1></cl-flex1>
			<el-button
				v-permission="{
					or: [$service.training.lesson.permission.update]
				}"  size="mini"
				@click="showUpdateDialog"
				>批量修改</el-button >
			<el-button
				v-permission="{
					or: [$service.training.classroom.permission.add]
				}"
				size="mini"
				type="primary"
				@click="addDialog()"
				>新增班级</el-button
			>
		</el-row>

		<el-row>
			<cl-table :columns="tableColumn" :props="{ height: '70vh' }">
				<template #column-member="{ scope }">
					<AppendStudent :key="`AppendStudent${scope.row.id}`" 
					:id="scope.row.id" @refresh="refresh" :crrtList="scope.row.student"  :userList="studentList" 
					:loading="studentListLoading" />
				</template>
				<template #column-coach="{ scope }">
					<AppendCoach :key="`AppendCoach${scope.row.id}`" 
					:id="scope.row.id" @refresh="refresh" :crrtList="scope.row.coach" :userList="coachList" 
					:loading="coachListLoading"/>
				</template>
				<template #column-course="{ scope }">
					<EditCourse  :key="`EditCourse${scope.row.id}`" 
					:range="{start:scope.row.trainingStartTime,end:scope.row.trainingEndTime}" 
					:id="scope.row.id" @refresh="refresh" :crrtList="scope.row.course" :courseList="courseList" 
					:loading="courseListLoading"/>
				</template>
				<template #column-lessons="{ scope }">
					<EditLesson  :key="`EditLesson${scope.row.id}`" 
					:range="{start:scope.row.trainingStartTime,end:scope.row.trainingEndTime}" 
					:id="scope.row.id" @refresh="refresh" :crrtList="scope.row.lesson">
						<template slot="btnConent"> 
							<span>{{scope.row.lesson>0?scope.row.lesson:'暂无课程'}}</span>
						</template>						
					</EditLesson>
				</template>
				<template #column-trainingTime="{ scope }">
					<span>{{scope.row.trainingStartTime.slice(0,10)}}</span>~
					<span>{{scope.row.trainingEndTime.slice(0,10)}}</span>
				</template>

				 <!-- 操作 -->
				<template #column-op="{ scope }">
					<el-button 
						v-permission="{
							or: [$service.training.classroom.permission.update]
						}"
						type="text" size="mini"
						@click="editDialog(scope.row.id)"
						>编辑</el-button
					>
					<el-button
						v-permission="{
							or: [$service.training.classroom.permission.delete]
						}" 
						type="text" size="mini"
						@click="deleteFn(scope.row.id)"
						>删除</el-button
					>
				</template>
			</cl-table>
		</el-row>

		<el-row type="flex">
			<cl-flex1></cl-flex1>
			<cl-pagination></cl-pagination>
		</el-row>

		<!-- 新增编辑弹出框 -->
		<el-dialog title="新增班级" :visible.sync="addDialogShow" width="1000px" @close="addDialogClose">
			<add-dialog v-if="addDialogShow" ref="editDialog" :addDialogShow.sync="addDialogShow"></add-dialog>
		</el-dialog>
		<el-dialog title="批量修改"  append-to-body :visible.sync="updateDialog">
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
        </el-dialog>
	</cl-crud>
</template>

<script>
import addDialog from './CreateDialog';
const moment = require('moment');
moment.locale('zh-cn');
export default {
	components: {
		addDialog,
		AppendStudent:()=>import('../com/AppendStudent'),
		AppendCoach:()=>import('../com/AppendCoach'),
		EditCourse:()=>import('../com/EditCourse'),
		EditLesson:()=>import('../com/EditLesson')
	},
	data() {
		return {
			searchField:"classroomName",
			searchString:'',
			ruleForm:{},
            addDialogShow:false,
			studentListDialog:false,
            tableColumn: [
				{
					label: '班级ID',
					prop: 'id',
					align: 'center',
					width: 100
				},
				{
					label: '班级名称',
					prop: 'name',
					align: 'center',
					width: 125
				},
				{
					label: '训练时间',
					align: 'center',
					prop: 'trainingTime'
				},
				{
					label: '训练地点',
					align: 'center',
					prop: 'trainingPosition'
				},
				{
					label: '学员',
					prop: 'member',
					align: 'center',
					width: 105
				},
				{
					label: '教练',
					prop: 'coach',
					align: 'center',
					width: 140
				},
				{
					label: '课程',
					prop: 'course',
					align: 'center',
					width: 125
				},
				{
					label: '课节',
					prop: 'lessons',
					align: 'center',
					width: 125
				},
				{
					label: '操作',
					prop: 'op',
					align: 'center',
					fixed: 'right',
					width: 120
				}
			],
			studentList:[],
			coachList:[],
			courseList:[],
			studentListLoading:false,
			coachListLoading:false,
			courseListLoading:false,
			updateRules: {
				oldLessonDate:[{required: true, message: '请选择日期'}],
				newLessonDate:[{required: true, message: '请选择新日期'}]
			},
			updateDialog: false,
			updateForm: {
				oldLessonDate: '',
				newLessonDate: ''
			}
        }
	},
	mounted(){
		this.getStudentList();
		this.getCoachList();
		this.getCourseList()
	},
	methods: {
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
        showUpdateDialog() {
            this.updateDialog = true;
        },
		search(){
			delete this.$refs.crud.params.studentName;
			delete this.$refs.crud.params.coachName;
			delete this.$refs.crud.params.classroomName;
			this.$refs.crud.refresh({
				...(()=>{
					if(this.searchString){
						return {[this.searchField]:this.searchString}
					}
				})()
			});
		},
		refresh() {
			this.$refs.crud.refresh( );
		},
		//编辑
		editDialog(id) {
			this.addDialogTitle = '编辑';
			this.addDialogShow = true;
			this.$nextTick(() => {
				this.$refs.editDialog.getEditInfo(id);
			});
		},
		//删除
		deleteFn(ids) {
			this.$confirm('是否确定删除班级？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async () => {
					try {
						await this.$service.training.classroom.delete({ ids });
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.$refs['crud'].refresh();
					} catch (error) {
						this.$message.error(error);
					}
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
		},
		async getStudentList(){
			this.studentListLoading = true;
			const res = await this.$service.training.student.list()
			this.studentList = res.map(el=>({
				key:el.id,
				label:`${el.name}-${el.phoneNumArray}`,
				phoneNumArray:el.phoneNumArray
			}));
			this.studentListLoading = false
		},
		async getCoachList(){
			this.coachListLoading = true;
			const res = await this.$service.training.coach.list()
			this.coachList = res.map(el=>({
				key:el.id,
				label:`${el.name}-${el.phoneNum}`,
				disabled:false,
				phoneNum:el.phoneNum
			}));
			this.coachListLoading = false
		},
		async getCourseList(){
			this.courseListLoading = true;
			const res = await this.$service.training.course.list()
			this.courseList = res;
			this.courseListLoading = false
		},
        addDialog() {
			this.addDialogTitle = '新增';
			this.addDialogShow = true;
        },
        addDialogClose() {
			this.$refs.editDialog.resetForm('ruleForm');
			this.$refs.editDialog.ruleForm = {};
			this.$refs['crud'].refresh();
		},
		onLoad({ ctx, app }) {
			ctx.service(this.$service.training.classroom).done();
			app.refresh({
				prop: 'id',
				order: 'desc',
				type:0
			});
		}
	}
};
</script>