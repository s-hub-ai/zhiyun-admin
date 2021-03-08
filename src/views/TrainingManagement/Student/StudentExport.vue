<template>
    <div>
        <el-button 
			v-permission="{
				or: [$service.training.student.permission.export]
			}"
		:loading="loading" size="mini" @click="exportExcel" type="primary"> 导出学员</el-button>
    </div>
</template>
<script>
import XLSX from "xlsx"
import { sexDict , footDict, positionDict, addressDict} from '@/dict'
export default {
	name: "studentExport",
	props:['classOrTeamId','studentName','birthdayFilter'],
    data: () => ({
        loading:false
    }),
    methods:{
        async exportExcel() {
            this.loading = true
			/* 从表生成工作簿对象 */
			//var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
			let query = {}
			if(this.classOrTeamId){
				query.classOrTeamId = this.classOrTeamId
			}
			if(this.studentName){
				query.studentName = this.studentName

			}
			if(this.birthdayFilter){
				query.birthdayStart=this.birthdayFilter[0] + ' 00:00';
				query.birthdayEnd=this.birthdayFilter[1] + ' 23:59'
			}
			const res = await this.$service.training.student.export(query)
		    const data = res.map(el => ({
				 '姓名':el.name,
				 '性别':sexDict.find( e=>e.value==el['sex'] )?.text || '未设置',
				 '身高':el.height,
				 '体重':el.weight,
				 '出生日期':el.birthday?.slice(0,10)||'',
				 '开始训练时间':el.trainDate?.slice(0,10)||'',
				 '惯用脚':footDict.find( e=>e.value==el['foot'])?.text || '未设置',
				 '位置':positionDict.find( e=>e.value==el['position'])?.text || '未设置',
				 '家长手机号码':el.phoneNumArray,
				 '归属地':addressDict.find( e=>e.value==el['address'])?.text || '未设置',
				 '学籍':el.school,
				 '身份证号':el.identityCardNumber
			}));
			var ws = XLSX.utils.json_to_sheet(data);
			/* 获取二进制字符串作为输出 */
			var wb = XLSX.utils.book_new(); /*新建book*/
			XLSX.utils.book_append_sheet(wb, ws, '学员信息'); /* 生成xlsx文件(book,sheet数据,sheet命名) */
            XLSX.writeFile(wb, '学员信息.xlsx'); /*写文件(book,xlsx文件名称)*/
            this.loading = false
		}
    }
}
</script>