(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-084d28e2","chunk-8a2ca2f4"],{7521:function(e,t,r){},"7c5b":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("cl-crud",{ref:"crud",on:{load:e.onLoad}},[r("el-row",{attrs:{type:"flex",align:"middle"}},[r("cl-search-key",{attrs:{placeholder:"请输入轮播图名称"}}),r("cl-flex1"),r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){e.addDialogTitle="新增轮播图",e.addDialogShow=!0}}},[e._v("新增轮播")])],1),r("el-row",[r("cl-table",{attrs:{columns:e.tableColumn},scopedSlots:e._u([{key:"column-bannerImg",fn:function(e){var t=e.scope;return[r("el-image",{staticStyle:{width:"175px",height:"75px"},attrs:{"preview-src-list":[t.row.bannerImg],src:t.row.bannerImg}})]}},{key:"column-enableStauts",fn:function(e){var t=e.scope;return[r("el-switch",{attrs:{value:t.row.enableStatus,"active-value":1,"inactive-value":0}})]}},{key:"column-sort",fn:function(t){var a=t.scope;return[r("el-input-number",{staticStyle:{width:"100px"},attrs:{size:"mini"},on:{change:function(t){return e.updateTableRow(a.row)}},model:{value:a.row.sort,callback:function(t){e.$set(a.row,"sort",t)},expression:"scope.row.sort"}})]}},{key:"column-op",fn:function(t){var a=t.scope;return[r("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(t){return e.editDialog(a.row.id)}}},[e._v("编辑")]),r("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(t){return e.deleteFn(a.row.id)}}},[e._v("删除")])]}}])})],1),r("el-row",{attrs:{type:"flex"}},[r("cl-flex1"),r("cl-pagination")],1),r("el-dialog",{attrs:{title:e.addDialogTitle,visible:e.addDialogShow,width:"800px"},on:{"update:visible":function(t){e.addDialogShow=t},close:e.addDialogClose}},[r("add-dialog",{ref:"editDialog",attrs:{addDialogShow:e.addDialogShow},on:{"update:addDialogShow":function(t){e.addDialogShow=t},"update:add-dialog-show":function(t){e.addDialogShow=t}}})],1)],1)},n=[],o=(r("96cf"),r("1da1")),l=r("c568"),i={components:{addDialog:l["default"]},data:function(){return{addDialogShow:!1,addDialogTitle:"",tableColumn:[{type:"index",label:"编号",align:"center",width:50},{label:"轮播图",prop:"bannerImg",align:"center",width:200},{label:"名称",prop:"bannerName",align:"center"},{label:"位置",prop:"bannerShowLocation",align:"center",formatter:function(e){return 1==e.bannerShowLocation?"首页":2==e.bannerShowLocation?"商城":void 0}},{label:"类型",prop:"bannerLinkType",align:"center",formatter:function(e){return 1==e.bannerLinkType?"内部链接":2==e.bannerLinkType?"外部链接":void 0}},{label:"状态",prop:"enableStauts",align:"center",width:80},{label:"排序",prop:"sort",align:"center",width:130},{label:"操作",prop:"op",align:"center"}]}},methods:{updateTableRow:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,t.$service.app.carousel.update(e);case 3:r.next=8;break;case 5:r.prev=5,r.t0=r["catch"](0),t.$message.error(r.t0);case 8:case"end":return r.stop()}}),r,null,[[0,5]])})))()},editDialog:function(e){var t=this;this.addDialogTitle="编辑轮播",this.addDialogShow=!0,this.$nextTick((function(){t.$refs.editDialog.getEditInfo(e)}))},deleteFn:function(e){var t=this;this.$confirm("是否删除该条轮播数据?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(o["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,t.$service.app.carousel["delete"]({ids:e});case 3:t.$message({type:"success",message:"删除成功!"}),r.next=9;break;case 6:r.prev=6,r.t0=r["catch"](0),t.$message.error(r.t0);case 9:case"end":return r.stop()}}),r,null,[[0,6]])}))))["catch"]((function(){t.$message({type:"info",message:"已取消删除"})}))},onLoad:function(e){var t=e.ctx,r=e.app;t.service(this.$service.app.carousel).done(),r.refresh()},addDialogClose:function(){this.$refs.editDialog.resetForm("ruleForm"),this.$refs["crud"].refresh()}}},s=i,c=r("2877"),u=Object(c["a"])(s,a,n,!1,null,null,null);t["default"]=u.exports},a360:function(e,t,r){"use strict";var a=r("7521"),n=r.n(a);n.a},c568:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[r("div",{staticStyle:{"max-width":"900px"}},[r("el-form-item",{attrs:{label:"名称",prop:"bannerName"}},[r("el-input",{attrs:{placeholder:"请输入轮播图名称"},model:{value:e.ruleForm.bannerName,callback:function(t){e.$set(e.ruleForm,"bannerName",t)},expression:"ruleForm.bannerName"}})],1),r("el-form-item",{attrs:{label:"位置",prop:"bannerShowLocation"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm.bannerShowLocation,callback:function(t){e.$set(e.ruleForm,"bannerShowLocation",t)},expression:"ruleForm.bannerShowLocation"}},e._l([{value:1,text:"首页"},{value:2,text:"商城"}],(function(e){return r("el-option",{key:e.value,attrs:{label:e.text,value:e.value}})})),1)],1),r("div",{staticStyle:{display:"flex"}},[r("el-form-item",{staticClass:"form-item",attrs:{label:"URL"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm.bannerLinkType,callback:function(t){e.$set(e.ruleForm,"bannerLinkType",t)},expression:"ruleForm.bannerLinkType"}},e._l([{value:1,text:"内部链接"},{value:2,text:"外部链接"}],(function(e){return r("el-option",{key:e.value,attrs:{label:e.text,value:e.value}})})),1)],1),r("el-form-item",{staticClass:"form-item",attrs:{"label-width":"10px"}},[r("el-input",{attrs:{placeholder:"请填写链接地址"},model:{value:e.ruleForm.bannerLinkUrl,callback:function(t){e.$set(e.ruleForm,"bannerLinkUrl",t)},expression:"ruleForm.bannerLinkUrl"}},[r("template",{slot:"prepend"},[e._v("https://")])],2)],1)],1),r("el-form-item",{attrs:{label:"图片",prop:"bannerImg"}},[r("cl-upload",{staticClass:"avatar-uploader",attrs:{value:e.ruleForm.bannerImg,filePath:e.ruleForm.bannerImg,size:[150,350],icon:"el-icon-plus",accept:"*","on-success":e.bannerImgUploadSuccess}}),r("span",{staticStyle:{color:"#909399"}},[e._v("注：限上传一张,建议图片大小350*150")])],1),r("el-form-item",{attrs:{label:"排序",prop:"sort",required:""}},[r("el-input-number",{attrs:{min:1},model:{value:e.ruleForm.sort,callback:function(t){e.$set(e.ruleForm,"sort",t)},expression:"ruleForm.sort"}}),r("span",{staticStyle:{color:"#909399","padding-left":"10px"}},[e._v("注：数字越小,轮播图越靠前")])],1),r("el-form-item",{attrs:{label:"状态",required:""}},[r("el-radio-group",{model:{value:e.ruleForm.enableStatus,callback:function(t){e.$set(e.ruleForm,"enableStatus",t)},expression:"ruleForm.enableStatus"}},[r("el-radio",{attrs:{label:0}},[e._v("关闭")]),r("el-radio",{attrs:{label:1}},[e._v("开启")])],1)],1),r("el-form-item",{staticStyle:{"text-align":"center"}},[r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("保存")]),r("el-button",{on:{click:function(t){return e.resetForm("ruleForm")}}},[e._v("重置")])],1)],1)])},n=[],o=r("5530"),l=(r("96cf"),r("1da1")),i={computed:{},data:function(){return{ruleForm:{bannerName:"",bannerShowLocation:"",bannerLinkType:1,bannerLinkUrl:"",bannerImg:"",enableStatus:0,sort:1},rules:{bannerName:[{required:!0,message:"请输入轮播图名称",trigger:"blur"}],bannerShowLocation:[{required:!0,message:"请选择轮播图位置",trigger:"change"}],bannerImg:[{required:!0,message:"请上传轮播图图片",trigger:"blur"}]}}},methods:{getEditInfo:function(e){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function r(){var a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,t.$service.app.carousel.info({id:e});case 3:a=r.sent,t.ruleForm=a,t.enableStatus=a.enableStatus,r.next=11;break;case 8:r.prev=8,r.t0=r["catch"](0),t.$message.error(r.t0);case 11:case"end":return r.stop()}}),r,null,[[0,8]])})))()},submitForm:function(e){var t=this;this.$refs[e].validate(function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(r){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=13;break}return e.prev=1,a=Object(o["a"])({},t.ruleForm),e.next=5,t.$service.app.carousel.add(a);case 5:t.$emit("update:addDialogShow",!1),e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](1),t.$message.error(e.t0);case 11:e.next=15;break;case 13:return console.log("error submit!!"),e.abrupt("return",!1);case 15:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}())},resetForm:function(e){this.$refs[e].resetFields()},bannerImgUploadSuccess:function(e){e&&(this.ruleForm.bannerImg=e)}}},s=i,c=(r("a360"),r("2877")),u=Object(c["a"])(s,a,n,!1,null,"8f0c675c",null);t["default"]=u.exports}}]);