(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3fd4aca2","chunk-2d2288b5","chunk-4dc7674b"],{"2b7c":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[r("div",{staticStyle:{"max-width":"900px"}},[r("el-form-item",{attrs:{label:"消息标题",prop:"messageTitle"}},[r("el-input",{attrs:{placeholder:"请输入消息标题",maxlength:"50","show-word-limit":""},model:{value:e.ruleForm.messageTitle,callback:function(t){e.$set(e.ruleForm,"messageTitle",t)},expression:"ruleForm.messageTitle"}})],1),r("el-form-item",{attrs:{label:"消息内容",prop:"messageContent"}},[r("el-input",{attrs:{type:"textarea",rows:"5",placeholder:"",maxlength:"800","show-word-limit":""},model:{value:e.ruleForm.messageContent,callback:function(t){e.$set(e.ruleForm,"messageContent",t)},expression:"ruleForm.messageContent"}})],1),r("el-form-item",{staticClass:"form-item",attrs:{label:"推送方式",prop:"pushMethod"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm.pushMethod,callback:function(t){e.$set(e.ruleForm,"pushMethod",t)},expression:"ruleForm.pushMethod"}},e._l([{value:1,text:"站内信"},{value:2,text:"短信"}],(function(e){return r("el-option",{key:e.value,attrs:{label:e.text,value:e.value}})})),1)],1),r("el-form-item",{staticClass:"form-item",attrs:{label:"推送时间",prop:"pushTime"}},[r("el-date-picker",{attrs:{type:"datetime",placeholder:"选择日期时间"},model:{value:e.ruleForm.pushTime,callback:function(t){e.$set(e.ruleForm,"pushTime",t)},expression:"ruleForm.pushTime"}})],1)],1),r("p",{staticStyle:{"margin-top":"45px"}},[e._v("选择用户")]),r("el-divider"),r("el-form-item",{attrs:{label:"选择用户",prop:"userType"}},[r("el-select",{attrs:{placeholder:"请选择"},on:{change:e.userTypeChange},model:{value:e.ruleForm.userType,callback:function(t){e.$set(e.ruleForm,"userType",t)},expression:"ruleForm.userType"}},[r("el-option",{attrs:{label:"全部",value:0}}),r("el-option",{attrs:{label:"指定用户",value:1}}),r("el-option",{attrs:{label:"分组用户",value:2}})],1)],1),1==e.ruleForm.userType?r("el-form-item",[r("el-transfer",{attrs:{filterable:"","filter-placeholder":"请输入用户手机号",titles:["用户列表","已选用户"],data:e.userList},model:{value:e.ruleForm.userArgs,callback:function(t){e.$set(e.ruleForm,"userArgs",t)},expression:"ruleForm.userArgs"}})],1):e._e(),2==e.ruleForm.userType?r("div",[r("el-form-item",{attrs:{label:"实名状态"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.userArgs.userCertification,callback:function(t){e.$set(e.userArgs,"userCertification",t)},expression:"userArgs.userCertification"}},e._l(e.useCcertificationDict,(function(e,t){return r("el-option",{key:t,attrs:{label:e.text,value:e.value}})})),1)],1),r("el-form-item",{attrs:{label:"球迷会"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.userArgs.fanClubId,callback:function(t){e.$set(e.userArgs,"fanClubId",t)},expression:"userArgs.fanClubId"}},[r("el-option",{attrs:{label:"非实名用户",value:0}}),r("el-option",{attrs:{label:"实名用户",value:1}})],1)],1),r("el-form-item",{attrs:{label:"套票类型"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.userArgs.ticketPackageUser,callback:function(t){e.$set(e.userArgs,"ticketPackageUser",t)},expression:"userArgs.ticketPackageUser"}},e._l(e.ticketPackageUserDict,(function(e,t){return r("el-option",{key:t,attrs:{label:e.text,value:e.value}})})),1)],1),r("el-form-item",{attrs:{label:"会员等级"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.userArgs.vipLevel,callback:function(t){e.$set(e.userArgs,"vipLevel",t)},expression:"userArgs.vipLevel"}},e._l(e.vipLevelDict,(function(e,t){return r("el-option",{key:t,attrs:{label:e.text,value:e.value}})})),1)],1),r("el-form-item",{attrs:{label:"支云卡状态"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.userArgs.zhiyunCardStatus,callback:function(t){e.$set(e.userArgs,"zhiyunCardStatus",t)},expression:"userArgs.zhiyunCardStatus"}},e._l(e.zhiyunCardStatusDict,(function(e,t){return r("el-option",{key:t,attrs:{label:e.text,value:e.value}})})),1)],1)],1):e._e(),r("div",{staticStyle:{"max-width":"900px","text-align":"center"}},[r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("确定")]),r("el-button",{on:{click:function(t){return e.resetForm("ruleForm")}}},[e._v("重置")])],1)],1)},l=[],s=r("5530"),u=(r("96cf"),r("1da1")),n=r("da46"),o={data:function(){return{couponTypeDict:n["couponTypeDict"],useCcertificationDict:n["useCcertificationDict"],vipLevelDict:n["vipLevelDict"],ticketPackageUserDict:n["ticketPackageUserDict"],zhiyunCardStatusDict:n["zhiyunCardStatusDict"],ruleForm:{messageTitle:"",messageContent:"",pushMethod:"",pushTime:"",userType:0},userList:[{label:"姓名",key:"13160492228"}],userArgs:{userCertification:0,userType:0,fanClubId:0,ticketPackageUser:0,vipLevel:0,zhiyunCardStatus:0},rules:{messageTitle:[{required:!0,message:"请输入活动名称",trigger:"blur"},{min:1,max:50,message:"长度在 1 到 5 个字符",trigger:"blur"}],pushMethod:[{required:!0,message:"请选择推送方式",trigger:"change"}],messageContent:[{required:!0,message:"请填写消息内容",trigger:"blur"}],pushTime:[{type:"date",required:!0,message:"请选择推送时间",trigger:"blur"}]}}},methods:{submitForm:function(e){var t=this;this.$refs[e].validate(function(){var e=Object(u["a"])(regeneratorRuntime.mark((function e(r){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=13;break}return e.prev=1,a=Object(s["a"])({},t.ruleForm),e.next=5,t.$service.app.message.add(a);case 5:t.$emit("update:addDialogShow",!1),e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](1),t.$message.error(e.t0);case 11:e.next=15;break;case 13:return console.log("error submit!!"),e.abrupt("return",!1);case 15:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}())},resetForm:function(e){this.$refs[e].resetFields()},userTypeChange:function(e){console.log(e)}}},i=o,c=(r("4e91"),r("2877")),p=Object(c["a"])(i,a,l,!1,null,"db37c886",null);t["default"]=p.exports},"4e91":function(e,t,r){"use strict";var a=r("aabc"),l=r.n(a);l.a},"6bc3":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("cl-crud",{on:{load:e.onLoad}},[r("el-row",{attrs:{type:"flex",align:"middle"}},[r("cl-search-key",{attrs:{field:"serachName",placeholder:"请输入用户姓名、手机号、套票号"}}),r("cl-flex1"),r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){e.addDialogShow=!0}}},[e._v("新增消息")])],1),r("el-row",[r("cl-table",{attrs:{columns:e.tableColumn},scopedSlots:e._u([{key:"column-op",fn:function(t){var a=t.scope;return[r("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(t){return e.$router.push({path:"MessageDetail",query:{id:a.row.id}})}}},[e._v("查看详情")]),r("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(t){return e.$router.push({path:"EditMessage",query:{id:a.row.id}})}}},[e._v("编辑")]),r("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(t){return e.deleteFn(a.row.id)}}},[e._v("删除")])]}}])})],1),r("el-row",{attrs:{type:"flex"}},[r("cl-flex1"),r("cl-pagination")],1),r("el-dialog",{attrs:{title:"新增消息",visible:e.addDialogShow,width:"800px"},on:{"update:visible":function(t){e.addDialogShow=t}}},[r("add-dialog")],1)],1)},l=[],s=(r("d3b7"),r("2b7c")),u=[{id:1,status:35.2,useDate:"2019年09月05日",useNum:242.1,type:72.1,images:["https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/1.jpg"]},{id:2,name:"陈二",status:35.2,useDate:"2019年09月05日",useNum:242.1,type:72.1,salesStatus:1,images:["https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/2.jpg"]}],n={components:{addDialog:s["default"]},data:function(){return{addDialogShow:!1,serach:"",tableColumn:[{type:"index",label:"编号",align:"center",width:50},{label:"消息标题",prop:"messageTitle",align:"center"},{label:"消息内容",prop:"messageContent",align:"center"},{label:"推送时间",prop:"pushTime",align:"center"},{label:"推送方式",prop:"pushMethod",align:"center"},{label:"操作",prop:"op",align:"center"}]}},methods:{deleteFn:function(e){var t=this;this.$confirm("此操作将删除该条消息推送, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.$message({type:"success",message:"删除成功!"})}))["catch"]((function(){t.$message({type:"info",message:"已取消删除"})}))},onLoad:function(e){var t=e.ctx,r=e.app;t.service({page:function(e){return console.log("GET[page]",e),Promise.resolve({list:u,pagination:{page:e.page,size:e.size,total:200}})},info:function(e){return console.log("GET[info]",e),new Promise((function(e){e({name:"icssoa",price:100})}))},add:function(e){return console.log("POST[add]",e),Promise.resolve()},delete:function(e){return console.log("POST[delete]",e),Promise.resolve()},update:function(e){return console.log("POST[update]",e),Promise.resolve()}}).permission((function(){return{add:!0,update:!0,delete:!0}})).done(),r.refresh()}}},o=n,i=r("2877"),c=Object(i["a"])(o,a,l,!1,null,null,null);t["default"]=c.exports},aabc:function(e,t,r){},da46:function(e,t,r){"use strict";r.r(t),r.d(t,"ticketPackageUserDict",(function(){return a})),r.d(t,"useCcertificationDict",(function(){return l})),r.d(t,"vipLevelDict",(function(){return s})),r.d(t,"zhiyunCardStatusDict",(function(){return u})),r.d(t,"pointsUseDetailTypeDict",(function(){return n})),r.d(t,"goodsTypeDict",(function(){return o})),r.d(t,"orderTypeDict",(function(){return i})),r.d(t,"orderStatusDict",(function(){return c})),r.d(t,"couponTypeDict",(function(){return p}));var a=[{value:0,text:"非套票"},{value:1,text:"基础套票"},{value:2,text:"普通套票"},{value:3,text:"亲子套票"},{value:4,text:"VIP套票"}],l=[{value:0,text:"未认证"},{value:1,text:"已认证"}],s=[{value:0,text:"非会员"},{value:1,text:"白银"},{value:2,text:"白金"},{value:3,text:"钻石"},{value:4,text:"黑金"}],u=[{value:0,text:"非云卡用户"},{value:1,text:"云卡用户"}],n=[{value:1,text:"商城购物"},{value:2,text:"活动打卡"},{value:3,text:"套票充值"},{value:4,text:"远征观赛"},{value:5,text:"商城购物"},{value:6,text:"兑换礼品"}],o=[{value:-1,text:"全部"},{value:0,text:"商城商品"},{value:1,text:"票务商品"},{value:2,text:"积分商品"},{value:3,text:"活动商品"}],i=[{value:0,text:"全部"},{value:1,text:"商城订单"},{value:2,text:"兑换订单"},{value:3,text:"票务订单"}],c=[{value:0,text:"全部"},{value:1,text:"待付款"},{value:2,text:"待发货"},{value:3,text:"待收货"}],p=[{value:-1,text:"全部"},{value:0,text:"满减券"},{value:1,text:"立减券"},{value:2,text:"折扣券"}]}}]);