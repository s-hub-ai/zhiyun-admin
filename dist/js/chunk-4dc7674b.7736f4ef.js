(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4dc7674b","chunk-2d2288b5"],{"2b7c":function(e,t,r){"use strict";r.r(t);var l=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[r("div",{staticStyle:{"max-width":"900px"}},[r("el-form-item",{attrs:{label:"消息标题",prop:"messageTitle"}},[r("el-input",{attrs:{placeholder:"请输入消息标题",maxlength:"50","show-word-limit":""},model:{value:e.ruleForm.messageTitle,callback:function(t){e.$set(e.ruleForm,"messageTitle",t)},expression:"ruleForm.messageTitle"}})],1),r("el-form-item",{attrs:{label:"消息内容",prop:"messageContent"}},[r("el-input",{attrs:{type:"textarea",rows:"5",placeholder:"",maxlength:"800","show-word-limit":""},model:{value:e.ruleForm.messageContent,callback:function(t){e.$set(e.ruleForm,"messageContent",t)},expression:"ruleForm.messageContent"}})],1),r("el-form-item",{staticClass:"form-item",attrs:{label:"推送方式",prop:"pushMethod"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm.pushMethod,callback:function(t){e.$set(e.ruleForm,"pushMethod",t)},expression:"ruleForm.pushMethod"}},e._l([{value:1,text:"站内信"},{value:2,text:"短信"}],(function(e){return r("el-option",{key:e.value,attrs:{label:e.text,value:e.value}})})),1)],1),r("el-form-item",{staticClass:"form-item",attrs:{label:"推送时间",prop:"pushTime"}},[r("el-date-picker",{attrs:{type:"datetime",placeholder:"选择日期时间"},model:{value:e.ruleForm.pushTime,callback:function(t){e.$set(e.ruleForm,"pushTime",t)},expression:"ruleForm.pushTime"}})],1)],1),r("p",{staticStyle:{"margin-top":"45px"}},[e._v("选择用户")]),r("el-divider"),r("el-form-item",{attrs:{label:"选择用户",prop:"userType"}},[r("el-select",{attrs:{placeholder:"请选择"},on:{change:e.userTypeChange},model:{value:e.ruleForm.userType,callback:function(t){e.$set(e.ruleForm,"userType",t)},expression:"ruleForm.userType"}},[r("el-option",{attrs:{label:"全部",value:0}}),r("el-option",{attrs:{label:"指定用户",value:1}}),r("el-option",{attrs:{label:"分组用户",value:2}})],1)],1),1==e.ruleForm.userType?r("el-form-item",[r("el-transfer",{attrs:{filterable:"","filter-placeholder":"请输入用户手机号",titles:["用户列表","已选用户"],data:e.userList},model:{value:e.ruleForm.userArgs,callback:function(t){e.$set(e.ruleForm,"userArgs",t)},expression:"ruleForm.userArgs"}})],1):e._e(),2==e.ruleForm.userType?r("div",[r("el-form-item",{attrs:{label:"实名状态"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.userArgs.userCertification,callback:function(t){e.$set(e.userArgs,"userCertification",t)},expression:"userArgs.userCertification"}},e._l(e.useCcertificationDict,(function(e,t){return r("el-option",{key:t,attrs:{label:e.text,value:e.value}})})),1)],1),r("el-form-item",{attrs:{label:"球迷会"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.userArgs.fanClubId,callback:function(t){e.$set(e.userArgs,"fanClubId",t)},expression:"userArgs.fanClubId"}},[r("el-option",{attrs:{label:"非实名用户",value:0}}),r("el-option",{attrs:{label:"实名用户",value:1}})],1)],1),r("el-form-item",{attrs:{label:"套票类型"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.userArgs.ticketPackageUser,callback:function(t){e.$set(e.userArgs,"ticketPackageUser",t)},expression:"userArgs.ticketPackageUser"}},e._l(e.ticketPackageUserDict,(function(e,t){return r("el-option",{key:t,attrs:{label:e.text,value:e.value}})})),1)],1),r("el-form-item",{attrs:{label:"会员等级"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.userArgs.vipLevel,callback:function(t){e.$set(e.userArgs,"vipLevel",t)},expression:"userArgs.vipLevel"}},e._l(e.vipLevelDict,(function(e,t){return r("el-option",{key:t,attrs:{label:e.text,value:e.value}})})),1)],1),r("el-form-item",{attrs:{label:"支云卡状态"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.userArgs.zhiyunCardStatus,callback:function(t){e.$set(e.userArgs,"zhiyunCardStatus",t)},expression:"userArgs.zhiyunCardStatus"}},e._l(e.zhiyunCardStatusDict,(function(e,t){return r("el-option",{key:t,attrs:{label:e.text,value:e.value}})})),1)],1)],1):e._e(),r("div",{staticStyle:{"max-width":"900px","text-align":"center"}},[r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("确定")]),r("el-button",{on:{click:function(t){return e.resetForm("ruleForm")}}},[e._v("重置")])],1)],1)},a=[],u=r("5530"),s=(r("96cf"),r("1da1")),i=r("da46"),o={data:function(){return{couponTypeDict:i["couponTypeDict"],useCcertificationDict:i["useCcertificationDict"],vipLevelDict:i["vipLevelDict"],ticketPackageUserDict:i["ticketPackageUserDict"],zhiyunCardStatusDict:i["zhiyunCardStatusDict"],ruleForm:{messageTitle:"",messageContent:"",pushMethod:"",pushTime:"",userType:0},userList:[{label:"姓名",key:"13160492228"}],userArgs:{userCertification:0,userType:0,fanClubId:0,ticketPackageUser:0,vipLevel:0,zhiyunCardStatus:0},rules:{messageTitle:[{required:!0,message:"请输入活动名称",trigger:"blur"},{min:1,max:50,message:"长度在 1 到 5 个字符",trigger:"blur"}],pushMethod:[{required:!0,message:"请选择推送方式",trigger:"change"}],messageContent:[{required:!0,message:"请填写消息内容",trigger:"blur"}],pushTime:[{type:"date",required:!0,message:"请选择推送时间",trigger:"blur"}]}}},methods:{submitForm:function(e){var t=this;this.$refs[e].validate(function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(r){var l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=13;break}return e.prev=1,l=Object(u["a"])({},t.ruleForm),e.next=5,t.$service.app.message.add(l);case 5:t.$emit("update:addDialogShow",!1),e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](1),t.$message.error(e.t0);case 11:e.next=15;break;case 13:return console.log("error submit!!"),e.abrupt("return",!1);case 15:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}())},resetForm:function(e){this.$refs[e].resetFields()},userTypeChange:function(e){console.log(e)}}},n=o,c=(r("4e91"),r("2877")),m=Object(c["a"])(n,l,a,!1,null,"db37c886",null);t["default"]=m.exports},"4e91":function(e,t,r){"use strict";var l=r("aabc"),a=r.n(l);a.a},aabc:function(e,t,r){},da46:function(e,t,r){"use strict";r.r(t),r.d(t,"ticketPackageUserDict",(function(){return l})),r.d(t,"useCcertificationDict",(function(){return a})),r.d(t,"zhiyunCardStatusDict",(function(){return u})),r.d(t,"pointsUseDetailTypeDict",(function(){return s})),r.d(t,"goodsTypeDict",(function(){return i})),r.d(t,"orderTypeDict",(function(){return o})),r.d(t,"orderStatusDict",(function(){return n})),r.d(t,"couponTypeDict",(function(){return c})),r.d(t,"vipLevelDict",(function(){return m}));var l=[{value:0,text:"非套票"},{value:1,text:"基础套票"},{value:2,text:"普通套票"},{value:3,text:"亲子套票"},{value:4,text:"VIP套票"}],a=[{value:0,text:"未认证"},{value:1,text:"已认证"}],u=[{value:0,text:"非云卡用户"},{value:1,text:"云卡用户"}],s=[{value:1,text:"商城购物"},{value:2,text:"活动打卡"},{value:3,text:"套票充值"},{value:4,text:"远征观赛"},{value:5,text:"商城购物"},{value:6,text:"兑换礼品"}],i=[{value:-1,text:"全部"},{value:0,text:"商城商品"},{value:1,text:"票务商品"},{value:2,text:"积分商品"},{value:3,text:"活动商品"}],o=[{value:-1,text:"全部"},{value:0,text:"商城订单"},{value:2,text:"兑换订单"},{value:1,text:"票务订单"}],n=[{text:"全部",value:-1},{text:"待付款",value:0},{text:"待发货",value:1},{text:"待收货",value:2},{text:"发起退款",value:4},{text:"交易完成",value:3,type:"success"},{text:"已退款",value:5,type:"danger"},{text:"订单关闭",value:6,type:"danger"}],c=[{value:-1,text:"全部"},{value:0,text:"满减券"},{value:1,text:"立减券"},{value:2,text:"折扣券"}],m=[{value:0,text:"非会员"},{value:1,text:"白银"},{value:2,text:"白金"},{value:3,text:"钻石"},{value:4,text:"黑金"}]}}]);