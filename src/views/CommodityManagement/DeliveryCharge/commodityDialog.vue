<template>
    
        <cl-crud @load="onLoad" ref="crud" >
            <el-row>
                <h3>已选：{{selectIds.length}}</h3>
            </el-row>
            <el-row>
                <el-form label-width="100px" :inline="true">
                    <el-row type="flex"  align="middle">
                        <el-form-item class="my-0">
                            <el-input placeholder="请输入商品名称" v-model="tableFilter.name" size="mini">
                            </el-input>
                        </el-form-item>
                        <el-form-item class="my-0">
                            <el-button @click="searchCommodity" size="mini">
                                搜索
                            </el-button>
                        </el-form-item>
                    </el-row>
                </el-form>
            </el-row>
            <el-row>
                <cl-table ref="commodityTable" :columns="tableColumn" 
                @selection-change="selectCommodity"
                @select="selectOne"
                @select-all="selectAll"
                :props="{
                    'row-key': (row)=>{
                        return row.id;
                    },
                    height: '60vh'
                }"/>
            </el-row>
		    <el-row type="flex">
                <cl-flex1></cl-flex1>
                <cl-pagination></cl-pagination>
            </el-row>
            <br />
            <el-row type="flex" justify="begin" align="middle">
                <el-button @click="selectedCommodityConfirm" type="primary" size="mini">确定</el-button>
                <el-button @click="selectedCommodityClear" size="mini">全不选</el-button>
            </el-row>
            
        </cl-crud>
	
