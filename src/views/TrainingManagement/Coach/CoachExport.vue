<template> 
    <el-button 
	v-permission="{
		or: [$service.training.coach.permission.export]
	}"
	:loading="loading" size="mini" @click="exportExcel" type="primary"> 导出教练</el-button> 
</template>
<script>
import XLSX from "xlsx"
import { sexDict , addressDict} from '@/dict'
export default {
	name: "coachExport",
	props:['searchName'],
    data: () => ({
        loading:false
    }),
    methods:{
        async exportExcel() {
			this.loading = true
			let query = {}
			if(this.searchName){
				query.keyWord = this.searchName
			}
			/* 从表生成工作簿对象 */
			//var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
			const res = await this.$service.training.coach.export(query)
		    const data = res.map(el => ({
				 '教练ID':el.id,
				 '姓名':el.name,
				 '等级':el.level,
				 '手机号':el.phoneNum
			}));
			var ws = XLSX.utils.json_to_sheet(data);
			/* 获取二进制字符串作为输出 */
			var wb = XLSX.utils.book_new(); /*新建book*/
			XLSX.utils.book_append_sheet(wb, ws, '教练信息'); /* 生成xlsx文件(book,sheet数据,sheet命名) */
            XLSX.writeFile(wb, '教练信息.xlsx'); /*写文件(book,xlsx文件名称)*/
            this.loading = false
		}
    }
}
</script>