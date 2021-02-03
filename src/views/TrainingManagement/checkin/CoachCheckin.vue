<template>
	<cl-crud @load="onLoad" ref="crud">
		<el-row type="flex" align="middle">
			<cl-search-key placeholder="请输入教练姓名"></cl-search-key>
			<cl-flex1></cl-flex1>

		</el-row>  
		<div class="text-sm flex p-2">
			<div class="mr-2"><span >班级/球队：</span>
				<el-select size="mini" >
					<el-option
						v-for="item in list.classOrTeamList"
						:key="item.name"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select> 
			</div>
			<div ><span>课程：</span>
				<el-select size="mini">
					<el-option
						v-for="item in list.courseList"
						:key="item.name"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select> 
			</div>
		</div>					

		<el-row>
			<cl-table :columns="tableColumn" :props="{ height: '70vh' }">
			 
				 
			</cl-table>
		</el-row>

		<el-row type="flex">
			<cl-flex1></cl-flex1>
			<cl-pagination></cl-pagination>
		</el-row>
	</cl-crud>
</template>

<script>
export default {
	name:'coachCheckin',
	props:['list'],
	data() {
		return {
			tableColumn:[
				{
					label: '上课日期',
					prop: 'id',
					align: 'center',
					width:100
				},
				{
					label: '课程名称',
					prop:'name',
					align: 'center',
				},
				{
					label: '课程时段',
					prop:'duration',
					align: 'center',
					
				},
				{
					label: '教练考勤',
					prop: 'op',
					align: 'center',
					fixed: 'right',
					width: 120
				},
				{
					label: '打卡时间',
					prop: 'op',
					align: 'center',
					fixed: 'right',
					width: 120
				},
			]
        }
	},

	methods: {
		onLoad({ ctx, app }) {
			ctx.service(this.$service.training.coachAttendanceCheck).done();
			app.refresh({
				prop: 'createTime',
				order: 'desc'
			});
		}
	}
};
</script>