<template>
	<cl-crud @load="onLoad" ref="crud">
		<el-row type="flex" align="middle">
			<cl-search-key field="studentName" v-model="studentName" placeholder="请输入学员名称"></cl-search-key>
			<cl-flex1></cl-flex1>
			<BatchAdd class="mr-2" @freash="$refs['crud'].refresh()"/>
			<el-button
				v-permission="{
					or: [$service.training.student.permission.add]
				}"
				size="mini"
				type="primary"
				@click="addDialog()"
				>新增学员</el-button
			>
		</el-row>
		<el-row type="flex" align="middle">
			<span class="text-sm">班级/球队：</span>
			<el-select class="ml-2" size="mini" v-model="classOrTeamId" @change="refresh" clearable placeholder="请选择">
				<el-option
				v-for="item in classOrTeamList"
				:key="item.id"
				:label="item.name"
				:value="item.id">
				</el-option>
			</el-select>
			<span class="ml-5">筛选生日：</span>
			 	<el-date-picker
				 size="mini"
				v-model="birthdayFilter"
				type="daterange"
				value-format="yyyy-MM-dd"
				range-separator="至"
				start-placeholder="开始日期"
				end-placeholder="结束日期"
				clearable
				@change="refresh"
				>
				</el-date-picker>
			<cl-flex1></cl-flex1>
			<StudentExport :classOrTeamId="classOrTeamId" :studentName="studentName" :birthdayFilter="birthdayFilter"/>
		</el-row>

		<el-row>
			<cl-table :columns="tableColumn" :props="{ height: '70vh' }">
				<template #column-portrait="{ scope }">
					<cl-avatar shape="square" size="medium" :src="scope.row.portrait | default_avatar" :style="{ margin: 'auto' }"> </cl-avatar>
				</template>
				<template #column-op="{ scope }">
					<CheckinDialog :id="scope.row.id"/>
					<el-button
						v-permission="{
							or: [$service.training.student.permission.add]
						}"
						type="text" size="mini"
						@click="editDialog(scope.row.id)"
						>编辑</el-button
					>
					<el-button
						v-permission="{
							or: [$service.training.student.permission.add]
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
		<el-dialog :title="addDialogTitle" :visible.sync="addDialogShow" width="1000px" @close="addDialogClose">
			<add-dialog v-if="addDialogShow" ref="editDialog" :addDialogShow.sync="addDialogShow"></add-dialog>
		</el-dialog>
	</cl-crud>
</template>

<script>
import addDialog from './CreateDialog';
import { sexDict , footDict, positionDict, addressDict} from '@/dict'
const moment = require('moment');
export default {
	components: {
		addDialog,
		BatchAdd:()=>import('./BathchAdd'),
		StudentExport:()=>import('./StudentExport'),
		CheckinDialog:()=>import('./CheckinDialog')
	},
	data() {
		return {
			birthdayFilter:null,
			addDialogShow:false,
			addDialogTitle:'新增学员',
			studentName:"",
			classOrTeamId:"",
			classOrTeamList:[],
			tableColumn:[
				{
					label: '学员ID',
					prop:'id',
					align: 'center',
					width:100
				},
				{
					label: '头像',
					prop:'portrait',
					align: 'center'
				},
				{
					label: '姓名',
					prop:'name',
					align: 'center'
				},
				{
					label: '性别',
					prop:'sex',
					align: 'center',
					formatter({sex}) {	 
						return sexDict.find(el=>el.value==sex)?.text || '未设置' 
					}
				},
				{
					label: '出生日期',
					prop:'birthday',
					align: 'center',
					formatter({birthday}) {	 
						return birthday.slice(0,10);
					}
				},
				{
					label: '开始训练时间',
					prop:'trainDate',
					align: 'center',
					formatter({trainDate}) {	 
						return trainDate.slice(0,10);
					}
				},
				{
					label: '惯用脚',
					prop:'foot',
					align: 'center',
					formatter({foot}) {	 
						return footDict.find(el=>el.value==foot)?.text || '未设置' 
					},
					filters: footDict ,
					'filter-method': (value, row, column) => {
						return row[column['property']] === value;
					}
				},
				{
					label: '位置',
					prop:'position',
					align: 'center',
					formatter({position}) {	 
						return positionDict.find(el=>el.value==position)?.text || '未设置' 
					}
				},
				{
					label: '家长手机号',
					prop:'phoneNumArray',
					align: 'center',
					width:'100'
				},
				{
					label: '归属地',
					prop:'address',
					align: 'center',
					formatter({address}) {	 
						return addressDict.find(el=>el.value==address)?.text || '未设置' 
					}
				},
				{
					label: '操作',
					prop: 'op',
					align: 'center',
					fixed: 'right',
					width: 180
				}
			]
        }
	},
	mounted(){
		this.getClassOrTeam()
	},
	methods: {
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
			this.$confirm('是否确定删除学员？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async () => {
					try {
						await this.$service.training.student.delete({ ids });
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
		refresh() {
			const query = {};
			if(this.classOrTeamId){
				query.classOrTeamId = Number(this.classOrTeamId)
			}else{
				delete this.$refs.crud.params.classOrTeamId
			}
			if(this.birthdayFilter){
				query.birthdayStart=this.birthdayFilter[0] + ' 00:00';
				query.birthdayEnd=this.birthdayFilter[1] + ' 23:59'
			}else{
				delete this.$refs.crud.params.birthdayStart;
				delete this.$refs.crud.params.birthdayEnd
			}
			console.log(query)
			this.$refs.crud.refresh({...query});
        },
        addDialog() {
			this.addDialogTitle = '新增学员';
			this.addDialogShow = true;
        },
        addDialogClose() {
			this.$refs.editDialog.resetForm('ruleForm');
			this.$refs.editDialog.ruleForm = {};
			this.$refs['crud'].refresh();
		},
		onLoad({ ctx, app }) {
			ctx.service(this.$service.training.student).done();
			app.refresh({
				prop: 'createTime',
				order: 'desc'
			});
		},
		async getClassOrTeam(){
			const res = await this.$service.training.classroom.list();
			this.classOrTeamList = res.map(el=>({
				name:el.name,
				id:el.id
			}))
		}
	}
};
</script>
<style lang="scss">
	.table-form {
	::v-deep .el-form-item {
		margin: 0 10px 0 0;
	}
}
</style>