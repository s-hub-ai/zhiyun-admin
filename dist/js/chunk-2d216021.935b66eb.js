(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d216021"],{c141:function(e,o,n){"use strict";n.r(o);var t=function(){var e=this,o=e.$createElement,n=e._self._c||o;return n("cl-crud",{on:{load:e.onLoad}},[n("el-row",{attrs:{type:"flex",align:"middle"}},[n("h4",[e._v("运费设置")]),n("cl-flex1")],1),n("el-row",[n("cl-table",{attrs:{props:{"span-method":e.objectSpanMethod},columns:e.tableColumn},scopedSlots:e._u([{key:"column-deleveryChargeValue",fn:function(e){var o=e.scope;return[n("el-input-number",{staticStyle:{width:"100px"},attrs:{value:o.row.deleveryChargeValue,size:"mini","controls-position":"right",min:0}})]}}])})],1),n("el-row",{attrs:{type:"flex"}},[n("cl-flex1")],1)],1)},l=[],r=(n("d3b7"),[{id:1,deliveryMethod:35,deliveryRegion:"2019年09月05日",deleveryChargeValue:242.1,type:72.1,images:["https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/1.jpg"]},{id:2,name:"陈二",deliveryMethod:35,deliveryRegion:"2019年09月05日",deleveryChargeValue:242.1,type:72.1,salesStatus:1,images:["https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/2.jpg"]}]),a={data:function(){return{tableColumn:[{label:"配送方式",prop:"deliveryMethod",align:"center"},{label:"配送地",prop:"deliveryRegion",align:"center"},{label:"运费(元)",prop:"deleveryChargeValue",align:"center"}]}},methods:{objectSpanMethod:function(e){var o=e.row,n=(e.column,e.rowIndex,e.columnIndex);if(0===n&&35==o.deliveryMethod)return{rowspan:1,colspan:1}},onLoad:function(e){var o=e.ctx,n=e.app;o.service({page:function(e){return console.log("GET[page]",e),Promise.resolve({list:r,pagination:{page:e.page,size:e.size,total:200}})},info:function(e){return console.log("GET[info]",e),new Promise((function(e){e({name:"icssoa",price:100})}))},add:function(e){return console.log("POST[add]",e),Promise.resolve()},delete:function(e){return console.log("POST[delete]",e),Promise.resolve()},update:function(e){return console.log("POST[update]",e),Promise.resolve()}}).permission((function(){return{add:!0,update:!0,delete:!0}})).done(),n.refresh()}}},i=a,s=n("2877"),c=Object(s["a"])(i,t,l,!1,null,null,null);o["default"]=c.exports}}]);