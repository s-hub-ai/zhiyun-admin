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
import { sexDict , addressDict, footDict, positionDict } from '@/dict'
export default {
    name: "batchAdd",
    data: () => ({
		files:null
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
						if (workbookSheets.hasOwnProperty('Sheet1')) { 
							let xlsxData = XLSX.utils.sheet_to_json(workbookSheets['Sheet1']);
							// 结果数组
							console.log(xlsxData);
							excleList = [...excleList,...xlsxData.map(el=>{
								let phoneNumArray = String( el['家长手机号码']);
								if(/[^\d|\,]/.test(phoneNumArray)){
									throw '手机号格式不正确'
								}
								let data = {
									name:el['姓名'],
									sex: sexDict.find( e=>e.text==el['性别'] )?.value,
									height:el['身高'],
									weight:el['体重'],
									birthday:el['出生日期'],
									trainDate:el['开始训练时间'],
									phoneNumArray:phoneNumArray,
									address: addressDict.find( e=>e.text==el['归属地'] )?.value,
									school: el['学籍'],
									identityCardNumber:el['身份证号'],
									// 非必填
									foot: footDict.find( e => e.text==el['惯用脚'] )?.value,
									position: positionDict.find(  e=> e.text==el['位置'] )?.value,
								}
								const requiredKeys = ['name','sex','height','weight','birthday','trainDate','phoneNumArray','address','school','identityCardNumber']
								for(let k of requiredKeys){
									if(data[k] === undefined || data[k] === ''){
										throw '表格数据有缺少，请检查'
									}
								}
								for(let k of ['foot','position']){
									if(data[k] === undefined){
										data[k] = -1
									}
								}
								return data
							})] 
						}else{
							throw '表格格式不正确，请检查'
						}
						console.log(excleList)
						await this.$service.training.student.addBatch({
							excleList
						});
						this.$emit('freash')
					}catch(err){
						console.log(err);
						let msg = '';
						if(typeof err == 'string'){
							msg = err
						}else{
							msg = '导入失败，请检查表格格式'
						}
						this.$alert(msg, {
							confirmButtonText: '确定',
							callback: (action) => {
								}						
						})
					}
					this.$refs.input.value="";
				};
				reader.readAsBinaryString(files[i]);
			}

			
		}
    }
}
</script>