(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5f220080","chunk-7d667b63","chunk-2d2106b7","chunk-2d208a5c","chunk-2d0daf07","chunk-2d0a4b7f","chunk-2d0ae5b7","chunk-2d21f4b9","chunk-2d20f537"],{"0845":function(e,s,t){"use strict";t.r(s);var a=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"conf-oss"},[t("el-form-item",{attrs:{label:"AccessKeyId"}},[t("el-input",{attrs:{placeholder:"AccessKeyId"},model:{value:e.form.oss.ossAccessKeyId,callback:function(s){e.$set(e.form.oss,"ossAccessKeyId",s)},expression:"form.oss.ossAccessKeyId"}})],1),t("el-form-item",{attrs:{label:"AccessKeySecret"}},[t("el-input",{attrs:{placeholder:"AccessKeySecret"},model:{value:e.form.oss.ossAccessKeySecret,callback:function(s){e.$set(e.form.oss,"ossAccessKeySecret",s)},expression:"form.oss.ossAccessKeySecret"}})],1),t("el-form-item",{attrs:{label:"Bucket"}},[t("el-input",{attrs:{placeholder:"Bucket"},model:{value:e.form.oss.ossBucket,callback:function(s){e.$set(e.form.oss,"ossBucket",s)},expression:"form.oss.ossBucket"}})],1),t("el-form-item",{attrs:{label:"Endpoint"}},[t("el-input",{attrs:{placeholder:"Endpoint"},model:{value:e.form.oss.ossEndpoint,callback:function(s){e.$set(e.form.oss,"ossEndpoint",s)},expression:"form.oss.ossEndpoint"}})],1),t("el-form-item",{attrs:{label:"Timeout"}},[t("el-input",{attrs:{placeholder:"Timeout"},model:{value:e.form.oss.ossTimeout,callback:function(s){e.$set(e.form.oss,"ossTimeout",s)},expression:"form.oss.ossTimeout"}})],1)],1)},l=[],r={inject:["form"]},o=r,i=t("2877"),c=Object(i["a"])(o,a,l,!1,null,null,null);s["default"]=c.exports},"0a5e":function(e,s,t){"use strict";t.r(s);var a=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"conf-sms"},[t("el-form-item",{attrs:{label:"名称"}},[t("el-input",{attrs:{placeholder:"请填写名称"},model:{value:e.form.sms.smsSignName,callback:function(s){e.$set(e.form.sms,"smsSignName",s)},expression:"form.sms.smsSignName"}})],1),t("el-form-item",{attrs:{label:"key"}},[t("el-input",{attrs:{placeholder:"key"},model:{value:e.form.sms.smsAccessKeyId,callback:function(s){e.$set(e.form.sms,"smsAccessKeyId",s)},expression:"form.sms.smsAccessKeyId"}})],1),t("el-form-item",{attrs:{label:"secret"}},[t("el-input",{attrs:{placeholder:"secret"},model:{value:e.form.sms.smsAccessSecret,callback:function(s){e.$set(e.form.sms,"smsAccessSecret",s)},expression:"form.sms.smsAccessSecret"}})],1),t("el-row",{attrs:{type:"flex",gutter:10}},[t("el-col",{attrs:{span:12}},[t("el-form-item",{attrs:{label:"模板ID"}},[t("el-input",{attrs:{placeholder:"code"},model:{value:e.form.sms.smsVerifyTemplate.code,callback:function(s){e.$set(e.form.sms.smsVerifyTemplate,"code",s)},expression:"form.sms.smsVerifyTemplate.code"}})],1)],1),t("el-col",{attrs:{span:12}},[t("el-form-item",{attrs:{label:"模板内容"}},[t("el-input",{attrs:{placeholder:"template"},model:{value:e.form.sms.smsVerifyTemplate.template,callback:function(s){e.$set(e.form.sms.smsVerifyTemplate,"template",s)},expression:"form.sms.smsVerifyTemplate.template"}})],1)],1)],1)],1)},l=[],r={inject:["form"]},o=r,i=t("2877"),c=Object(i["a"])(o,a,l,!1,null,null,null);s["default"]=c.exports},"44dd":function(e,s,t){"use strict";t.r(s);var a=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"system-conf"},[t("el-form",{attrs:{size:"mini","label-width":"150px"}},[t("el-tabs",{attrs:{type:"card"}},e._l(e.list,(function(e,s){return t("el-tab-pane",{key:s,attrs:{label:e.label}},[t(e.name,{tag:"component"})],1)})),1),t("el-row",{staticClass:"footer",attrs:{type:"flex"}},[t("el-button",{attrs:{size:"mini",type:"primary",loading:e.loading},on:{click:e.save}},[e._v("保存")]),t("el-button",{attrs:{size:"mini"},on:{click:e.reset}},[e._v("重置")])],1)],1)],1)},l=[],r=t("be39"),o=t("a64e"),i=t("0a5e"),c=t("b2c4"),n=t("d8e4"),p=t("b88c"),m=t("0845"),f=t("6e79"),d={components:{ConfParams:r["default"],Logistics:o["default"],Sms:i["default"],Wechat:c["default"],WechatPay:n["default"],AliPay:p["default"],Oss:m["default"],Order:f["default"]},provide:function(){return{form:this.conf}},data:function(){return{list:[{name:"logistics",label:"物流配置"},{name:"sms",label:"短信配置"},{name:"wechat",label:"微信配置"},{name:"wechat-pay",label:"微信支付配置"},{name:"ali-pay",label:"支付宝支付配置"},{name:"oss",label:"OSS配置"},{name:"order",label:"订单配置"}],conf:{wxOpen:{wxOpenAccess:{appid:"",secret:""}},wxMini:{wxMiniAccess:{appid:"",secret:""}},wxMp:{wxMpAccess:{appid:"",secret:""}},logistics:{logisticsAppCode:""},aliPay:{payAli:{appId:"",notifyUrl:"",sandbox:!1,sinType:"RSA2"},payAliPrivate:"",payAliPublic:""},wxPay:{payWx:{mchid:"",partnerKey:"",notify_url:""}},order:{orderClose:"1",orderConfirm:"15"},oss:{ossAccessKeyId:"",ossAccessKeySecret:"",ossBucket:"",ossEndpoint:"",ossTimeout:""},sms:{smsSignName:"",smsAccessKeyId:"",smsAccessSecret:"",smsVerifyTemplate:{code:"",template:""}}},loading:!1}},created:function(){var e=this;this.$service.system.conf.all().then((function(s){try{s.wxPay.payWx=JSON.parse(s.wxPay.payWx),s.aliPay.payAli=JSON.parse(s.aliPay.payAli),s.wxMini.wxMiniAccess=JSON.parse(s.wxMini.wxMiniAccess),s.wxMp.wxMpAccess=JSON.parse(s.wxMp.wxMpAccess),s.wxOpen.wxOpenAccess=JSON.parse(s.wxOpen.wxOpenAccess),s.sms.smsVerifyTemplate=JSON.parse(s.sms.smsVerifyTemplate),s.sms.smsVerifyTemplate.template=JSON.stringify(s.sms.smsVerifyTemplate.template)}catch(t){console.error(t)}Object.assign(e.conf,s)}))},methods:{save:function(){var e=this;this.loading=!0;var s=_.cloneDeep(this.conf);s.wxPay.payWx=JSON.stringify(s.wxPay.payWx),s.aliPay.payAli=JSON.stringify(s.aliPay.payAli),s.wxMini.wxMiniAccess=JSON.stringify(s.wxMini.wxMiniAccess),s.wxMp.wxMpAccess=JSON.stringify(s.wxMp.wxMpAccess),s.wxOpen.wxOpenAccess=JSON.stringify(s.wxOpen.wxOpenAccess);try{s.sms.smsVerifyTemplate.template=JSON.parse(s.sms.smsVerifyTemplate.template)}catch(t){s.sms.smsVerifyTemplate.template={code:"验证码"}}s.sms.smsVerifyTemplate=JSON.stringify(s.sms.smsVerifyTemplate),this.$service.system.conf.save(s).then((function(){e.$message.success("保存成功")}))["catch"]((function(s){e.$message.error(s)})).done((function(){e.loading=!1}))},reset:function(){Object.assign(this.conf,{wxOpen:{wxOpenAccess:{appid:"",secret:""}},wxMini:{wxMiniAccess:{appid:"",secret:""}},wxMp:{wxMpAccess:{appid:"",secret:""}},logistics:{logisticsAppCode:""},aliPay:{payAli:{appId:"",notifyUrl:"",sandbox:!1,sinType:"RSA2"},payAliPrivate:"",payAliPublic:""},wxPay:{payWx:{mchid:"",partnerKey:"",notify_url:""}},order:{orderClose:"1",orderConfirm:"15"},oss:{ossAccessKeyId:"",ossAccessKeySecret:"",ossBucket:"",ossEndpoint:"",ossTimeout:""},sms:{smsSignName:"",smsAccessKeyId:"",smsAccessSecret:"",smsVerifyTemplate:{code:"",template:""}}})}}},u=d,y=(t("660e"),t("2877")),x=Object(y["a"])(u,a,l,!1,null,"6464b258",null);s["default"]=x.exports},"660e":function(e,s,t){"use strict";var a=t("8c80"),l=t.n(a);l.a},"6e79":function(e,s,t){"use strict";t.r(s);var a=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"conf-order"},[t("el-form-item",{attrs:{label:"确认时间（天）"}},[t("el-input-number",{attrs:{min:1,max:30},model:{value:e.form.order.orderConfirm,callback:function(s){e.$set(e.form.order,"orderConfirm",s)},expression:"form.order.orderConfirm"}})],1),t("el-form-item",{attrs:{label:"关闭时间（天）"}},[t("el-input-number",{attrs:{min:1,max:30},model:{value:e.form.order.orderClose,callback:function(s){e.$set(e.form.order,"orderClose",s)},expression:"form.order.orderClose"}})],1)],1)},l=[],r={inject:["form"]},o=r,i=t("2877"),c=Object(i["a"])(o,a,l,!1,null,null,null);s["default"]=c.exports},"8c80":function(e,s,t){},a14f:function(e,s,t){},a64e:function(e,s,t){"use strict";t.r(s);var a=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"conf-logistics"},[t("el-form-item",{attrs:{label:"appcode"}},[t("el-input",{attrs:{placeholder:"appcode"},model:{value:e.form.logistics.logisticsAppCode,callback:function(s){e.$set(e.form.logistics,"logisticsAppCode",s)},expression:"form.logistics.logisticsAppCode"}})],1)],1)},l=[],r={inject:["form"]},o=r,i=t("2877"),c=Object(i["a"])(o,a,l,!1,null,null,null);s["default"]=c.exports},b2c4:function(e,s,t){"use strict";t.r(s);var a=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"conf-wechat"},[t("el-form-item",{attrs:{label:"开放平台"}},[t("el-row",{attrs:{type:"flex",gutter:10}},[t("el-col",{attrs:{span:12}},[t("el-input",{attrs:{placeholder:"appid"},model:{value:e.form.wxOpen.wxOpenAccess.appid,callback:function(s){e.$set(e.form.wxOpen.wxOpenAccess,"appid",s)},expression:"form.wxOpen.wxOpenAccess.appid"}})],1),t("el-col",{attrs:{span:12}},[t("el-input",{attrs:{placeholder:"appsecret"},model:{value:e.form.wxOpen.wxOpenAccess.secret,callback:function(s){e.$set(e.form.wxOpen.wxOpenAccess,"secret",s)},expression:"form.wxOpen.wxOpenAccess.secret"}})],1)],1)],1),t("el-form-item",{attrs:{label:"小程序"}},[t("el-row",{attrs:{type:"flex",gutter:10}},[t("el-col",{attrs:{span:12}},[t("el-input",{attrs:{placeholder:"appid"},model:{value:e.form.wxMini.wxMiniAccess.appid,callback:function(s){e.$set(e.form.wxMini.wxMiniAccess,"appid",s)},expression:"form.wxMini.wxMiniAccess.appid"}})],1),t("el-col",{attrs:{span:12}},[t("el-input",{attrs:{placeholder:"appsecret"},model:{value:e.form.wxMini.wxMiniAccess.secret,callback:function(s){e.$set(e.form.wxMini.wxMiniAccess,"secret",s)},expression:"form.wxMini.wxMiniAccess.secret"}})],1)],1)],1),t("el-form-item",{attrs:{label:"公众号"}},[t("el-row",{attrs:{type:"flex",gutter:10}},[t("el-col",{attrs:{span:12}},[t("el-input",{attrs:{placeholder:"appid"},model:{value:e.form.wxMp.wxMpAccess.appid,callback:function(s){e.$set(e.form.wxMp.wxMpAccess,"appid",s)},expression:"form.wxMp.wxMpAccess.appid"}})],1),t("el-col",{attrs:{span:12}},[t("el-input",{attrs:{placeholder:"appsecret"},model:{value:e.form.wxMp.wxMpAccess.secret,callback:function(s){e.$set(e.form.wxMp.wxMpAccess,"secret",s)},expression:"form.wxMp.wxMpAccess.secret"}})],1)],1)],1)],1)},l=[],r={inject:["form"]},o=r,i=t("2877"),c=Object(i["a"])(o,a,l,!1,null,null,null);s["default"]=c.exports},b88c:function(e,s,t){"use strict";t.r(s);var a=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"conf-ali-pay"},[t("el-row",{attrs:{gutter:10}},[t("el-col",{attrs:{span:12}},[t("el-form-item",{attrs:{label:"appId"}},[t("el-input",{attrs:{placeholder:"appId"},model:{value:e.form.aliPay.payAli.appId,callback:function(s){e.$set(e.form.aliPay.payAli,"appId",s)},expression:"form.aliPay.payAli.appId"}})],1)],1),t("el-col",{attrs:{span:12}},[t("el-form-item",{attrs:{label:"notifyUrl"}},[t("el-input",{attrs:{placeholder:"notifyUrl"},model:{value:e.form.aliPay.payAli.notifyUrl,callback:function(s){e.$set(e.form.aliPay.payAli,"notifyUrl",s)},expression:"form.aliPay.payAli.notifyUrl"}})],1)],1),t("el-col",{attrs:{span:12}},[t("el-form-item",{attrs:{label:"sandbox"}},[t("el-switch",{model:{value:e.form.aliPay.payAli.sandbox,callback:function(s){e.$set(e.form.aliPay.payAli,"sandbox",s)},expression:"form.aliPay.payAli.sandbox"}})],1)],1),t("el-col",{attrs:{span:12}},[t("el-form-item",{attrs:{label:"sinType"}},[t("el-select",{model:{value:e.form.aliPay.payAli.sinType,callback:function(s){e.$set(e.form.aliPay.payAli,"sinType",s)},expression:"form.aliPay.payAli.sinType"}},[t("el-option",{attrs:{value:"RSA2",label:"RSA2"}}),t("el-option",{attrs:{value:"RSA",label:"RSA"}})],1)],1)],1)],1),t("el-form-item",{attrs:{label:"private key"}},[t("el-input",{attrs:{placeholder:"PRIVATE KEY",type:"textarea",rows:"5"},model:{value:e.form.aliPay.payAliPrivate,callback:function(s){e.$set(e.form.aliPay,"payAliPrivate",s)},expression:"form.aliPay.payAliPrivate"}})],1),t("el-form-item",{attrs:{label:"public key"}},[t("el-input",{attrs:{placeholder:"PUBLIC KEY",type:"textarea",rows:"5"},model:{value:e.form.aliPay.payAliPublic,callback:function(s){e.$set(e.form.aliPay,"payAliPublic",s)},expression:"form.aliPay.payAliPublic"}})],1)],1)},l=[],r={inject:["form"]},o=r,i=t("2877"),c=Object(i["a"])(o,a,l,!1,null,null,null);s["default"]=c.exports},be39:function(e,s,t){"use strict";t.r(s);var a=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"conf-params"},[t("div",{staticClass:"container"},[t("el-form",{attrs:{size:"mini","label-width":"150px"}},[t("el-divider",{attrs:{"content-position":"left"}},[e._v("物流配置")]),t("el-form-item",{attrs:{label:"appcode"}},[t("el-input",{attrs:{placeholder:"appcode"},model:{value:e.form.logistics.logisticsAppCode,callback:function(s){e.$set(e.form.logistics,"logisticsAppCode",s)},expression:"form.logistics.logisticsAppCode"}})],1),t("el-divider",{attrs:{"content-position":"left"}},[e._v("短信配置")]),t("el-form-item",{attrs:{label:"名称"}},[t("el-input",{attrs:{placeholder:"请填写名称"},model:{value:e.form.sms.smsSignName,callback:function(s){e.$set(e.form.sms,"smsSignName",s)},expression:"form.sms.smsSignName"}})],1),t("el-form-item",{attrs:{label:"key"}},[t("el-input",{attrs:{placeholder:"key"},model:{value:e.form.sms.smsAccessKeyId,callback:function(s){e.$set(e.form.sms,"smsAccessKeyId",s)},expression:"form.sms.smsAccessKeyId"}})],1),t("el-form-item",{attrs:{label:"secret"}},[t("el-input",{attrs:{placeholder:"secret"},model:{value:e.form.sms.smsAccessSecret,callback:function(s){e.$set(e.form.sms,"smsAccessSecret",s)},expression:"form.sms.smsAccessSecret"}})],1),t("el-row",{attrs:{type:"flex",gutter:10}},[t("el-col",{attrs:{span:12}},[t("el-form-item",{attrs:{label:"模板ID"}},[t("el-input",{attrs:{placeholder:"code"},model:{value:e.form.sms.smsVerifyTemplate.code,callback:function(s){e.$set(e.form.sms.smsVerifyTemplate,"code",s)},expression:"form.sms.smsVerifyTemplate.code"}})],1)],1),t("el-col",{attrs:{span:12}},[t("el-form-item",{attrs:{label:"模板内容"}},[t("el-input",{attrs:{placeholder:"template"},model:{value:e.form.sms.smsVerifyTemplate.template,callback:function(s){e.$set(e.form.sms.smsVerifyTemplate,"template",s)},expression:"form.sms.smsVerifyTemplate.template"}})],1)],1)],1),t("el-divider",{attrs:{"content-position":"left"}},[e._v("微信配置")]),t("el-form-item",{attrs:{label:"开放平台"}},[t("el-row",{attrs:{type:"flex",gutter:10}},[t("el-col",{attrs:{span:12}},[t("el-input",{attrs:{placeholder:"appid"},model:{value:e.form.wxOpen.wxOpenAccess.appid,callback:function(s){e.$set(e.form.wxOpen.wxOpenAccess,"appid",s)},expression:"form.wxOpen.wxOpenAccess.appid"}})],1),t("el-col",{attrs:{span:12}},[t("el-input",{attrs:{placeholder:"appsecret"},model:{value:e.form.wxOpen.wxOpenAccess.secret,callback:function(s){e.$set(e.form.wxOpen.wxOpenAccess,"secret",s)},expression:"form.wxOpen.wxOpenAccess.secret"}})],1)],1)],1),t("el-form-item",{attrs:{label:"小程序"}},[t("el-row",{attrs:{type:"flex",gutter:10}},[t("el-col",{attrs:{span:12}},[t("el-input",{attrs:{placeholder:"appid"},model:{value:e.form.wxMini.wxMiniAccess.appid,callback:function(s){e.$set(e.form.wxMini.wxMiniAccess,"appid",s)},expression:"form.wxMini.wxMiniAccess.appid"}})],1),t("el-col",{attrs:{span:12}},[t("el-input",{attrs:{placeholder:"appsecret"},model:{value:e.form.wxMini.wxMiniAccess.secret,callback:function(s){e.$set(e.form.wxMini.wxMiniAccess,"secret",s)},expression:"form.wxMini.wxMiniAccess.secret"}})],1)],1)],1),t("el-form-item",{attrs:{label:"公众号"}},[t("el-row",{attrs:{type:"flex",gutter:10}},[t("el-col",{attrs:{span:12}},[t("el-input",{attrs:{placeholder:"appid"},model:{value:e.form.wxMp.wxMpAccess.appid,callback:function(s){e.$set(e.form.wxMp.wxMpAccess,"appid",s)},expression:"form.wxMp.wxMpAccess.appid"}})],1),t("el-col",{attrs:{span:12}},[t("el-input",{attrs:{placeholder:"appsecret"},model:{value:e.form.wxMp.wxMpAccess.secret,callback:function(s){e.$set(e.form.wxMp.wxMpAccess,"secret",s)},expression:"form.wxMp.wxMpAccess.secret"}})],1)],1)],1),t("el-divider",{attrs:{"content-position":"left"}},[e._v("微信支付配置")]),t("el-form-item",{attrs:{label:"商务号"}},[t("el-input",{attrs:{placeholder:"mchid"},model:{value:e.form.wxPay.payWx.mchid,callback:function(s){e.$set(e.form.wxPay.payWx,"mchid",s)},expression:"form.wxPay.payWx.mchid"}})],1),t("el-form-item",{attrs:{label:"密钥"}},[t("el-input",{attrs:{placeholder:"partnerKey"},model:{value:e.form.wxPay.payWx.partnerKey,callback:function(s){e.$set(e.form.wxPay.payWx,"partnerKey",s)},expression:"form.wxPay.payWx.partnerKey"}})],1),t("el-form-item",{attrs:{label:"回调地址"}},[t("el-input",{attrs:{placeholder:"notify_url"},model:{value:e.form.wxPay.payWx.notify_url,callback:function(s){e.$set(e.form.wxPay.payWx,"notify_url",s)},expression:"form.wxPay.payWx.notify_url"}})],1),t("el-divider",{attrs:{"content-position":"left"}},[e._v("支付宝支付配置")]),t("el-row",{attrs:{gutter:10}},[t("el-col",{attrs:{span:12}},[t("el-form-item",{attrs:{label:"appId"}},[t("el-input",{attrs:{placeholder:"appId"},model:{value:e.form.aliPay.payAli.appId,callback:function(s){e.$set(e.form.aliPay.payAli,"appId",s)},expression:"form.aliPay.payAli.appId"}})],1)],1),t("el-col",{attrs:{span:12}},[t("el-form-item",{attrs:{label:"notifyUrl"}},[t("el-input",{attrs:{placeholder:"notifyUrl"},model:{value:e.form.aliPay.payAli.notifyUrl,callback:function(s){e.$set(e.form.aliPay.payAli,"notifyUrl",s)},expression:"form.aliPay.payAli.notifyUrl"}})],1)],1),t("el-col",{attrs:{span:12}},[t("el-form-item",{attrs:{label:"sandbox"}},[t("el-switch",{model:{value:e.form.aliPay.payAli.sandbox,callback:function(s){e.$set(e.form.aliPay.payAli,"sandbox",s)},expression:"form.aliPay.payAli.sandbox"}})],1)],1),t("el-col",{attrs:{span:12}},[t("el-form-item",{attrs:{label:"sinType"}},[t("el-select",{model:{value:e.form.aliPay.payAli.sinType,callback:function(s){e.$set(e.form.aliPay.payAli,"sinType",s)},expression:"form.aliPay.payAli.sinType"}},[t("el-option",{attrs:{value:"RSA2",label:"RSA2"}}),t("el-option",{attrs:{value:"RSA",label:"RSA"}})],1)],1)],1)],1),t("el-form-item",{attrs:{label:"private key"}},[t("el-input",{attrs:{placeholder:"PRIVATE KEY",type:"textarea",rows:"5"},model:{value:e.form.aliPay.payAliPrivate,callback:function(s){e.$set(e.form.aliPay,"payAliPrivate",s)},expression:"form.aliPay.payAliPrivate"}})],1),t("el-form-item",{attrs:{label:"public key"}},[t("el-input",{attrs:{placeholder:"PUBLIC KEY",type:"textarea",rows:"5"},model:{value:e.form.aliPay.payAliPublic,callback:function(s){e.$set(e.form.aliPay,"payAliPublic",s)},expression:"form.aliPay.payAliPublic"}})],1),t("el-divider",{attrs:{"content-position":"left"}},[e._v("OSS")]),t("el-form-item",{attrs:{label:"AccessKeyId"}},[t("el-input",{attrs:{placeholder:"AccessKeyId"},model:{value:e.form.oss.ossAccessKeyId,callback:function(s){e.$set(e.form.oss,"ossAccessKeyId",s)},expression:"form.oss.ossAccessKeyId"}})],1),t("el-form-item",{attrs:{label:"AccessKeySecret"}},[t("el-input",{attrs:{placeholder:"AccessKeySecret"},model:{value:e.form.oss.ossAccessKeySecret,callback:function(s){e.$set(e.form.oss,"ossAccessKeySecret",s)},expression:"form.oss.ossAccessKeySecret"}})],1),t("el-form-item",{attrs:{label:"Bucket"}},[t("el-input",{attrs:{placeholder:"Bucket"},model:{value:e.form.oss.ossBucket,callback:function(s){e.$set(e.form.oss,"ossBucket",s)},expression:"form.oss.ossBucket"}})],1),t("el-form-item",{attrs:{label:"Endpoint"}},[t("el-input",{attrs:{placeholder:"Endpoint"},model:{value:e.form.oss.ossEndpoint,callback:function(s){e.$set(e.form.oss,"ossEndpoint",s)},expression:"form.oss.ossEndpoint"}})],1),t("el-form-item",{attrs:{label:"Timeout"}},[t("el-input",{attrs:{placeholder:"Timeout"},model:{value:e.form.oss.ossTimeout,callback:function(s){e.$set(e.form.oss,"ossTimeout",s)},expression:"form.oss.ossTimeout"}})],1),t("el-divider",{attrs:{"content-position":"left"}},[e._v("订单配置")]),t("el-form-item",{attrs:{label:"确认时间（天）"}},[t("el-input-number",{attrs:{min:1,max:30},model:{value:e.form.order.orderConfirm,callback:function(s){e.$set(e.form.order,"orderConfirm",s)},expression:"form.order.orderConfirm"}})],1),t("el-form-item",{attrs:{label:"关闭时间（天）"}},[t("el-input-number",{attrs:{min:1,max:30},model:{value:e.form.order.orderClose,callback:function(s){e.$set(e.form.order,"orderClose",s)},expression:"form.order.orderClose"}})],1)],1)],1),t("el-row",{staticClass:"footer",attrs:{type:"flex"}},[t("el-button",{attrs:{size:"mini",type:"primary",loading:e.loading},on:{click:e.save}},[e._v("保存")]),t("el-button",{attrs:{size:"mini"},on:{click:e.reset}},[e._v("重置")])],1)],1)},l=[],r=t("2ef0"),o=t.n(r),i={data:function(){return{loading:!1,form:{wxOpen:{wxOpenAccess:{appid:"",secret:""}},wxMini:{wxMiniAccess:{appid:"",secret:""}},wxMp:{wxMpAccess:{appid:"",secret:""}},logistics:{logisticsAppCode:""},aliPay:{payAli:{appId:"",notifyUrl:"",sandbox:!1,sinType:"RSA2"},payAliPrivate:"",payAliPublic:""},wxPay:{payWx:{mchid:"",partnerKey:"",notify_url:""}},order:{orderClose:"1",orderConfirm:"15"},oss:{ossAccessKeyId:"",ossAccessKeySecret:"",ossBucket:"",ossEndpoint:"",ossTimeout:""},sms:{smsSignName:"",smsAccessKeyId:"",smsAccessSecret:"",smsVerifyTemplate:{code:"",template:""}}}}},created:function(){var e=this;this.$service.system.conf.all().then((function(s){try{s.wxPay.payWx=JSON.parse(s.wxPay.payWx),s.aliPay.payAli=JSON.parse(s.aliPay.payAli),s.wxMini.wxMiniAccess=JSON.parse(s.wxMini.wxMiniAccess),s.wxMp.wxMpAccess=JSON.parse(s.wxMp.wxMpAccess),s.wxOpen.wxOpenAccess=JSON.parse(s.wxOpen.wxOpenAccess),s.sms.smsVerifyTemplate=JSON.parse(s.sms.smsVerifyTemplate),s.sms.smsVerifyTemplate.template=JSON.stringify(s.sms.smsVerifyTemplate.template)}catch(t){console.error(t)}e.form=s}))},methods:{save:function(){var e=this;this.loading=!0;var s=o.a.cloneDeep(this.form);s.wxPay.payWx=JSON.stringify(s.wxPay.payWx),s.aliPay.payAli=JSON.stringify(s.aliPay.payAli),s.wxMini.wxMiniAccess=JSON.stringify(s.wxMini.wxMiniAccess),s.wxMp.wxMpAccess=JSON.stringify(s.wxMp.wxMpAccess),s.wxOpen.wxOpenAccess=JSON.stringify(s.wxOpen.wxOpenAccess);try{s.sms.smsVerifyTemplate.template=JSON.parse(s.sms.smsVerifyTemplate.template)}catch(t){s.sms.smsVerifyTemplate.template={code:"验证码"}}s.sms.smsVerifyTemplate=JSON.stringify(s.sms.smsVerifyTemplate),this.$service.system.conf.save(s).then((function(){e.$message.success("保存成功")}))["catch"]((function(s){e.$message.error(s)})).done((function(){e.loading=!1}))},reset:function(){this.form={wxOpen:{appid:"",secret:""},wxMini:{appid:"",secret:""},wxMp:{appid:"",secret:""},logistics:{logisticsAppCode:""},aliPay:{payAli:{appId:"",notifyUrl:"",sandbox:!1,sinType:"RSA2"},payAliPrivate:"",payAliPublic:""},pay:{payWx:"{}"},order:{orderClose:"1",orderConfirm:"15"},oss:{ossAccessKeyId:"",ossAccessKeySecret:"",ossBucket:"",ossEndpoint:"",ossTimeout:""},sms:{smsSignName:"",smsAccessKeyId:"",smsAccessSecret:"",smsVerifyTemplate:{code:"",template:""}}}}}},c=i,n=(t("cd20"),t("2877")),p=Object(n["a"])(c,a,l,!1,null,"070fbf64",null);s["default"]=p.exports},cd20:function(e,s,t){"use strict";var a=t("a14f"),l=t.n(a);l.a},d8e4:function(e,s,t){"use strict";t.r(s);var a=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"conf-wechat"},[t("el-form-item",{attrs:{label:"商务号"}},[t("el-input",{attrs:{placeholder:"mchid"},model:{value:e.form.wxPay.payWx.mchid,callback:function(s){e.$set(e.form.wxPay.payWx,"mchid",s)},expression:"form.wxPay.payWx.mchid"}})],1),t("el-form-item",{attrs:{label:"密钥"}},[t("el-input",{attrs:{placeholder:"partnerKey"},model:{value:e.form.wxPay.payWx.partnerKey,callback:function(s){e.$set(e.form.wxPay.payWx,"partnerKey",s)},expression:"form.wxPay.payWx.partnerKey"}})],1),t("el-form-item",{attrs:{label:"回调地址"}},[t("el-input",{attrs:{placeholder:"notify_url"},model:{value:e.form.wxPay.payWx.notify_url,callback:function(s){e.$set(e.form.wxPay.payWx,"notify_url",s)},expression:"form.wxPay.payWx.notify_url"}})],1)],1)},l=[],r={inject:["form"]},o=r,i=t("2877"),c=Object(i["a"])(o,a,l,!1,null,null,null);s["default"]=c.exports}}]);