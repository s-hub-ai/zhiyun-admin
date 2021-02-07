<template>
	<cl-crud @load="onLoad" ref="crud">
		<el-row type="flex" align="middle">
			<cl-search-key field="coachName" placeholder="请输入教练姓名"></cl-search-key>
			<cl-flex1></cl-flex1>
		</el-row>  
		<div class="text-sm flex p-2">
			<div class="mr-2"><span >班级/球队：</span>
				<el-select size="mini" clearable v-model="searchQuery.classroomId" @change="refresh">
					<el-option 
						v-for="item in list.classOrTeamList"
						:key="'class' + item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select> 
			</div>
			<div ><span>课程：</span>
				<el-select size="mini" clearable v-model="searchQuery.courseId" @change="refresh">
					<el-option
						v-for="item in list.courseList"
						:key="'course' + item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select> 
			</div>
		</div>					

		<el-row>
			<cl-table :columns="tableColumn" :props="{ height: 'calc(100vh - 300px)' }">
				<template #column-status="{ scope }">
					<el-tooltip v-if="!scope.row.clockinTime" class="item" effect="dark" 
					:content="'原因：' +( scope.row.absenceReason || '暂无')" placement="top-start"> 
						<span class="text-red-500" >缺勤</span>
					</el-tooltip>					
					<span v-else>出勤</span>
				</template>						 
			</cl-table>
		</el-row>

		<el-row type="flex">
			<cl-flex1></cl-flex1>
			<cl-pagination></cl-pagination>
		</el-row>
	</cl-crud>
</template>

<script>
const moment = require('moment');
export default {
	name:'coachCheckin',
	props:['list'],
	data() {
		return {
			searchQuery:{
				classroomId:'',
				courseId:''
			},
			tableColumn:[
				
				{
					label: '班级名称',
					prop:'className',
					align: 'center'
				},
				{
					label: '课程名称',
					prop:'courseName',
					align: 'center'
				},
				{
					label: '上课日期',
					prop: 'lessonStartTime',
					align: 'center', 
					formatter({lessonStartTime}) {	 
						return lessonStartTime.slice(0,10);
					}
				},
				{
					label: '课程时段',
					prop:'lessonRange',
					align: 'center'
				},
				{
					label: '教练姓名',
					prop: 'coachName',
					align: 'center' 
				},
				{
					label: '考勤状态',
					prop: 'status',
					align: 'center'
				},
				{
					label: '打卡时间',
					prop: 'clockinTime',
					align: 'center', 
					width: 120,
					formatter({clockinTime}){
						if(clockinTime){
							return moment(clockinTime).format("HH:mm")
						}else{
							return "-"
						}							
					}
				}
			]
        }
	},

	methods: {
		refresh(){
			
			this.$refs.crud.refresh({
				...this.searchQuery
			})
		},
		onLoad({ ctx, app }) {
			ctx.service(this.$service.training.coachAttendanceCheck).done();
			app.refresh({
				prop: 'createTime',
				order: 'desc',
				...this.searchQuery
			});
		}
	}
};
</script>