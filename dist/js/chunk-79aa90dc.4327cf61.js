(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-79aa90dc","chunk-2d2288b5"],{"159d":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("cl-crud",{ref:"crud",on:{load:e.onLoad}},[r("el-row",{attrs:{type:"flex",align:"middle"}},[r("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.tableFlters,size:"mini"}},[r("el-form-item",{attrs:{label:"订单类型\n\t\t\t"}},[r("el-select",{attrs:{placeholder:"请选择"},on:{change:function(t){return e.$refs["crud"].refresh(Object.assign({},e.tableFlters))}},model:{value:e.tableFlters.orderType,callback:function(t){e.$set(e.tableFlters,"orderType",t)},expression:"tableFlters.orderType"}},e._l(e.orderTypeDict,(function(e,t){return r("el-option",{key:t,attrs:{label:e.text,value:e.value}})})),1)],1),r("el-form-item",{attrs:{label:"订单状态\n\t\t\t"}},[r("el-select",{attrs:{placeholder:"请选择"},on:{change:function(t){return e.$refs["crud"].refresh(Object.assign({},e.tableFlters))}},model:{value:e.tableFlters.orderStatus,callback:function(t){e.$set(e.tableFlters,"orderStatus",t)},expression:"tableFlters.orderStatus"}},e._l(e.orderStatusDict,(function(e,t){return r("el-option",{key:t,attrs:{label:e.text,value:e.value}})})),1)],1),r("el-form-item",{attrs:{label:"下单时间"}},[r("el-date-picker",{attrs:{"default-time":["00:00:00","24:00:00"],type:"datetimerange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd HH:mm:ss"},on:{change:e.orderTimeChange},model:{value:e.orderTime,callback:function(t){e.orderTime=t},expression:"orderTime"}})],1)],1),r("cl-flex1"),r("cl-search-key",{attrs:{placeholder:"请输入订单编号或收件人手机号"}})],1),r("el-row",[r("cl-table",{attrs:{columns:e.tableColumn},scopedSlots:e._u([{key:"column-skus",fn:function(t){var a=t.scope;return e._l(a.row.skus,(function(t,a){return r("div",{key:t.id},[0!=a?r("el-divider",{staticStyle:{margin:"4px 0"}}):e._e(),r("div",[e._v("商品名称:"+e._s(t.commodityName))]),r("div",[e._v("规格:"+e._s(e._f("format_spec")(t.skuString)))]),r("div",[e._v("数量:"+e._s(t.commodityVolume))])],1)}))}},{key:"column-buyInfo",fn:function(t){var a=t.scope;return[r("div",[e._v("收件人:"+e._s(a.row.cantact))]),r("div",[e._v("手机号:"+e._s(a.row.phone))])]}},{key:"column-op",fn:function(t){var a=t.scope;return[1==a.row.orderStatus?r("el-button",{attrs:{type:"text"},on:{click:function(t){e.deliveryForm.orderId=a.row.id,e.deliveDialogShow=!0}}},[e._v("发货")]):e._e(),2==a.row.orderStatus?r("el-button",{attrs:{type:"text"},on:{click:function(t){e.deliveryForm.orderId=a.row.id,e.getLogistics()}}},[e._v("物流")]):e._e(),4==a.row.orderStatus?r("el-button",{attrs:{type:"text"},on:{click:function(t){e.drawbackAuditShow=!0,e.getEditInfo(a.row.id)}}},[e._v("退款审核")]):e._e(),r("el-button",{attrs:{type:"text"},on:{click:function(t){e.detailDialogShow=!0,e.getEditInfo(a.row.id)}}},[e._v("详情")])]}}])})],1),r("el-row",{attrs:{type:"flex"}},[r("cl-flex1"),r("cl-pagination")],1),r("el-dialog",{attrs:{title:"商品发货",visible:e.deliveDialogShow,width:"400px"},on:{"update:visible":function(t){e.deliveDialogShow=t}}},[r("el-form",{attrs:{model:e.deliveryForm,"label-width":"90px"}},[r("el-form-item",{attrs:{label:"快递单号",required:""}},[r("el-input",{on:{blur:function(t){return e.getDelivery()}},model:{value:e.deliveryForm.deliverySN,callback:function(t){e.$set(e.deliveryForm,"deliverySN",t)},expression:"deliveryForm.deliverySN"}})],1),r("el-form-item",{attrs:{label:"选择快递",required:""}},[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择"},model:{value:e.deliveryForm.deliveryCompany,callback:function(t){e.$set(e.deliveryForm,"deliveryCompany",t)},expression:"deliveryForm.deliveryCompany"}},e._l(e.deliveryList,(function(e,t){return r("el-option",{key:t,attrs:{label:e.name,value:e.type}})})),1)],1)],1),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.deliveDialogShow=!1}}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:e.delivergoods}},[e._v("确 定")])],1)],1),r("el-dialog",{attrs:{title:"物流信息",visible:e.dialogLogistics},on:{"update:visible":function(t){e.dialogLogistics=t}}},[r("el-timeline",e._l(e.logistics.list,(function(t,a){return r("el-timeline-item",{key:a,attrs:{timestamp:t.date}},[e._v(" "+e._s(t.status)+" ")])})),1)],1),r("el-dialog",{attrs:{title:"退款审核",visible:e.drawbackAuditShow,width:"500px"},on:{"update:visible":function(t){e.drawbackAuditShow=t}}},[r("el-form",[r("el-form-item",{attrs:{label:"退款原因:"}},[r("span",[e._v(e._s(e.detail.drawbackReason))])]),r("el-form-item",{attrs:{label:"申请时间:"}},[r("span",[e._v(e._s(e.detail.applyTime))])]),r("el-form-item",{attrs:{label:"退款件数:"}},[r("span",[e._v(e._s(e.detail.applyTime))])]),r("el-form-item",{attrs:{label:"退款金额:"}},[r("span",[e._v(e._s(e.detail.drawbackAmount))])]),r("el-form-item",{attrs:{label:"退款审核"}},[r("el-radio-group",{model:{value:e.drawbackVerify,callback:function(t){e.drawbackVerify=t},expression:"drawbackVerify"}},[r("el-radio",{attrs:{label:1}},[e._v("同意退款")]),r("el-radio",{attrs:{label:0}},[e._v("拒绝退款")])],1)],1)],1),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.drawbackAuditShow=!1}}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogFormVisible=!1,e.drawbackAudit()}}},[e._v("确 定")])],1)],1),r("el-dialog",{attrs:{title:"订单详情",visible:e.detailDialogShow,width:"80%"},on:{"update:visible":function(t){e.detailDialogShow=t}}},[r("el-form",{staticClass:"demo-ruleForm",attrs:{"label-width":"100px",inline:!0}},[r("h3",[e._v("消息详情")]),r("div",{staticStyle:{"max-width":"900px"}},[r("el-form-item",{attrs:{label:"订单类型:"}},[r("span",[e._v(e._s(e.orderType))])]),r("el-form-item",{attrs:{label:"订单编号:"}},[r("span",[e._v(e._s(e.detail.orderSN))])]),r("el-form-item",{staticClass:"form-item",attrs:{label:"交易单号:"}},[r("span",[e._v(e._s(e._f("default")(e.detail.tradeSN)))])]),r("el-form-item",{staticClass:"form-item",attrs:{label:"下单时间:"}},[r("span",[e._v(e._s(e._f("default")(e.detail.orderTime)))])]),r("el-form-item",{staticClass:"form-item",attrs:{label:"收件人:"}},[r("span",[e._v(e._s(e._f("default")(e.detail.addresseeName)))])]),r("el-form-item",{staticClass:"form-item",attrs:{label:"手机号:"}},[r("span",[e._v(e._s(e._f("default")(e.detail.addresseePhoneNum)))])]),r("el-form-item",{staticClass:"form-item",attrs:{label:"收件地址:"}},[r("span",[e._v(e._s(e._f("default")(e.detail.addresseeAddress)))])])],1),r("h3",{staticStyle:{"margin-top":"45px"}},[e._v("商品信息")]),e._l(e.detail.skus,(function(t,a){return r("div",{key:a},[r("el-form-item",{staticClass:"form-item",attrs:{label:"商品名称:"}},[r("span",[e._v(e._s(t.commodityName))])]),r("el-form-item",{staticClass:"form-item",attrs:{label:"商品规格:"}},[r("span",[e._v(e._s(e._f("format_spec")(t.skuString)))])]),r("el-form-item",{staticClass:"form-item",attrs:{label:"下单数量:"}},[r("span",[e._v(e._s(t.commodityVolume))])])],1)})),r("h3",{staticStyle:{"margin-top":"45px"}},[e._v("支付信息")]),r("div",[r("el-form-item",{staticClass:"form-item",attrs:{label:"支付方式:"}},[r("span",[e._v(e._s(e._f("default")(e.detail.orderMethod)))])]),r("el-form-item",{staticClass:"form-item",attrs:{label:"付款时间:"}},[r("span",[e._v(e._s(e._f("default")(e.detail.buttonTime)))])]),r("el-form-item",{staticClass:"form-item",attrs:{label:"总计金额:"}},[r("span",[e._v(e._s(e._f("default")(e.detail.totalPayment)))])]),r("el-form-item",{staticClass:"form-item",attrs:{label:"优惠金额:"}},[r("span",[e._v(e._s(e._f("default")(e.detail.salePromotion)))])]),r("el-form-item",{staticClass:"form-item",attrs:{label:"实付金额:"}},[r("span",[e._v(e._s(e._f("default")(e.detail.realPayment)))])])],1),r("h3",{staticStyle:{"margin-top":"45px"}},[e._v("物流信息")]),r("div",[r("el-form-item",{staticClass:"form-item",attrs:{label:"发货时间:"}},[r("span",[e._v(e._s(e._f("default")(e.detail.deliveryTime)))])]),r("el-form-item",{staticClass:"form-item",attrs:{label:"物流方式:"}},[r("span",[e._v(e._s(e._f("default")(e.detail.deliveryMethod)))])]),r("el-form-item",{staticClass:"form-item",attrs:{label:"物流单号:"}},[r("span",[e._v(e._s(e._f("default")(e.detail.deliverySN)))])])],1),r("h3",{staticStyle:{"margin-top":"45px"}},[e._v("售后信息")]),r("div",[r("el-form-item",{staticClass:"form-item",attrs:{label:"退款原因:"}},[r("span",[e._v(e._s(e._f("default")(e.detail.drawbackReason)))])]),r("el-form-item",{staticClass:"form-item",attrs:{label:"申请时间:"}},[r("span",[e._v(e._s(e._f("default")(e.detail.applyTime)))])]),r("el-form-item",{staticClass:"form-item",attrs:{label:"退款金额:"}},[r("span",[e._v(e._s(e._f("default")(e.detail.drawbackAmount)))])]),r("el-form-item",{staticClass:"form-item",attrs:{label:"退款编号:"}},[r("span",[e._v(e._s(e._f("default")(e.detail.drawbackSN)))])]),1==e.detail.drawbackVerify?r("el-form-item",{staticClass:"form-item",attrs:{label:"退款时间:"}},[r("span",[e._v(e._s(e._f("default")(e.detail.drawbackTime)))])]):e._e()],1)],2)],1)],1)},l=[],i=(r("d81d"),r("96cf"),r("1da1")),s=r("5530"),o=r("da46"),n={computed:{orderType:function(){var e,t=this;return null===o["orderTypeDict"]||void 0===o["orderTypeDict"]||o["orderTypeDict"].map((function(r,a,l){r.value==t.detail.orderType&&(e=r.text)})),e}},data:function(){return{orderTypeDict:o["orderTypeDict"],orderStatusDict:o["orderStatusDict"],dialogLogistics:!1,detailDialogShow:!1,drawbackAuditShow:!1,drawbackVerify:1,drawbackAuditD:{},detail:{},deliveDialogShow:!1,orderTime:[],tableFlters:{startTime:"",endTime:"",orderType:-1,orderStatus:-1},tableColumn:[{type:"index",align:"center",label:"编号"},{label:"订单类型",width:110,align:"center",prop:"orderType",formatter:function(e){var t="-";return o["orderTypeDict"].map((function(r){e.orderType==r.value&&(t=r.text)})),t}},{label:"订单编号",prop:"orderSN",align:"center"},{label:"商品信息",prop:"skus",align:"left"},{label:"价格￥",prop:"totalPayment",align:"center"},{label:"商品实付￥",prop:"realPayment",align:"center"},{label:"购买信息",prop:"buyInfo",align:"center"},{label:"下单时间",prop:"orderTime",width:90,align:"center"},{label:"订单状态",width:110,prop:"orderStatus",align:"center",formatter:function(e){var t="-";return null===o["orderStatusDict"]||void 0===o["orderStatusDict"]||o["orderStatusDict"].map((function(r){e.orderStatus==r.value&&(t=r.text)})),t}},{label:"操作",width:200,fixed:"right",prop:"op",align:"center"}],deliveryForm:{deliveryCompany:"",deliverySN:"",orderId:""},deliveryList:[],logistics:[]}},methods:{onLoad:function(e){var t=e.ctx,r=e.app;t.service(this.$service.app.order).done(),r.refresh(Object(s["a"])({},this.tableFlters))},drawbackAudit:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:1==e.drawbackVerify?e.$confirm("确定同意这笔订单的退款申请?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$service.app.order.offerRefund({id:e.detail.id});case 3:e.$message({type:"success",message:"退款成功!"}),e.$refs["crud"].refresh(),t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](0),e.$message.error(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])}))))["catch"]((function(t){e.$message({type:"info",message:t})})):e.$confirm("确定拒绝这笔订单的退款申请?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$service.app.order.refuseRefund({id:e.detail.id});case 3:e.$message({type:"success",message:"已拒绝!"}),e.$refs["crud"].refresh(),t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](0),e.$message.error(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])}))));case 1:case"end":return t.stop()}}),t)})))()},orderTimeChange:function(e){console.log(e),this.tableFlters.startTime=e[0],this.tableFlters.endTime=e[1],this.$refs["crud"].refresh(Object(s["a"])({},this.tableFlters))},getLogistics:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=e,t.prev=1,t.next=4,r.$service.app.order.delivery({orderId:e.deliveryForm.orderId});case 4:e.logistics=t.sent,e.dialogLogistics=!0,t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](1),e.$message.error(t.t0);case 11:case"end":return t.stop()}}),t,null,[[1,8]])})))()},delivergoods:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$service.system.delivery.add(Object(s["a"])({},e.deliveryForm));case 3:e.$refs["crud"].refresh(),e.deliveDialogShow=!1,t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](0),e.$message.error(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))()},getDelivery:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$service.system.delivery.listby({deliverySN:e.deliveryForm.deliverySN});case 3:r=t.sent,e.deliveryList=r,t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](0),e.$message.error(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))()},getEditInfo:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,t.$service.app.order.info({id:e});case 3:a=r.sent,t.detail=a,r.next=10;break;case 7:r.prev=7,r.t0=r["catch"](0),t.$message.error(r.t0);case 10:case"end":return r.stop()}}),r,null,[[0,7]])})))()}}},c=n,d=(r("c079"),r("2877")),u=Object(d["a"])(c,a,l,!1,null,"a288a196",null);t["default"]=u.exports},"82bc":function(e,t,r){},c079:function(e,t,r){"use strict";var a=r("82bc"),l=r.n(a);l.a},da46:function(e,t,r){"use strict";r.r(t),r.d(t,"ticketPackageUserDict",(function(){return a})),r.d(t,"useCcertificationDict",(function(){return l})),r.d(t,"zhiyunCardStatusDict",(function(){return i})),r.d(t,"pointsUseDetailTypeDict",(function(){return s})),r.d(t,"goodsTypeDict",(function(){return o})),r.d(t,"orderTypeDict",(function(){return n})),r.d(t,"orderStatusDict",(function(){return c})),r.d(t,"couponTypeDict",(function(){return d})),r.d(t,"vipLevelDict",(function(){return u}));var a=[{value:0,text:"非套票"},{value:1,text:"基础套票"},{value:2,text:"普通套票"},{value:3,text:"亲子套票"},{value:4,text:"VIP套票"}],l=[{value:0,text:"未认证"},{value:1,text:"已认证"}],i=[{value:0,text:"非云卡用户"},{value:1,text:"云卡用户"}],s=[{value:1,text:"商城购物"},{value:2,text:"活动打卡"},{value:3,text:"套票充值"},{value:4,text:"远征观赛"},{value:5,text:"商城购物"},{value:6,text:"兑换礼品"}],o=[{value:-1,text:"全部"},{value:0,text:"商城商品"},{value:1,text:"票务商品"},{value:2,text:"积分商品"},{value:3,text:"活动商品"}],n=[{value:-1,text:"全部"},{value:0,text:"商城订单"},{value:2,text:"兑换订单"},{value:1,text:"票务订单"}],c=[{text:"全部",value:-1},{text:"待付款",value:0},{text:"待发货",value:1},{text:"待收货",value:2},{text:"发起退款",value:4},{text:"交易完成",value:3,type:"success"},{text:"已退款",value:5,type:"danger"},{text:"订单关闭",value:6,type:"danger"}],d=[{value:-1,text:"全部"},{value:0,text:"满减券"},{value:1,text:"立减券"},{value:2,text:"折扣券"}],u=[{value:0,text:"非会员"},{value:1,text:"白银"},{value:2,text:"白金"},{value:3,text:"钻石"},{value:4,text:"黑金"}]}}]);