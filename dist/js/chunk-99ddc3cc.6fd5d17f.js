(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-99ddc3cc"],{"0931":function(t,n,i){},"7cff":function(t,n,i){"use strict";var s=i("0931"),e=i.n(s);e.a},cb6a:function(t,n,i){"use strict";i.r(n);var s=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticClass:"scope"},[i("cl-form",{ref:"cl-form"}),t._m(0),i("div",{staticClass:"c"},[i("el-button",{attrs:{size:"small"},on:{click:t.openForm}},[t._v("填写邀请码")])],1),t._m(1)],1)},e=[function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticClass:"h"},[i("span",[t._v("cl-form")]),t._v(" 自定义表单 ")])},function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticClass:"f"},[i("span",{staticClass:"date"},[t._v("2019/10/11")])])}],c=(i("a15b"),i("d81d"),i("5530")),o={methods:{openForm:function(){var t=this,n=this.$createElement;this.$refs["cl-form"].open({props:{title:"填写邀请码",width:"450px"},items:[{props:{"label-width":"0px"},component:n("div",[n("i"),n("span",["如无邀请码，请联系客服：icssoa"])])},{props:{"label-width":"0px"},prop:"code",component:{name:"login-invite-code",data:function(){return{list:["","","",""]}},methods:{onInput:function(t){this.list[t]&&t<=4-t&&this.$refs["input-".concat(t+1)].focus(),this.$emit("input",this.list.join(""))},nativeOnInput:function(t,n){"Backspace"==t.code&&(this.list[n]||n-1>=0&&this.$refs["input-".concat(n-1)].focus()),this.$emit("input",this.list.join(""))}},mounted:function(){this.$refs["input-0"].focus()},render:function(){var t=this,n=arguments[0];return n("div",{class:"invite-code"},[this.list.map((function(i,s){var e=this;return n("el-input",{attrs:{maxlength:"1"},ref:"input-".concat(s),on:Object(c["a"])({},{input:function(){t.onInput(s)},"keydown:enter":function(){console.log(1)}}),nativeOn:Object(c["a"])({},{keydown:function(n){t.nativeOnInput(n,s)}}),model:{value:t.list[s],callback:function(n){e.$set(t.list,s,n)}}})}))])}}}],on:{submit:function(n,i){t.$message.success(n.code),i()}}})}}},a=o,u=(i("7cff"),i("2877")),l=Object(u["a"])(a,s,e,!1,null,null,null);n["default"]=l.exports}}]);