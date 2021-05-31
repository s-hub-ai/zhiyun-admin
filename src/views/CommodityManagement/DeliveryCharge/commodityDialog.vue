<template>
    
        <cl-crud @load="onLoad" ref="crud" >
            <el-row>
                <h3>已选：{{realSelection.length}}</h3>
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
                <cl-table ref="commodityTable" :columns="tableColumn" @selection-change="selectCommodity" :props="{
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
            }
        },
        data() {
            return {
                //allowedCommodityIdList: [],
                forbidenCommodityIdList: [],
                tableData: [],
                
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
                            /*
                            let commodityIdList =[];
                            if (this.commodityId) {
                                commodityIdList = this.commodityId.split(",")
                            }
                            console.log("commodityIdList11")
                            console.log(commodityIdList)
                            console.log(row.id.toString())
                            console.log(Number(row.commodityDiscountRate))
                            console.log(commodityIdList.indexOf(row.id.toString()))
                            console.log(Number(row.commodityDiscountRate))
                            if (commodityIdList.indexOf(row.id.toString())==-1 && row.commodityDiscountRate && Number(row.commodityDiscountRate)!=100) {
                                isChecked = false;
                            }
                            console.log(isChecked)
                            */
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
                
                selection: []
            }
        },
        
        methods:{ 
            searchCommodity() {
                this.$refs["crud"].refresh({...this.tableFilter});
            },
            selectedCommodityConfirm() {
                console.log("commodityTable")
                console.log(this.selection)
                /*
                let commodityIdList = this.realSelection.map(x=>{
                    return x.id;
                })
                */
                let commodityId = this.realSelection.join(",")
                this.$emit('refresh',{
                    index: this.index,
                    commodityId
                });
            },
            selectedCommodityClear() {
                let rows = this.tableData;
                for (let i in rows) {
                    console.log(rows[i])
                    
                    this.$refs["commodityTable"].toggleRowSelection(rows[i], false);
                    
                }
            },
            selectCommodity(val) {
                this.selection=val;
            },
            
            async onLoad({ctx, app}) {
                
                //ctx.service(this.$service.app.commodity.shopping).done();
                await ctx.service({
                    page:async (p)=>{
                        console.log("p")
                        console.log(p)
                        p.sort="createTime"
                        let r=await this.$service.app.commodity.shopping.page(p)
                        this.tableData = r.list;
                        let rows = this.tableData;
                        //console.log(this.tableData)
                        let commodityId = this.costInfoList[this.index].commodityId;
                        let commodityIdList =[];
                        if (commodityId) {
                            commodityIdList = commodityId.split(",")
                        }
                        console.log("commodityList")
                        console.log(this.index);
                        console.log(commodityId)
                        console.log(commodityIdList)
                        for (let i in rows) {
                            console.log(rows[i])
                            if (commodityIdList.indexOf(rows[i].id)!=-1) {
                                console.log(i)
                                this.$refs["commodityTable"].toggleRowSelection(rows[i], true);
                            }
                            else {
                                this.$refs["commodityTable"].toggleRowSelection(rows[i], false);
                            }
                        }
                        console.log("ssllecction")
                        console.log(this.selection)
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
                console.log("this.tableFilter")
                console.log(this.tableFilter)
                await app.refresh({...this.tableFilter});
                /*
                let rows = this.tableData;
                console.log(this.tableData)
                let commodityIdList =[];
                if (this.commodityId) {
                    commodityIdList = this.commodityId.split(",")
                }
                console.log(commodityIdList)
                for (let i in rows) {
                    console.log(rows[i])
                    if (commodityIdList.indexOf(rows[i].id)!=-1) {
                        console.log(i)
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