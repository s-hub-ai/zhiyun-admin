(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1a7e5f44"],{3153:function(e,t,r){"use strict";var n=r("c3ee"),i=r.n(n);i.a},"4f07":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"cl-dept-tree"},[r("p",[e._v(e._s(e.title))]),r("el-input",{attrs:{placeholder:"输入关键字进行过滤",size:"small"},model:{value:e.keyword,callback:function(t){e.keyword=t},expression:"keyword"}}),r("div",{staticClass:"scroller"},[r("el-tree",{ref:"tree",attrs:{data:e.list,props:e.props,"default-checked-keys":e.checked,"filter-node-method":e.filterNode,"highlight-current":"","node-key":"id","show-checkbox":""},on:{"check-change":e.save}})],1)],1)},i=[],c=(r("99af"),r("4de4"),r("4160"),r("caad"),r("b0c0"),r("a9e3"),r("2532"),r("159b"),r("2909")),s=r("8bc2"),a={props:{value:Array,title:String},data:function(){return{list:[],checked:[],keyword:"",props:{label:"name",children:"children"},loading:!1}},watch:{keyword:function(e){this.$refs["tree"].filter(e)},value:function(e){this.refreshTree(e)}},mounted:function(){this.refresh()},methods:{refreshTree:function(e){e||(this.checked=[]);var t=[],r=function e(r){r.forEach((function(r){r.children?e(r.children):t.push(Number(r.id))}))};r(this.list),this.checked=t.filter((function(t){return(e||[]).includes(t)}))},refresh:function(){var e=this;this.$service.system.dept.list().then((function(t){e.list=Object(s["deepTree"])(t),e.refreshTree(e.value)}))["catch"]((function(t){e.$message.error(t)}))},filterNode:function(e,t){return!e||t.name.includes(e)},save:function(){var e=this.$refs["tree"],t=e.getCheckedKeys(),r=e.getHalfCheckedKeys();this.$emit("input",[].concat(Object(c["a"])(t),Object(c["a"])(r)))}}},o=a,l=(r("3153"),r("2877")),d=Object(l["a"])(o,n,i,!1,null,"5665feae",null);t["default"]=d.exports},c3ee:function(e,t,r){}}]);