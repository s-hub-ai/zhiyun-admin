(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d005ada4"],{"1db9":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[r("div",{staticStyle:{"max-width":"900px"}},[r("el-form-item",{attrs:{label:"客服二维码",prop:"qrCode"}},[r("cl-upload",{staticClass:"avatar-uploader",attrs:{value:e.ruleForm.qrCode,filePath:e.ruleForm.qrCode,size:[150,150],icon:"el-icon-plus",accept:"*","on-success":e.qrCodeUploadSuccess}}),r("span",{staticStyle:{color:"#909399"}},[e._v("注：限上传一张,建议图片大小150*150")])],1),r("el-form-item",{attrs:{label:"咨询文案",prop:"consultText"}},[r("el-input",{attrs:{type:"textarea",placeholder:"请输入内容",rows:6,maxlength:"800","show-word-limit":""},model:{value:e.ruleForm.consultText,callback:function(t){e.$set(e.ruleForm,"consultText",t)},expression:"ruleForm.consultText"}})],1),r("el-form-item",{attrs:{label:"状态"}},[r("el-switch",{attrs:{size:"large","active-text":"启用","inactive-text":"停用","active-value":1,"inactive-value":0,"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.ruleForm.enableStatus,callback:function(t){e.$set(e.ruleForm,"enableStatus",t)},expression:"ruleForm.enableStatus"}})],1),r("el-form-item",{staticStyle:{"text-align":"center"}},[r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("保存")]),r("el-button",{on:{click:function(t){return e.resetForm("ruleForm")}}},[e._v("重置")])],1)],1)])},n=[],o=r("5530"),l=(r("96cf"),r("1da1")),s={data:function(){return{ruleForm:{qrCode:"",cusultText:"",enableStatus:0},rules:{qrCode:[{required:!0,message:"请上传客服二维码",trigger:"blur"}],cusultText:[{required:!0,message:"请输入咨询文案",trigger:"blur"}]}}},methods:{qrCodeUploadSuccess:function(e){e&&(this.ruleForm.qrCode=e)},getEditInfo:function(e){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function r(){var a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,t.$service.app.consult.info({id:e});case 3:a=r.sent,t.ruleForm=a,r.next=10;break;case 7:r.prev=7,r.t0=r["catch"](0),t.$message.error(r.t0);case 10:case"end":return r.stop()}}),r,null,[[0,7]])})))()},submitForm:function(e){var t=this;this.$refs[e].validate(function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(r){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=13;break}return e.prev=1,a=Object(o["a"])({},t.ruleForm),e.next=5,t.$service.app.consult.add(a);case 5:t.$emit("update:addDialogShow",!1),e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](1),t.$message.error(e.t0);case 11:e.next=15;break;case 13:return console.log("error submit!!"),e.abrupt("return",!1);case 15:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}())},resetForm:function(e){this.$refs[e].resetFields()}}},u=s,c=(r("8b56"),r("2877")),i=Object(c["a"])(u,a,n,!1,null,"71dfe9d9",null);t["default"]=i.exports},"8b56":function(e,t,r){"use strict";var a=r("fb42"),n=r.n(a);n.a},fb42:function(e,t,r){}}]);