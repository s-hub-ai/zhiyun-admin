<template>
    <div>
        <el-button v-if="crrtList.length==0" size="mini" type="text" @click="open">添加学员</el-button>
        <el-button v-else size="mini" @click="open" type="text">{{crrtList.length}}</el-button>
        <el-dialog title="编辑学员" :visible.sync="show" width="1000px" >
            <div class="text-right my-2">
                <el-button 
                v-permission="{
                    or: [$service.training.classroom.permission.addStudent]
                }"
            size="mini" @click="$refs.input.click()" type="primary"> 导入</el-button>
            <input v-show="false"  ref="input" type="file" @change="importXlsx($event)" />
            </div>
            <el-form class="text-left">
                <el-transfer v-loading="loading" filterable filter-placeholder="请输入用户手机号" :titles="['学生列表', '已选学生']" 
                    v-model="list" :data="userList">
                    <span slot-scope="{ option }">{{ option.label}}</span>
                </el-transfer>
                <div class="py-2 text-center">
                    <el-button type="primary"
                    v-permission="{
                        or: [$service.training.classroom.permission.addStudent]
                    }"
                     @click="confirm()">确定</el-button>
                    <el-button @click="show=false">取消</el-button>
                </div>
            </el-form>
            
        </el-dialog>
    </div>
</template>
<script>
import XLSX from "xlsx"
export default {
    name:"AppendStudent",
    props:['crrtList','userList','loading','id'],
    data:()=>({
        show:false,
        list:[]
    }),
    methods:{
        open(){
            this.list = this.crrtList.map(el=>el.id);
            this.show = true;
        },
        async confirm(){
            await this.$service.training.classroom.addStudent({
                classroomId:this.id,
                studentIds:this.list.join(',')
            });

            this.$message.success('修改成功')
            this.show = false
            this.$emit('refresh')
        },
        importXlsx(e) {
			let _this = this;
			console.log(e);
			let files = e.target.files;
			for (let i = 0; i < files.length; i++) {
				let reader = new FileReader();
				let name = files[i].name;
				reader.onload = (e)=> {
					let data = e.target.result;
					let workbook = XLSX.read(data, {
						type: typeof FileReader !== 'undefined' && (FileReader.prototype || {}).readAsBinaryString ? 'binary' : 'array'
					});
					let workbookSheets = workbook.Sheets;
                    let phoneMap = {};
					for (let sheet in workbookSheets) {
						if (workbookSheets.hasOwnProperty(sheet)) {
							//	fromTo = workbookSheets[sheet]['!ref'];
							let xlsxData = XLSX.utils.sheet_to_json(workbookSheets[sheet]);
							
							xlsxData.map((value) => {
                                let phone = String(value['手机号码'] || value['手机号'] || value['手机'])
								phone = phone.replace(/\s+/g, '');
								phoneMap[phone] = true
							}); 
                            
						}
					}  
                    let hasMiss = false
                    this.list = this.userList.filter(el=>{
                        let arr = el.phoneNumArray.split(',');
                        for(let p of arr){
                            if(phoneMap[p])return true
                        };
                        hasMiss = true;
                        return false
                    }).map(el=>el.key) 

                    if(hasMiss){
                        this.$alert('有手机号未录入至系统中，未能导入全部数据', {
							confirmButtonText: '确定',
							callback: (action) => {
							}						
						})
                    }

                    this.$refs.input.value = ''
				};
				reader.readAsBinaryString(files[i]);
			}
		}    

    }
}
</script>
<style lang="scss" scoped>
    ::v-deep .el-transfer{
        display: flex;
    }
    ::v-deep .el-transfer-panel{
        flex-grow: 1 !important;
    }
    ::v-deep .el-transfer__buttons{
            align-self: center;
    }
</style>