</template>
<script>
    export default {
        props: ["index", "costInfoList"],
        computed: {
            realSelection() {
                let commodityIdList = this.selection.map(x=>{
                    return x.id;
                })
                let selectionSet = new Set(commodityIdList)
                return [...selectionSet]
            },
            
        },
        beforeMount(){
            let ids = this.costInfoList[this.index].commodityId;
            if(ids){
                this.selectIds = ids.split(',')
            }else{
                this.selectIds = []
            }
        },
        data() {
            return {
                //allowedCommodityIdList: [],
                forbidenCommodityIdList: [],
                tableData: [],
                selection: [],
                selectIds:"",
                tableFilter: {
                    name: ''
                    
                },
                
                tableColumn: [
                    {
                        type: 'selection',
                        width: '55',
                        "reserve-selection":true,
                        'selectable': (row, index)=>{
                            let isChecked = true;
                            isChecked = (this.forbidenCommodityIdList.indexOf(row.id)==-1)
                            return isChecked;
                        }
                    },
                    {
                        type: 'index',
                        align: 'center',
                        label: '编号'
                    },
                    {
                        label: '商品封面',
                        align: 'commodityCover',
                        prop: 'commodityCover',
                        formatter: (row)=> {
                            return (<el-image style="width: 100px; height: 100px" src={row.commodityCover}> </el-image>)
                        }
                    },
                    {
                        label: '商品名称',
                        align: 'commodityName',
                        prop: 'commodityName'
                    },
                    {
                        label: '应用折扣',
                        align: 'commodityDiscountRate',
                        prop: 'commodityDiscountRate',
                        formatter: (row)=> {
                            if (row.commodityDiscountRate==null 
                                || row.commodityDiscountRate=="" 
                                || row.commodityDiscountRate==100 
                                || row.commodityDiscountRate=='100') {
                                return "暂无"
                            }
                            else {
                                return row.commodityDiscountRate+"%"
                            }
                        }
                    }
                ],
                
                
            }
        },
        
        methods:{ 
            searchCommodity() {
                this.$refs["crud"].refresh({...this.tableFilter});
            },
            selectedCommodityConfirm() {
                /*
                let commodityIdList = this.realSelection.map(x=>{
                    return x.id;
                })
                */
                // let commodityId = this.realSelection.join(",")
                this.$emit('refresh',{
                    index: this.index,
                    commodityId:this.selectIds.join(',')
                });
            },
            selectedCommodityClear() {
                let {data} = this.$refs["commodityTable"];
                for(let row of data){
                    this.$refs["commodityTable"].toggleRowSelection(row, false);
                }
                // let rows = this.tableData;
                // for (let i in rows) {
                    
                //     this.$refs["commodityTable"].toggleRowSelection(rows[i], false);
                    
                // };
                this.selectIds = []

            },
            selectCommodity(val) {
                this.selection=val;
            },
            selectOne(val,row){
                console.log(row)
                let flag = val.includes(row)
                let id = row.id;
                if(flag){
                    if(this.selectIds.includes(id))return;
                    this.selectIds.push(id)
                }else{
                    let _idx = this.selectIds.indexOf(id);
                    if(_idx>=0){
                        this.selectIds.splice(_idx,1)
                    }
                }
            },
            selectAll(val){
                let _crrt = val.filter(el=>this.tableData.includes(el));
                if(_crrt.length==0){
                    for(let row of this.tableData){
                        let idx = this.selectIds.indexOf(row.id);
                        if(idx>=0){
                            this.selectIds.splice(idx,1)
                        }
                    }
                }else{
                    for(let row of _crrt){
                         if(!this.selectIds.includes(row.id)){
                             this.selectIds.push(row.id)
                         }
                    }
                }
            },
            async onLoad({ctx, app}) {
                
                //ctx.service(this.$service.app.commodity.shopping).done();
                await ctx.service({
                    page:async (p)=>{
                        p.sort="createTime"
                        let r=await this.$service.app.commodity.shopping.page(p)
                        this.tableData = r.list;
                        let rows = this.tableData;
                        let commodityIdList = this.selectIds
                        // let commodityId = this.costInfoList[this.index].commodityId;
                        // let commodityIdList =[];
                        // if (commodityId) {
                        //     commodityIdList = commodityId.split(",")
                        // }
                        setTimeout(()=>{
                            for (let i in rows) {
                                if (commodityIdList.indexOf(rows[i].id)>=0) {
                                    this.$refs["commodityTable"].toggleRowSelection(rows[i], true);
                                }else {
                                    this.$refs["commodityTable"].toggleRowSelection(rows[i], false);
                                }
                            }                            
                        },0)

                        let costInfoDict = {};
                        for (let i in this.costInfoList){
                            let costInfo = this.costInfoList[i];
                            let cIdStr = costInfo.commodityId;
                            let cIdList = cIdStr.split(",")
                            for (let j in cIdList) {
                                let cId = cIdList[j]
                                costInfoDict[cId]=costInfo;
                            }
                        }
                        this.forbidenCommodityIdList = []
                        for (let i in this.costInfoList) {
                            
                            if (i!=this.index) {
                                let costInfo = this.costInfoList[i];
                                let cIdStr = costInfo.commodityId;
                                let cIdList = cIdStr.split(",")
                                this.forbidenCommodityIdList.push(...cIdList);
                            }
                        }
                        for (let i in rows) {
                            if (rows[i].id in costInfoDict){
                                rows[i].commodityDiscountRate = costInfoDict[rows[i].id].rate;
                            }
                            else{
                                rows[i].commodityDiscountRate = null;
                            }
                        }
                        r.list = rows;
                        return r;
                    }
                }).done()
                await app.refresh({...this.tableFilter});
                /*
                let rows = this.tableData;
                let commodityIdList =[];
                if (this.commodityId) {
                    commodityIdList = this.commodityId.split(",")
                }
                for (let i in rows) {
                    if (commodityIdList.indexOf(rows[i].id)!=-1) {
                        this.$refs["commodityTable"].toggleRowSelection(rows[i], true);
                    }
                    else {
                        this.$refs["commodityTable"].toggleRowSelection(rows[i], false);
                    }
                }
                */
            }
        }
        
    }
</script>