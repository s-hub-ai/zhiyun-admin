(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21d82a"],{d239:function(e,o,n){"use strict";n.r(o);var s=function(){var e=this,o=e.$createElement,n=e._self._c||o;return n("cl-crud",{on:{load:e.onLoad}},[n("el-row",{attrs:{type:"flex",align:"middle"}},[n("cl-refresh-btn"),n("cl-add-btn"),n("cl-multi-delete-btn"),n("cl-query",{attrs:{value:1,list:[{label:"上行",value:0},{label:"下行",value:1}]}}),n("el-button",{attrs:{size:"mini"},on:{click:e.openForm}},[e._v("自定义表单")]),n("cl-flex1"),n("cl-search-key",{attrs:{field:"name","field-list":[{label:"姓名",value:"name"},{label:"身份证",value:"id"}]}}),n("cl-adv-btn")],1),n("el-row",[n("cl-table",{attrs:{columns:[{type:"selection"},{label:"姓名",prop:"name"},{label:"存款",prop:"price",sortable:!0},{label:"操作",type:"op"}]}})],1),n("el-row",{attrs:{type:"flex"}},[n("cl-flex1"),n("cl-pagination")],1),n("cl-adv-search",e._g(e._b({ref:"adv-search"},"cl-adv-search",e.advSearch.props,!1),e.advSearch.on)),n("cl-upsert",e._g(e._b({ref:"upsert"},"cl-upsert",e.upsert.props,!1),e.upsert.on)),n("cl-form",{ref:"form"})],1)},a=[],l=(n("d3b7"),n("4795"),[{id:1,name:"刘一",process:42.2,endTime:"2019年09月02日",price:75.99,salesRate:52.2,salesStatus:1,images:["https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/1.jpg"],children:[{id:6,name:"刘一儿子",process:35.2,endTime:"2019年09月05日",price:242.1,salesRate:72.1,salesStatus:1,images:[]}]},{id:2,name:"陈二",process:35.2,endTime:"2019年09月05日",price:242.1,salesRate:72.1,salesStatus:1,images:["https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/2.jpg"]},{id:3,name:"张三",process:10.2,endTime:"2019年09月12日",price:74.11,salesRate:23.9,salesStatus:0,images:["https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/3.jpg"]},{id:4,name:"李四",process:75.5,endTime:"2019年09月13日",price:276.64,salesRate:47.2,salesStatus:0,images:["https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/4.jpg"]},{id:5,name:"王五",process:25.4,endTime:"2019年09月18日",price:160.23,salesRate:28.3,salesStatus:1,images:["https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/5.jpg"]}]),t={data:function(){var e=this;return{upsert:{on:{open:function(){console.log("cl-upsert 打开")},close:function(e){console.log("cl-upsert 关闭",e)}},props:{onOpen:function(e){console.log("cl-upsert 打开钩子",e)},onClose:function(e,o){console.log("cl-upsert 关闭钩子",e),o()},onInfo:function(e,o){var n=o.next;o.done,o.close;console.log("cl-upsert 详情钩子",e),n(e)},onSubmit:function(e,o,n){var s=n.next;n.close,n.done;console.log("cl-upsert 提交钩子","是否编辑 ".concat(e),o),s(o)},items:[{label:"姓名",prop:"name",component:{name:"el-input"}},{label:"金额",prop:"price",component:{name:"el-input-number",props:{min:1,max:1e6}},rules:{required:!0,message:"金额不能为空"}},{label:"销售率",prop:"salesRate",component:{name:"el-input-number",props:{precision:2,min:0,max:100}}},{label:"职业",prop:"of",value:1,component:{name:"el-radio-group",options:[{label:"散仙",value:1},{label:"游侠",value:2},{label:"刀客",value:3}],on:{change:function(o){var n=e.$refs["upsert"],s=(n.hiddenItem,n.toggleItem);n.showItem,n.setOptions;s("price")}}}}]}},advSearch:{on:{open:function(e){console.log("adv-search 打开",e)},close:function(){console.log("adv-search 关闭")},reset:function(){console.log("adv-search 重置")},clear:function(){console.log("adv-search 清空")}},props:{onOpen:function(e,o){var n=o.next;console.log("adv-search 打开钩子",e),n()},onClose:function(e){console.log("adv-search 关闭钩子"),e()},onSearch:function(e,o){var n=o.next;o.close;console.log("adv-search 搜索钩子",e),n()},opList:["search","reset","clear","close"],items:[{label:"姓名",prop:"name",value:"",component:{name:"ref-test",ref:"name",render:function(e){return e("p","icssoa")}}},{label:"金额",prop:"price",component:{name:"el-input-number",props:{min:1,max:1e6},on:{change:function(){e.$refs["adv-search"].toggleItem("salesRate")}}}},{label:"销售率",prop:"salesRate",hidden:!0,component:{name:"el-input-number",props:{precision:2,min:0,max:100}}}]}}}},methods:{openForm:function(){var e=this;this.$refs["form"].open({props:{title:"自定义表单"},items:[{label:"姓名",prop:"name",value:"神仙都没用",component:{name:"el-input"},rules:{required:!0,message:"姓名不能为空"}}],on:{open:function(e,o){o.close,o.submit,o.done;console.log("cl-form 打开钩子",e)},close:function(e,o){console.log("cl-form 关闭钩子",e),o()},submit:function(o,n){var s=n.close;n.done,n.next;console.log("cl-form 提交钩子",o),setTimeout((function(){s(),e.$message.success("提交成功")}),1500)}}})},onLoad:function(e){var o=e.ctx,n=e.app;o.service({page:function(e){return console.log("GET[page]",e),Promise.resolve({list:l,pagination:{page:e.page,size:e.size,total:200}})},info:function(e){return console.log("GET[info]",e),new Promise((function(e){e({name:"icssoa",price:100})}))},add:function(e){return console.log("POST[add]",e),Promise.resolve()},delete:function(e){return console.log("POST[delete]",e),Promise.resolve()},update:function(e){return console.log("POST[update]",e),Promise.resolve()}}).permission((function(){return{add:!0,update:!0,delete:!0}})).done(),n.refresh()}}},c=t,r=n("2877"),i=Object(r["a"])(c,s,a,!1,null,null,null);o["default"]=i.exports}}]);