(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c77bd"],{"518c":function(e,o,n){"use strict";n.r(o);var t=function(){var e=this,o=e.$createElement,n=e._self._c||o;return n("cl-crud",{on:{load:e.onLoad}},[n("el-row",{attrs:{type:"flex",align:"middle"}},[n("span",{staticStyle:{"padding-right":"10px"}},[e._v("选择时间:")]),n("el-date-picker",{attrs:{size:"small",type:"datetimerange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.serach,callback:function(o){e.serach=o},expression:"serach"}}),n("el-button",{staticStyle:{"margin-left":"10px"},attrs:{size:"small",type:"primary"}},[e._v("查询")])],1),n("el-row",[n("cl-table",{attrs:{columns:e.tableColumn}})],1),n("el-row",{attrs:{type:"flex"}},[n("cl-flex1"),n("cl-pagination")],1),n("cl-form",{ref:"form"})],1)},a=[],l=(n("d3b7"),n("4795"),[{id:1,status:35.2,useDate:"2019年09月05日",useNum:242.1,type:72.1,images:["https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/1.jpg"]},{id:2,name:"陈二",status:35.2,useDate:"2019年09月05日",useNum:242.1,type:72.1,salesStatus:1,images:["https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/2.jpg"]}]),s={data:function(){return{serach:"",tableColumn:[{type:"index",label:"编号",align:"center",width:50},{label:"订单编号",prop:"orderNum",align:"center"},{label:"充值金额",prop:"rechargeMoney",align:"center"},{label:"实付金额",prop:"paymentMoney",align:"center"},{label:"支付时间",prop:"paymentTime",align:"center"}]}},methods:{openForm:function(){var e=this;this.$refs["form"].open({props:{title:"自定义表单"},items:[{label:"姓名",prop:"name",value:"神仙都没用",component:{name:"el-input"},rules:{required:!0,message:"姓名不能为空"}}],on:{open:function(e,o){o.close,o.submit,o.done;console.log("cl-form 打开钩子",e)},close:function(e,o){console.log("cl-form 关闭钩子",e),o()},submit:function(o,n){var t=n.close;n.done,n.next;console.log("cl-form 提交钩子",o),setTimeout((function(){t(),e.$message.success("提交成功")}),1500)}}})},onLoad:function(e){var o=e.ctx,n=e.app;o.service({page:function(e){return console.log("GET[page]",e),Promise.resolve({list:l,pagination:{page:e.page,size:e.size,total:200}})},info:function(e){return console.log("GET[info]",e),new Promise((function(e){e({name:"icssoa",price:100})}))},add:function(e){return console.log("POST[add]",e),Promise.resolve()},delete:function(e){return console.log("POST[delete]",e),Promise.resolve()},update:function(e){return console.log("POST[update]",e),Promise.resolve()}}).permission((function(){return{add:!0,update:!0,delete:!0}})).done(),n.refresh()}}},r=s,c=n("2877"),i=Object(c["a"])(r,t,a,!1,null,null,null);o["default"]=i.exports}}]);