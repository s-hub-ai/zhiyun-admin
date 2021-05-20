<template>
    
        <cl-crud @load="onLoad" ref="crud">
            <el-row>
                <h3>已选：{{selection.length}}</h3>
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
        props: ["index", "discountId"],
        data() {
            return {
                tableFilter: {
                    name: ''
                },
                
                tableColumn: [
                    {
                        type: 'selection',
                        width: '55',
                        "reserve-selection":true
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
                            if (row.commodityDiscountRate==null || row.commodityDiscountRate=="" || row.commodityDiscountRate==0) {
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
                let commodityIdList = this.$refs["commodityTable"].data.filter(x=>x.id in this.selection).map(x=>{
                    return x.id;
                })
                let commodityId = commodityIdList.join(",")
                this.$emit('refresh',{
                    index: this.index,
                    commodityId
                });
            },
            selectedCommodityClear() {

            },
            selectCommodity(val) {
                this.selection=val;
            },
            onLoad({ctx, app}) {
                ctx.service(this.$service.app.commodity.shopping).done();
                app.refresh({...this.tableFilter});
                let rows = this.$refs["commodityTable"].data;
                for (let i in rows) {
                    //rows[i].
                    if (rows[i].discountId!=null && rows[i].discountId!=this.discountId) {
                        this.$refs["commodityTable"].data.toggleRowSelection(rows[i], true);
                    }
                    else {
                        this.$refs["commodityTable"].data.toggleRowSelection(rows[i], false);
                    }
                }
            }
        }
        
    }
</script>