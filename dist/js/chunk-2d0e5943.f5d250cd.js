(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e5943"],{"94a3":function(e,t,r){"use strict";r.r(t);var i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("cl-crud",{on:{load:e.onLoad}},[r("el-row",{attrs:{type:"flex",align:"middle"}},[r("cl-refresh-btn"),r("cl-search-key",{attrs:{placeholder:"请输入用户姓名、手机号"}}),r("cl-flex1"),r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.openForm}},[e._v("导出")])],1),r("el-row",[r("cl-table",{attrs:{columns:e.tableColumn},scopedSlots:e._u([{key:"column-userCertificateValidity",fn:function(t){var i=t.scope;return[r("span",[e._v(e._s(i.row.userCertificateValidityStart)+"至"+e._s(i.row.userCertificateValidityEnd))])]}},{key:"column-userCertificatePositiveImg",fn:function(t){var i=t.scope;return[r("el-image",{staticStyle:{width:"79px",height:"50px"},attrs:{src:e._f("default_avatar")(i.row.userCertificatePositiveImg),"preview-src-list":[i.row.userCertificatePositiveImg]}})]}},{key:"column-userCertificateNegativeImg",fn:function(t){var i=t.scope;return[r("el-image",{staticStyle:{width:"79px",height:"50px"},attrs:{src:e._f("default_avatar")(i.row.userCertificateNegativeImg),"preview-src-list":[i.row.userCertificateNegativeImg]}})]}},{key:"column-userCertificatePortraitImg",fn:function(t){var i=t.scope;return[r("el-image",{staticStyle:{width:"79px",height:"50px"},attrs:{src:e._f("default_avatar")(i.row.userCertificatePortraitImg),"preview-src-list":[i.row.userCertificatePortraitImg]}})]}}])})],1),r("el-row",{attrs:{type:"flex"}},[r("cl-flex1"),r("cl-pagination")],1),r("cl-form",{ref:"form"})],1)},a=[],n=(r("d81d"),r("4795"),{computed:{fanClubList:function(){var e=this.$store.state.common.fanClub,t=e.map((function(e,t,r){var i={value:e.id,text:e.fanClubName};return i}));return t}},data:function(){var e=this;return{tableColumn:[{type:"index",label:"编号",align:"center",width:50},{label:"姓名",prop:"userName",align:"center"},{label:"球迷会",prop:"fanClubId",filters:[],align:"center",formatter:function(t){var r="-";return e.fanClubList.map((function(e){t.fanClubId==e.value&&(r=e.text)})),r},"filter-method":function(e,t,r){return console.log(e),console.log(t),t[r["property"]]==e}},{label:"手机号",prop:"phoneNum",align:"center",width:105},{label:"生日",prop:"userBirthday",align:"center"},{label:"性别",prop:"userSex",align:"center"},{label:"证件类型",prop:"userCertificateType",align:"center",formatter:function(e){if(1==e.userCertificateType)return"身份证"}},{label:"证件号码",prop:"userCertificateNum",align:"center"},{label:"有效期",prop:"userCertificateValidity",align:"center"},{label:"身份证住址",prop:"userCertificateAddress",align:"center"},{label:"身份证(反)",prop:"userCertificatePositiveImg",align:"center",width:100},{label:"身份证(正)",prop:"userCertificateNegativeImg",align:"center",width:100},{label:"人像照片",prop:"userCertificatePortraitImg",align:"center",width:100}]}},methods:{openForm:function(){var e=this;this.$refs["form"].open({props:{title:"自定义表单"},items:[{label:"姓名",prop:"name",value:"神仙都没用",component:{name:"el-input"},rules:{required:!0,message:"姓名不能为空"}}],on:{open:function(e,t){t.close,t.submit,t.done;console.log("cl-form 打开钩子",e)},close:function(e,t){console.log("cl-form 关闭钩子",e),t()},submit:function(t,r){var i=r.close;r.done,r.next;console.log("cl-form 提交钩子",t),setTimeout((function(){i(),e.$message.success("提交成功")}),1500)}}})},onLoad:function(e){var t=e.ctx,r=e.app;this.tableColumn[2].filters=this.fanClubList,console.log(this.fanClubList),t.service(this.$service.app.user.info).done(),r.refresh({userCertification:1})}}}),l=n,o=r("2877"),s=Object(o["a"])(l,i,a,!1,null,null,null);t["default"]=s.exports}}]);