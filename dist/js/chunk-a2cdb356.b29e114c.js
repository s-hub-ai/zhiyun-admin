(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a2cdb356","chunk-2d2288b5"],{da46:function(e,t,r){"use strict";r.r(t),r.d(t,"ticketPackageUserDict",(function(){return n})),r.d(t,"useCcertificationDict",(function(){return u})),r.d(t,"zhiyunCardStatusDict",(function(){return o})),r.d(t,"pointsUseDetailTypeDict",(function(){return a})),r.d(t,"goodsTypeDict",(function(){return l})),r.d(t,"orderTypeDict",(function(){return c})),r.d(t,"orderStatusDict",(function(){return i})),r.d(t,"couponTypeDict",(function(){return s})),r.d(t,"vipLevelDict",(function(){return v}));var n=[{value:0,text:"非套票"},{value:1,text:"基础套票"},{value:2,text:"普通套票"},{value:3,text:"亲子套票"},{value:4,text:"VIP套票"}],u=[{value:0,text:"未认证"},{value:1,text:"已认证"}],o=[{value:0,text:"非云卡用户"},{value:1,text:"云卡用户"}],a=[{value:1,text:"商城购物"},{value:2,text:"活动打卡"},{value:3,text:"套票充值"},{value:4,text:"远征观赛"},{value:5,text:"商城购物"},{value:6,text:"兑换礼品"}],l=[{value:-1,text:"全部"},{value:0,text:"商城商品"},{value:1,text:"票务商品"},{value:2,text:"积分商品"},{value:3,text:"活动商品"}],c=[{value:-1,text:"全部"},{value:0,text:"商城订单"},{value:2,text:"兑换订单"},{value:1,text:"票务订单"}],i=[{text:"全部",value:-1},{text:"待付款",value:0},{text:"待发货",value:1},{text:"待收货",value:2},{text:"发起退款",value:4},{text:"交易完成",value:3,type:"success"},{text:"已退款",value:5,type:"danger"},{text:"订单关闭",value:6,type:"danger"}],s=[{value:-1,text:"全部"},{value:0,text:"满减券"},{value:1,text:"立减券"},{value:2,text:"折扣券"}],v=[{value:0,text:"非会员"},{value:1,text:"白银"},{value:2,text:"白金"},{value:3,text:"钻石"},{value:4,text:"黑金"}]},ff0c:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("cl-crud",{ref:"crud",on:{load:e.onLoad}},[r("el-row",[r("cl-refresh-btn"),r("el-button",{attrs:{size:"mini"},on:{click:function(t){e.visible=!0}}},[e._v("增加积分")])],1),r("el-row",[r("cl-table",{attrs:{columns:e.tableColumn},scopedSlots:e._u([{key:"column-score",fn:function(t){var n=t.scope;return[r("span",{class:n.row.scoreType?"text-green-400":"text-red-500"},[e._v(" "+e._s(" "+(n.row.scoreType?"+":"-")+n.row.score)+" ")])]}}])})],1),r("el-row",{attrs:{type:"flex"}},[r("cl-flex1"),r("cl-pagination")],1),r("cl-dialog",{attrs:{title:"增加积分",visible:e.visible},on:{"update:visible":function(t){e.visible=t}}},[r("el-form",{attrs:{"label-width":"100px"}},[r("el-form-item",{attrs:{"label-width":"输入积分"}},[r("el-input-number",{attrs:{min:0,max:999999},model:{value:e.addScore,callback:function(t){e.addScore=t},expression:"addScore"}})],1),r("el-button",{on:{click:e.submitAdd}},[e._v("确定添加")])],1)],1),r("cl-form",{ref:"form"})],1)},u=[],o=(r("d81d"),r("4795"),r("96cf"),r("1da1")),a=r("da46"),l={data:function(){return{visible:!1,serach:"",addScore:0,tableColumn:[{label:"时间",prop:"createTime",align:"center"},{label:"获取/使用",prop:"scoreType",align:"center",formatter:function(e){return["使用","获取"][e.scoreType]}},{label:"积分数量",prop:"score",align:"center"},{label:"事件类型",filters:a["pointsUseDetailTypeDict"],prop:"scoreSource",align:"center",formatter:function(e){var t;return null===a["pointsUseDetailTypeDict"]||void 0===a["pointsUseDetailTypeDict"]||a["pointsUseDetailTypeDict"].map((function(r){e.scoreSource==r.value&&(t=r.text)})),t||"其他"}}]}},methods:{submitAdd:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$service.app.user.info.updateScore({userId:e.$route.query.id,score:e.addScore});case 2:e.visible=!1,e.$refs.crud.refresh();case 4:case"end":return t.stop()}}),t)})))()},openForm:function(){var e=this;this.$refs["form"].open({props:{title:"自定义表单"},items:[{label:"姓名",prop:"name",value:"神仙都没用",component:{name:"el-input"},rules:{required:!0,message:"姓名不能为空"}}],on:{open:function(e,t){t.close,t.submit,t.done;console.log("cl-form 打开钩子",e)},close:function(e,t){console.log("cl-form 关闭钩子",e),t()},submit:function(t,r){var n=r.close;r.done,r.next;console.log("cl-form 提交钩子",t),setTimeout((function(){n(),e.$message.success("提交成功")}),1500)}}})},onLoad:function(e){var t=e.ctx,r=e.app;t.service(this.$service.app.score).done(),r.refresh({userId:this.$route.query.id})}}},c=l,i=r("2877"),s=Object(i["a"])(c,n,u,!1,null,null,null);t["default"]=s.exports}}]);