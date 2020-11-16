(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4bfecfb8","chunk-2d2288b5"],{d6a3:function(e,t,o){"use strict";o.r(t);var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("cl-crud",{ref:"crud",on:{load:e.onLoad}},[o("el-row",{attrs:{type:"flex",align:"middle"}},[o("cl-search-key",{attrs:{placeholder:"请输入商品名称"}}),o("cl-flex1"),o("el-button",{attrs:{type:"text",size:"mini",icon:"el-icon-setting"},on:{click:function(t){return e.$router.push({path:"DeliveryCharge"})}}},[e._v("运费设置")]),o("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.$router.push({path:"ProductRelease"})}}},[e._v("发布商品")])],1),o("el-row",[o("cl-table",{attrs:{columns:e.tableColumn},scopedSlots:e._u([{key:"column-commodityCover",fn:function(e){var t=e.scope;return[o("el-image",{staticStyle:{width:"100px",height:"100px"},attrs:{src:t.row.commodityCover,"preview-src-list":[t.row.commodityCover]}})]}},{key:"column-fakeSalesVolume",fn:function(t){var r=t.scope;return[o("el-input-number",{staticStyle:{width:"100px"},attrs:{size:"mini","controls-position":"right",min:0},on:{change:function(t){return e.updateFakeSaleVolume(r.row)}},model:{value:r.row.fakeSalesVolume,callback:function(t){e.$set(r.row,"fakeSalesVolume",t)},expression:"scope.row.fakeSalesVolume"}})]}},{key:"column-salesVolumeShow",fn:function(t){var r=t.scope;return[o("el-switch",{attrs:{"active-value":1,"inactive-value":0,"active-text":"自定义","inactive-text":"真实"},on:{change:function(t){return e.updateShowSaleVolume(r.row)}},model:{value:r.row.salesVolumeShow,callback:function(t){e.$set(r.row,"salesVolumeShow",t)},expression:"scope.row.salesVolumeShow"}})]}},{key:"column-commodityStatus",fn:function(t){var r=t.scope;return[o("el-switch",{attrs:{"active-value":1,"inactive-value":0,"active-color":"#13ce66","inactive-color":"#ff4949","active-text":"上架","inactive-text":"下架"},on:{change:function(t){return e.updateStatus(r.row)}},model:{value:r.row.commodityStatus,callback:function(t){e.$set(r.row,"commodityStatus",t)},expression:"scope.row.commodityStatus"}})]}},{key:"column-commodityOrder",fn:function(t){var r=t.scope;return[o("el-input-number",{staticStyle:{width:"100px"},attrs:{size:"mini",min:1},on:{change:function(t){return e.updateCommodityOrder(r.row)}},model:{value:r.row.commodityOrder,callback:function(t){e.$set(r.row,"commodityOrder",t)},expression:"scope.row.commodityOrder"}})]}},{key:"column-op",fn:function(t){var r=t.scope;return[o("el-button",{attrs:{type:"text"}},[e._v("编辑")]),o("el-button",{attrs:{type:"text"},on:{click:function(t){return e.deleteFn(r.row)}}},[e._v("删除")])]}}])})],1),o("el-row",{attrs:{type:"flex"}},[o("cl-flex1"),o("cl-pagination")],1),o("cl-form",{ref:"form"})],1)},n=[],a=(o("d81d"),o("a9e3"),o("96cf"),o("1da1")),c=o("da46"),u={data:function(){return{tableColumn:[{type:"index",label:"编号",align:"center",width:50},{label:"商品封面",prop:"commodityCover",align:"center",width:125},{label:"商品名称",align:"center",prop:"commodityName"},{label:"商品类型",prop:"goodsType",filters:c["goodsTypeDict"],"filter-method":function(e,t,o){return-1!=e?t[o["property"]]===e:t[o["property"]]},formatter:function(e){var t="-";return c["goodsTypeDict"].map((function(o){e.goodsType==o.value&&(t=o.text)})),t},align:"center",width:105},{label:"真实销量",prop:"realSalesVolume",sortable:!0,align:"center",width:105},{label:"自定义销量",prop:"fakeSalesVolume",align:"center",width:125},{label:"销量展示",prop:"salesVolumeShow",align:"center",width:160},{label:"状态",prop:"commodityStatus",filters:[{value:0,text:"下架"},{value:1,text:"上架"}],"filter-method":function(e,t,o){return t[o["property"]]===e},align:"center",width:140},{label:"排序",prop:"commodityOrder",sortable:!0,align:"center",width:125},{label:"操作",prop:"op",align:"center",fixed:"right",width:120}]}},methods:{deleteFn:function(e){var t=this;this.$confirm("此操作将永久删除该商品, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(a["a"])(regeneratorRuntime.mark((function o(){var r,n;return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:if(o.prev=0,r=e.id,n=e.goodsType,n=Number(n),0!=n){o.next=8;break}return o.next=6,t.$service.app.commodity.shopping["delete"]({ids:r});case 6:o.next=11;break;case 8:if(2!=n){o.next=11;break}return o.next=11,t.$service.app.commodity.score["delete"]({ids:r});case 11:t.$message({message:"删除成功",type:"success"}),t.$refs["crud"].refresh(),o.next=18;break;case 15:o.prev=15,o.t0=o["catch"](0),t.$message.error(o.t0);case 18:case"end":return o.stop()}}),o,null,[[0,15]])}))))["catch"]((function(){t.$message({type:"info",message:"已取消删除"})}))},updateShowSaleVolume:function(e){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function o(){var r,n,a;return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return console.log(e),o.prev=1,r=e.id,n=e.goodsType,a=e.salesVolumeShow,console.log(r),o.next=6,t.$service.app.commodity.common.updateShowSaleVolume({id:r,goodsType:n,salesVolumeShow:a});case 6:t.$message({message:"修改成功",type:"success"}),o.next=12;break;case 9:o.prev=9,o.t0=o["catch"](1),t.$message.error(o.t0);case 12:case"end":return o.stop()}}),o,null,[[1,9]])})))()},updateStatus:function(e){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function o(){var r,n,a;return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return console.log(e),o.prev=1,r=e.id,n=e.goodsType,a=e.commodityStatus,console.log(r),o.next=6,t.$service.app.commodity.common.updateStatus({id:r,goodsType:n,commodityStatus:a});case 6:t.$message({message:"修改成功",type:"success"}),o.next=12;break;case 9:o.prev=9,o.t0=o["catch"](1),t.$message.error(o.t0);case 12:case"end":return o.stop()}}),o,null,[[1,9]])})))()},updateFakeSaleVolume:function(e){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function o(){var r,n,a;return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return console.log(e),o.prev=1,r=e.id,n=e.goodsType,a=e.fakeSaleVolume,console.log(r),o.next=6,t.$service.app.commodity.common.updateFakeSaleVolume({id:r,goodsType:n,fakeSaleVolume:a});case 6:t.$message({message:"修改成功",type:"success"}),o.next=12;break;case 9:o.prev=9,o.t0=o["catch"](1),t.$message.error(o.t0);case 12:case"end":return o.stop()}}),o,null,[[1,9]])})))()},updateCommodityOrder:function(e){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function o(){var r,n,a;return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return console.log(e),o.prev=1,r=e.id,n=e.goodsType,a=e.commodityOrder,console.log(r),o.next=6,t.$service.app.commodity.common.updateCommodityOrder({id:r,goodsType:n,commodityOrder:a});case 6:t.$message({message:"修改成功",type:"success"}),o.next=12;break;case 9:o.prev=9,o.t0=o["catch"](1),t.$message.error(o.t0);case 12:case"end":return o.stop()}}),o,null,[[1,9]])})))()},onLoad:function(e){var t=e.ctx,o=e.app;t.service(this.$service.app.commodity.common).done(),o.refresh({goodsType:-1,prop:"createTime",order:"desc"})}}},i=u,l=o("2877"),s=Object(l["a"])(i,r,n,!1,null,null,null);t["default"]=s.exports},da46:function(e,t,o){"use strict";o.r(t),o.d(t,"ticketPackageUserDict",(function(){return r})),o.d(t,"useCcertificationDict",(function(){return n})),o.d(t,"vipLevelDict",(function(){return a})),o.d(t,"zhiyunCardStatusDict",(function(){return c})),o.d(t,"pointsUseDetailTypeDict",(function(){return u})),o.d(t,"goodsTypeDict",(function(){return i})),o.d(t,"orderTypeDict",(function(){return l})),o.d(t,"orderStatusDict",(function(){return s})),o.d(t,"couponTypeDict",(function(){return m}));var r=[{value:0,text:"非套票"},{value:1,text:"基础套票"},{value:2,text:"普通套票"},{value:3,text:"亲子套票"},{value:4,text:"VIP套票"}],n=[{value:0,text:"未认证"},{value:1,text:"已认证"}],a=[{value:0,text:"非会员"},{value:1,text:"白银"},{value:2,text:"白金"},{value:3,text:"钻石"},{value:4,text:"黑金"}],c=[{value:0,text:"非云卡用户"},{value:1,text:"云卡用户"}],u=[{value:1,text:"商城购物"},{value:2,text:"活动打卡"},{value:3,text:"套票充值"},{value:4,text:"远征观赛"},{value:5,text:"商城购物"},{value:6,text:"兑换礼品"}],i=[{value:-1,text:"全部"},{value:0,text:"商城商品"},{value:1,text:"票务商品"},{value:2,text:"积分商品"},{value:3,text:"活动商品"}],l=[{value:0,text:"全部"},{value:1,text:"商城订单"},{value:2,text:"兑换订单"},{value:3,text:"票务订单"}],s=[{value:0,text:"全部"},{value:1,text:"待付款"},{value:2,text:"待发货"},{value:3,text:"待收货"}],m=[{value:-1,text:"全部"},{value:0,text:"满减券"},{value:1,text:"立减券"},{value:2,text:"折扣券"}]}}]);