<template>
	<div>
		 <el-tabs v-model="tab" >
			<el-tab-pane label="教练考勤" name="coach"></el-tab-pane>
			<el-tab-pane label="学生考勤" name="student"></el-tab-pane>
		</el-tabs>
		<CoachCheckin :list="{classOrTeamList,courseList}" v-if="tab=='coach'"/>
		<StudentCheckin :list="{classOrTeamList,courseList}" v-if="tab=='student'"/>
	</div>
</template>

<script>
export default {
	name:"checkinIndex",
	components:{
		CoachCheckin:()=>import('./CoachCheckin'),
		StudentCheckin:()=>import('./StudentCheckin'),
	},
	data() {
		return {
			tab:"coach",
			classOrTeamList:[],
			courseList:[]
        }
	},
	mounted(){
		this.getClassOrTeam();
		this.getCourseList()
	},
	methods: {
		 async getClassOrTeam(){
			const res = await this.$service.training.classroom.list();
			this.classOrTeamList = res;
		},
		async getCourseList(){
			const res = await this.$service.training.course.list();
			this.courseList = res
		},
	}
};
</script>