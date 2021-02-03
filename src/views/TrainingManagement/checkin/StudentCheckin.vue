<template>
	<cl-crud @load="onLoad" ref="crud">
		<el-row type="flex" align="middle">
			<cl-search-key placeholder="请输入学员，教练姓名"></cl-search-key>
			<cl-flex1></cl-flex1>

		</el-row>
		<el-row type="flex" align="middle">
			<el-form class="flex">
			<el-form-item label="选择班级/球队" >
				<el-select   >
					<el-option
						v-for="item in []"
						:key="item.text"
						:label="item.text"
						:value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="选择课程" >
				<el-select   >
					<el-option
						v-for="item in []"
						:key="item.text"
						:label="item.text"
						:value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			</el-form>
		</el-row>
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
	name:"studentCheckin",
	data() {
		return {
			addDialogShow:false,
			addDialogTitle:"新增",
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
		 
		refresh() {
			this.$refs.crud.refresh({
				...this.tableFlters
			});
		},
		//编辑
		editDialog(id) {
			this.addDialogTitle = '编辑';
			this.addDialogShow = true;
			this.$nextTick(() => {
				this.$refs.editDialog.getEditInfo(id);
			});
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
			// ctx.service(this.$service.training.course).done();
			// app.refresh({
			// 	prop: 'createTime',
			// 	order: 'desc'
			// });
		}
	}
};
</script>