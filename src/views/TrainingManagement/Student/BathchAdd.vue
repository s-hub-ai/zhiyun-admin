<template>
    <div>
        <el-button 
			v-permission="{
				or: [$service.training.student.permission.addBatch]
			}"
		size="mini" @click="$refs.input.click()" type="primary"> 批量新增学员</el-button>
        <input v-show="false"  ref="input" type="file" @change="importXlsx($event)" />
    </div>
</template>
<script>
import XLSX from "xlsx"
import { sexDict , addressDict} from '@/dict'
export default {
    name: "batchAdd",
    data: () => ({
		files:null,
	}),
    methods:{
        importXlsx(e) {
			let files = e.target.files;
			for (let i = 0; i < files.length; i++) {
				let reader = new FileReader();
				let name = files[i].name;
				reader.onload = async res=>{
					try{
						let data = res.target.result;
						let workbook = XLSX.read(data, {
							type: typeof FileReader !== 'undefined' && (FileReader.prototype || {}).readAsBinaryString ? 'binary' : 'array'
						});
						let workbookSheets = workbook.Sheets;
						let excleList = []
						for (let sheet in workbookSheets) {
							if (workbookSheets.hasOwnProperty(sheet)) {
								//	fromTo = workbookSheets[sheet]['!ref'];
								let xlsxData = XLSX.utils.sheet_to_json(workbookSheets[sheet]);
								// 结果数组
								console.log(sheet);
								console.log(xlsxData);
								excleList = [...excleList,...xlsxData.map(el=>{
									return {
										name:el['姓名'],
										sex: sexDict.find( e=>e.text==el['性别'] ).value,
										height:el['身高'],
										weight:el['体重'],
										birthday:el['出生日期'],
										trainDate:el['开始训练时间'],
										phoneNumArray:el['家长手机号码'],
										address: addressDict.find( e=>e.text==el['归属地'],).value,
										school: el['学籍'],
										identityCardNumber:el['身份证号'],
									}
								})]
							}
						}
						console.log(excleList)
						await this.$service.training.student.addBatch({
							excleList
						});
						this.$emit('freash')
					}catch(err){
						console.log(err)
						this.$refs.input.value="";
						this.$alert('导入失败，请检查表格格式', '提示', {
							confirmButtonText: '确定',
							callback: (action) => {
							}						
						})
					}
				};
				reader.readAsBinaryString(files[i]);
			}

			
		},
    }
}
</script>