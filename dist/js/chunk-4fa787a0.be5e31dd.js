(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4fa787a0"],{"631f":function(e,r,t){"use strict";var a=t("b167"),n=t.n(a);n.a},b167:function(e,r,t){},d7c7:function(e,r,t){"use strict";t.r(r);var a=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[t("div",{staticStyle:{"max-width":"500px"}},[t("el-form-item",{attrs:{label:"球迷会名称",prop:"fanClubName"}},[t("el-input",{attrs:{placeholder:"请输入球迷会的名称"},model:{value:e.ruleForm.fanClubName,callback:function(r){e.$set(e.ruleForm,"fanClubName",r)},expression:"ruleForm.fanClubName"}})],1),t("el-form-item",{staticClass:"form-item",attrs:{prop:"fanClubRegion",label:"区域"}},[t("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择"},model:{value:e.ruleForm.fanClubRegion,callback:function(r){e.$set(e.ruleForm,"fanClubRegion",r)},expression:"ruleForm.fanClubRegion"}},e._l(e.fanClubRegionList,(function(e){return t("el-option",{key:e.id,attrs:{label:e.regionName,value:e.id}})})),1)],1),t("el-form-item",{staticClass:"form-item",attrs:{label:"负责人",prop:"personLiable"}},[t("el-input",{attrs:{type:"text",placeholder:"请输入负责人姓名"},model:{value:e.ruleForm.personLiable,callback:function(r){e.$set(e.ruleForm,"personLiable",r)},expression:"ruleForm.personLiable"}})],1),t("el-form-item",{staticClass:"form-item",attrs:{label:"手机号",prop:"phoneNum"}},[t("el-input",{attrs:{type:"text",placeholder:"请输入负责人手机号",maxlength:"11"},model:{value:e.ruleForm.phoneNum,callback:function(r){e.$set(e.ruleForm,"phoneNum",r)},expression:"ruleForm.phoneNum"}})],1),t("el-form-item",{attrs:{label:"球迷会封面",prop:"fanClubCover"}},[t("cl-upload",{staticClass:"avatar-uploader",attrs:{multiple:"",limit:5,value:e.ruleForm.fanClubCover,size:[150,150],icon:"el-icon-plus",accept:"*","on-success":e.fanClubCoverUploadSuccess}})],1),t("el-form-item",{staticStyle:{"text-align":"center"}},[t("el-button",{attrs:{type:"primary"},on:{click:function(r){return e.submitForm("ruleForm")}}},[e._v("确定")]),t("el-button",{on:{click:function(r){return e.resetForm("ruleForm")}}},[e._v("重置")])],1)],1)])},n=[],l=t("5530"),o=(t("96cf"),t("1da1")),u={computed:{fanClubRegionList:function(){return this.$store.state.common.fanClubRegion}},data:function(){return{ruleForm:{fanClubName:"",fanClubRegion:"",personLiable:"",phoneNum:"",fanClubCover:""},rules:{fanClubName:[{required:!0,message:"请输入球迷会名称",trigger:"blur"}],fanClubRegion:[{required:!0,message:"请选择区域",trigger:"change"}],personLiable:[{required:!0,message:"请填写负责人",trigger:"blur"}],phoneNum:[{required:!0,message:"请填写负责人手机号",trigger:"blur"}],fanClubCover:[{required:!0,message:"请上传球迷会封面",trigger:"blur"}]}}},created:function(){},methods:{getEditInfo:function(e){var r=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,r.$service.app.fanClub.info({id:e});case 3:a=t.sent,r.ruleForm=a,t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](0),r.$message.error(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))()},fanClubCoverUploadSuccess:function(e){e&&(this.ruleForm.fanClubCover=e)},submitForm:function(e){var r=this;this.$refs[e].validate(function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t){e.next=13;break}return e.prev=1,a=Object(l["a"])({},r.ruleForm),e.next=5,r.$service.app.fanClub.add(a);case 5:r.$emit("update:addDialogShow",!1),e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](1),r.$message.error(e.t0);case 11:e.next=15;break;case 13:return console.log("error submit!!"),e.abrupt("return",!1);case 15:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(r){return e.apply(this,arguments)}}())},resetForm:function(e){this.$refs[e].resetFields()}}},s=u,i=(t("631f"),t("2877")),c=Object(i["a"])(s,a,n,!1,null,"20217f54",null);r["default"]=c.exports}}]);