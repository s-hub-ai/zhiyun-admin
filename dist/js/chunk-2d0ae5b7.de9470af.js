(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ae5b7"],{"0a5e":function(e,s,t){"use strict";t.r(s);var l=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"conf-sms"},[t("el-form-item",{attrs:{label:"名称"}},[t("el-input",{attrs:{placeholder:"请填写名称"},model:{value:e.form.sms.smsSignName,callback:function(s){e.$set(e.form.sms,"smsSignName",s)},expression:"form.sms.smsSignName"}})],1),t("el-form-item",{attrs:{label:"key"}},[t("el-input",{attrs:{placeholder:"key"},model:{value:e.form.sms.smsAccessKeyId,callback:function(s){e.$set(e.form.sms,"smsAccessKeyId",s)},expression:"form.sms.smsAccessKeyId"}})],1),t("el-form-item",{attrs:{label:"secret"}},[t("el-input",{attrs:{placeholder:"secret"},model:{value:e.form.sms.smsAccessSecret,callback:function(s){e.$set(e.form.sms,"smsAccessSecret",s)},expression:"form.sms.smsAccessSecret"}})],1),t("el-row",{attrs:{type:"flex",gutter:10}},[t("el-col",{attrs:{span:12}},[t("el-form-item",{attrs:{label:"模板ID"}},[t("el-input",{attrs:{placeholder:"code"},model:{value:e.form.sms.smsVerifyTemplate.code,callback:function(s){e.$set(e.form.sms.smsVerifyTemplate,"code",s)},expression:"form.sms.smsVerifyTemplate.code"}})],1)],1),t("el-col",{attrs:{span:12}},[t("el-form-item",{attrs:{label:"模板内容"}},[t("el-input",{attrs:{placeholder:"template"},model:{value:e.form.sms.smsVerifyTemplate.template,callback:function(s){e.$set(e.form.sms.smsVerifyTemplate,"template",s)},expression:"form.sms.smsVerifyTemplate.template"}})],1)],1)],1)],1)},m=[],r={inject:["form"]},a=r,o=t("2877"),c=Object(o["a"])(a,l,m,!1,null,null,null);s["default"]=c.exports}}]);