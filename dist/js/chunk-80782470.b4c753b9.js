(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-80782470","chunk-2d2307dd","chunk-7c7b8e7d","chunk-411d7879","chunk-ef9ae348","chunk-b615ea16","chunk-47b9dfc5","chunk-2d229241","chunk-2d2315b8"],{"0a21":function(e,t,o){},"0f9d":function(e,t,o){},"137e":function(e,t,o){"use strict";o.r(t);var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"goods-sku-edit"},[e.multiple&&e.selection.length>0?[o("div",{staticClass:"goods-sku-edit__set"},[o("el-divider",{attrs:{"content-position":"left"}},[e._v("批量设置")]),o("el-table",{attrs:{size:"mini",border:"",data:e.batch}},[e._l(e.columns,(function(t,r){return o("el-table-column",{key:r,attrs:{label:t.label,prop:t.prop,"min-width":t.width,align:"center"},scopedSlots:e._u([{key:"default",fn:function(r){return[o("el-row",{attrs:{type:"flex",justify:"center"}},[o(t.component.name,e._b({tag:"component",model:{value:r.row[t.prop],callback:function(o){e.$set(r.row,t.prop,o)},expression:"scope.row[item.prop]"}},"component",t.component.props,!1))],1)]}}],null,!0)})})),o("el-table-column",{attrs:{label:"操作",align:"center",width:"200",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(o){return e.batchUpdate(t.row)}}},[e._v("批量修改")]),o("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(o){return e.batchClear(t.row)}}},[e._v("清空")])]}}],null,!1,2235032277)})],2)],1)]:e._e(),e.columns.length>0?o("div",{staticClass:"goods-sku-edit__list"},[o("el-divider",{attrs:{"content-position":"left"}},[e._v("商品属性")]),o("el-table",{attrs:{size:"mini",border:"",data:e.list,"max-height":"500px"},on:{"selection-change":e.onSelectionChange}},[e.multiple?[o("el-table-column",{attrs:{fixed:"left",type:"selection",width:"60",align:"center"}}),e._l(e.spec,(function(e){return o("el-table-column",{key:e.value,attrs:{label:e.label,prop:e.value,align:"center","min-width":"80","show-overflow-tooltip":""}})}))]:e._e(),e._l(e.columns,(function(t,r){return o("el-table-column",{key:r,attrs:{label:t.label,prop:t.prop,"min-width":t.width,align:"center"},scopedSlots:e._u([{key:"default",fn:function(r){return[o("el-row",{attrs:{type:"flex",justify:"center"}},[o(t.component.name,e._b({tag:"component",model:{value:r.row[t.prop],callback:function(o){e.$set(r.row,t.prop,o)},expression:"scope.row[item.prop]"}},"component",t.component.props,!1))],1)]}}],null,!0)})})),e.multiple?[o("el-table-column",{attrs:{label:"操作",align:"center",width:"100",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(o){return e.remove(t.$index)}}},[e._v("删除")])]}}],null,!1,1235992341)})]:e._e()],2)],1):e._e()],2)},l=[],n=(o("7db0"),o("4160"),o("d81d"),o("45fc"),o("a434"),o("159b"),o("2ef0"),{name:"goods-sku-edit",props:{multiple:Boolean,value:{type:Array,default:function(){return[]}},spec:{type:Array,default:function(){return[]}}},computed:{defaultColumn:function(){return this.$store.state.mall.defaultColumn}},data:function(){return{columns:[],list:[],batch:[],selection:[]}},watch:{value:{immediate:!0,handler:function(e){var t=this;this.list=[],this.list=e.map((function(e){var o=t.list.find((function(o){return!t.spec.map((function(e){return e.value})).some((function(t){return e[t]!==o[t]}))}));return o||e})),this.multiple||0!==e.length||(this.list=[this.create()])}},defaultColumn:{immediate:!0,handler:function(e){this.columns=e,console.log(e)}}},created:function(){this.multiple&&(this.batch=[this.create()])},methods:{create:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t={};return this.columns.forEach((function(e){t[e.prop]=e.value})),Object.assign(t,e)},remove:function(e){this.list.splice(e,1)},batchClear:function(){this.batch=[this.create()]},batchUpdate:function(){var e=this;this.selection.map((function(t){for(var o in e.batch[0])t[o]=e.batch[0][o]}))},onSelectionChange:function(e){this.selection=e},validate:function(){return 0!==this.list.length&&this.list}}}),a=n,i=(o("90f1"),o("2877")),s=Object(i["a"])(a,r,l,!1,null,"a793b724",null);t["default"]=s.exports},"144b":function(t,o,r){"use strict";r.r(o);var l=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"goods-spec-select"},[0==e.selects.type?o("div",{staticClass:"goods-spec-select--default"},[o("goods-sku-edit",{ref:"goods-sku-edit",attrs:{spec:e.form.spec,value:e.form.sku}})],1):1==e.selects.type?o("div",{staticClass:"goods-spec-select--multiple"},[o("div",{staticClass:"goods-spec-select__upsert"},[o("goods-spec-edit",{attrs:{"create-btn":!0,value:e.form.spec},on:{create:e.onCreated}}),o("goods-sku-edit",{ref:"goods-sku-edit",attrs:{multiple:"",spec:e.form.spec,value:e.form.sku}})],1)]):e._e(),o("cl-form",{ref:"spec-tmpl"})],1)},n=[],a=(r("4de4"),r("c740"),r("4160"),r("caad"),r("d81d"),r("b0c0"),r("a9e3"),r("d3b7"),r("2532"),r("159b"),r("ddb0"),r("2ef0")),i=r.n(a),s=r("137e"),c=r("e1ab"),u=r("ed08"),m={name:"goods-spec-select",components:{GoodsSkuEdit:s["default"],GoodsSpecEdit:c["default"]},props:{type:{type:Number,default:1},data:{type:Object,default:function(){return{sku:[],spec:[]}}}},data:function(){return{form:{sku:[],spec:[]},selects:{type:1,tmpl:{label:"自定义规格"}},options:{tmpl:[]}}},watch:{type:{immediate:!0,handler:function(e){this.selects.type=e}},data:{immediate:!0,handler:"onUpdate"}},created:function(){this.refreshTmpl()},methods:{refreshTmpl:function(){var e=this;this.$service.biz.spec.template.list().then((function(t){t.unshift({name:"自定义规格"}),e.options.tmpl=t.map((function(e){return{label:e.name,value:e.data}}))}))},onCreated:function(e){if(1==this.selects.type){var t=[];Object(u["calcDescartes"])(e.map((function(e){return e.children}))).forEach((function(e){var o={};i.a.isArray(e)?e.forEach((function(e,t){o["spec_".concat(t)]=e})):o["spec_0"]=e,t.push(o)})),this.onUpdate({sku:t,spec:e})}},onUpdate:function(e){var t=this,o=e.sku,r=e.spec;if(o){var l=this.form.sku.map(u["getSpec"]);o.forEach((function(e){var o=l.findIndex((function(t){return Object(u["getSpec"])(e).includes(t)}));o>=0&&Object.assign(e,t.form.sku[o])})),this.form.sku=o}r&&(this.form.spec=r)},findSpec:function(){i.a.keys(e).filter((function(e){return e.includes("spec_")})).map((function(t){return e[t]}))},onTmplChange:function(e){var t=this;this.$confirm("切换规格模板将覆盖之前的数据，是否继续？","提示",{type:"warning"}).then((function(){t.selects.tmpl=e,e.value?t.onUpdate({sku:[],spec:JSON.parse(e.value)}):t.onUpdate(t.data)}))["catch"]((function(){return null}))},addTmpl:function(){var e=this;this.$refs["spec-tmpl"].open({props:{title:"添加规则模板"},items:[{label:"模板名称",prop:"name",component:{name:"el-input",attrs:{placeholder:"请输入模板名称"}},rules:{required:!0,message:"模板名称不能为空"}},{label:"模板规格",prop:"data",value:[],component:c["default"]}],on:{submit:function(t,o){var r=o.done,l=o.close,n=o.$refs,a=n["goods-spec-edit"].validate();a?e.$service.biz.spec.template.add({name:t.name,data:JSON.stringify(a)}).then((function(){e.$message.success("添加成功"),e.refreshTmpl(),l()}))["catch"]((function(t){e.$message.error(t),r()})):r()}}})},validate:function(){var e=this.$refs["goods-sku-edit"].validate()||[],t=this.form.spec||[];return{type:this.selects.type,spec:{spec:t,sku:e}}}}},d=m,p=(r("a1fd"),r("2877")),f=Object(p["a"])(d,l,n,!1,null,"7ded528c",null);o["default"]=f.exports},"28e1":function(e,t,o){},"2e25":function(e,t,o){"use strict";o.r(t);var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-card",{staticClass:"box-card"},[o("el-tabs",{attrs:{type:"card"},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[o("el-tab-pane",{attrs:{label:"商城商品",name:"1"}},[1==e.activeName?o("mall-form"):e._e()],1),o("el-tab-pane",{attrs:{label:"积分商品",name:"2"}},[2==e.activeName?o("integral-form"):e._e()],1),o("el-tab-pane",{attrs:{label:"票务商品",name:"3"}},[3==e.activeName?o("ticket-form"):e._e()],1),o("el-tab-pane",{attrs:{label:"付费活动",name:"4"}},[4==e.activeName?o("pay-form"):e._e()],1)],1)],1)},l=[],n=o("672b"),a=o("a762"),i=o("dbd1"),s=o("efcd"),c={components:{MallForm:n["default"],IntegralForm:a["default"],PayForm:i["default"],TicketForm:s["default"]},data:function(){return{activeName:"2"}},methods:{}},u=c,m=(o("a2f7"),o("2877")),d=Object(m["a"])(u,r,l,!1,null,"22434107",null);t["default"]=d.exports},"5488d":function(e,t,o){},"5ec7":function(e,t,o){"use strict";var r=o("5488d"),l=o.n(r);l.a},"672b":function(e,t,o){"use strict";o.r(t);var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[o("el-form-item",{attrs:{label:"商品分类",required:""}},[o("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm.commodityTypeId,callback:function(t){e.$set(e.ruleForm,"commodityTypeId",t)},expression:"ruleForm.commodityTypeId"}},e._l(e.commodityTypeList,(function(e){return o("el-option",{key:e.id,attrs:{label:e.commodityTypeName,value:e.id}})})),1)],1),o("el-form-item",{attrs:{label:"商品名称",prop:"commodityName"}},[o("el-input",{model:{value:e.ruleForm.commodityName,callback:function(t){e.$set(e.ruleForm,"commodityName",t)},expression:"ruleForm.commodityName"}})],1),o("el-form-item",{attrs:{label:"商品封面",prop:"commodityCover"}},[o("cl-upload",{staticClass:"avatar-uploader",attrs:{value:e.ruleForm.commodityCover,size:[150,150],icon:"el-icon-plus",accept:"*","on-success":e.commodityCoverUploadSuccess}})],1),o("el-form-item",{attrs:{label:"商品图片",prop:"commodityBannerImg"}},[o("cl-upload",{staticClass:"avatar-uploader",attrs:{multiple:"",limit:5,listType:"picture-card",filePath:e.ruleForm.commodityBannerImg,size:[150,150],icon:"el-icon-plus",accept:"*","on-success":e.commodityBannerImgUploadSuccess}})],1),o("el-form-item",{attrs:{label:"是否促销",required:""}},[o("el-radio-group",{model:{value:e.ruleForm.salePromotionShow,callback:function(t){e.$set(e.ruleForm,"salePromotionShow",t)},expression:"ruleForm.salePromotionShow"}},[o("el-radio",{attrs:{label:0}},[e._v("否")]),o("el-radio",{attrs:{label:1}},[e._v("是")])],1)],1),1==e.ruleForm.salePromotionShow?o("el-form-item",{attrs:{label:"促销方式",required:""}},[o("el-checkbox-group",{on:{change:e.salePromotionMethodChange},model:{value:e.ruleForm.salePromotionMethod,callback:function(t){e.$set(e.ruleForm,"salePromotionMethod",t)},expression:"ruleForm.salePromotionMethod"}},[o("el-checkbox",{attrs:{label:1}},[e._v("价格优惠")]),o("el-checkbox",{attrs:{label:2}},[e._v("积分抵扣")])],1)],1):e._e(),e.ruleForm.salePromotionShow?o("el-form-item",{attrs:{label:"促销时间"}},[o("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd HH:mm:ss",type:"datetimerange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:e.salePromotionTimeChange},model:{value:e.ruleForm.salePromotionTime,callback:function(t){e.$set(e.ruleForm,"salePromotionTime",t)},expression:"ruleForm.salePromotionTime"}})],1):e._e(),o("el-form-item",{attrs:{label:"规格",prop:"specification"}},[o("goods-spec-select",{ref:"goods-spec-select",attrs:{type:e.ruleForm.specType}})],1),o("el-form-item",{attrs:{label:"积分奖励"}},[o("el-radio-group",{model:{value:e.ruleForm.scopeRewardShow,callback:function(t){e.$set(e.ruleForm,"scopeRewardShow",t)},expression:"ruleForm.scopeRewardShow"}},[o("el-radio",{attrs:{label:0}},[e._v("否")]),o("el-radio",{attrs:{label:1}},[e._v("是")])],1)],1),1==e.ruleForm.scopeRewardShow?o("el-form-item",{attrs:{label:"奖励积分"}},[e._v(" 每消费100元得 "),o("el-input-number",{attrs:{"controls-position":"right",min:0},model:{value:e.ruleForm.scopeReward,callback:function(t){e.$set(e.ruleForm,"scopeReward",t)},expression:"ruleForm.scopeReward"}}),e._v(" 积分")],1):e._e(),o("el-form-item",{attrs:{label:"配送方式"}},[o("el-radio-group",{model:{value:e.ruleForm.deliveryMethod,callback:function(t){e.$set(e.ruleForm,"deliveryMethod",t)},expression:"ruleForm.deliveryMethod"}},[o("el-radio",{attrs:{label:0}},[e._v("普通快递")]),o("el-radio",{attrs:{label:1}},[e._v("到店自提")])],1)],1),0==e.ruleForm.deliveryMethod?o("el-form-item",{attrs:{label:"是否包邮"}},[o("el-radio-group",{model:{value:e.ruleForm.freeShippingMethod,callback:function(t){e.$set(e.ruleForm,"freeShippingMethod",t)},expression:"ruleForm.freeShippingMethod"}},[o("el-radio",{attrs:{label:0}},[e._v("否")]),o("el-radio",{attrs:{label:1}},[e._v("是")])],1)],1):e._e(),o("el-form-item",{attrs:{label:"商品详情",prop:"detailImage"}},[o("cl-editor-quill",{attrs:{height:"300"},model:{value:e.ruleForm.detailImage,callback:function(t){e.$set(e.ruleForm,"detailImage",t)},expression:"ruleForm.detailImage"}})],1),o("el-form-item",{attrs:{label:"商品排序",prop:"commodityOrder"}},[o("el-input-number",{model:{value:e.ruleForm.commodityOrder,callback:function(t){e.$set(e.ruleForm,"commodityOrder",t)},expression:"ruleForm.commodityOrder"}})],1),o("el-form-item",{attrs:{label:"状态",prop:"commodityStatus"}},[o("el-switch",{attrs:{"active-text":"上架","inactive-text":"下架","active-value":1,"inactive-value":0},model:{value:e.ruleForm.commodityStatus,callback:function(t){e.$set(e.ruleForm,"commodityStatus",t)},expression:"ruleForm.commodityStatus"}})],1),o("el-form-item",[o("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("立即创建")]),o("el-button",{on:{click:function(t){return e.resetForm("ruleForm")}}},[e._v("重置")])],1)],1)},l=[],n=(o("99af"),o("4160"),o("d81d"),o("0d03"),o("159b"),o("5530")),a=(o("96cf"),o("1da1")),i=o("144b"),s=[{label:"图片",prop:"pic",width:80,value:"",component:{name:"cl-upload",props:{size:46,text:""}}},{label:"名称",prop:"name",value:"",width:150,component:{name:"el-input",props:{placeholder:"请输入名称"}}},{label:"售价",prop:"price",value:.01,width:150,component:{name:"el-input-number",props:{step:1,min:.01,max:1e6,precision:2}}},{label:"库存",prop:"stock",value:100,width:150,component:{name:"el-input-number",props:{step:1,min:100,max:1e6,precision:0}}}],c={components:{GoodsSpecSelect:i["default"]},data:function(){return{defaultColumn:[],commodityTypeList:[],salePromotionMethod:0,ruleForm:{salePromotionShow:0,salePromotionMethod:[],deliveryMethod:0,freeShippingMethod:0,commodityTypeId:"",commodityName:"",commodityCover:"",commodityBannerImg:[],salePromotionTime:"",salePromotionStartTime:new Date,salePromotionEndTime:new Date,specificationType:1,specification:"",commodityOrder:1,detailImage:"",commodityStatus:1,scopeRewardShow:0,scopeReward:0},rules:{commodityName:[{required:!0,message:"请输入商品名称",trigger:"blur"}],commodityCover:[{required:!0,message:"请上传商品封面",trigger:"blur"}],commodityBannerImg:[{required:!0,message:"请上传商品主图",trigger:"blur"}],detailImage:[{required:!0,message:"请编辑商品详情",trigger:"blur"}],commodityOrderg:[{required:!0,message:"请填写商品排序",trigger:"blur"}],commodityStatus:[{required:!0,message:"",trigger:"blur"}]}}},watch:{ruleForm:{handler:function(e,t){},deep:!0},"ruleForm.salePromotionShow":function(e,t){console.log(e),e||(this.ruleForm.salePromotionMethod=[],this.salePromotionMethod=0)}},created:function(){this.$store.dispatch("setDefaultcolumn",s),this.getCommodityTypeList()},methods:{getCommodityTypeList:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$service.app.commodityType.list();case 3:o=t.sent,e.commodityTypeList=o,console.log(o),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),e.$message.error(t.t0);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})))()},salePromotionMethodChange:function(e){var t=new Array,o=0;this.ruleForm.salePromotionMethod.forEach((function(e,r,l){o+=e,console.log(e),0==e&&t.push({label:"促销价格",prop:"salePromotionPrice",value:0,width:150,component:{name:"el-input-number",props:{step:1,min:.01,max:1e6,precision:2}}}),1==e&&t.push({label:"积分抵扣",prop:"scoreCost",value:0,width:150,component:{name:"el-input-number",props:{step:1,min:0,max:1e6,precision:0}}})})),console.log(t);var r=s.concat(t);this.$store.dispatch("setDefaultcolumn",r),this.salePromotionMethod=o,console.log(this.defaultColumn)},salePromotionTimeChange:function(e){console.log(e),this.ruleForm.salePromotionStartTime=e[0],this.ruleForm.salePromotionEndTime=e[1]},commodityCoverUploadSuccess:function(e,t,o){console.log(e,o),e&&(this.ruleForm.commodityCover=e)},commodityCoverBeforeUpload:function(){},commodityBannerImgUploadSuccess:function(e,t,o){console.log(e,o),e&&(this.ruleForm.commodityBannerImg=o.map((function(e){return e.url}))),console.log(this.ruleForm.commodityBannerImg)},submitForm:function(e){var t=this;this.$refs[e].validate(function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(o){var r,l,a,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r=t.$refs["goods-spec-select"].validate(),l=r.type,a=r.spec,t.ruleForm.specificationType=l,t.ruleForm.specification=JSON.stringify(a),!o){e.next=12;break}return i=Object(n["a"])({},t.ruleForm),i.salePromotionMethod=t.salePromotionMethod,console.log(JSON.stringify(i)),e.next=9,t.$service.app.commodity.shopping.add(i);case 9:t.$alert("商品添加成功！","提示",{confirmButtonText:"确定",callback:function(e){}}),e.next=14;break;case 12:return console.log("error submit!!"),e.abrupt("return",!1);case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},resetForm:function(e){console.log("重置表单"),this.$refs[e].resetFields()}}},u=c,m=(o("f52d"),o("2877")),d=Object(m["a"])(u,r,l,!1,null,"17d2ce0b",null);t["default"]=d.exports},"90f1":function(e,t,o){"use strict";var r=o("ed54"),l=o.n(r);l.a},a1fd:function(e,t,o){"use strict";var r=o("0a21"),l=o.n(r);l.a},a2f7:function(e,t,o){"use strict";var r=o("0f9d"),l=o.n(r);l.a},a762:function(e,t,o){"use strict";o.r(t);var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[o("el-form-item",{attrs:{label:"商品名称",prop:"commodityName"}},[o("el-input",{model:{value:e.ruleForm.commodityName,callback:function(t){e.$set(e.ruleForm,"commodityName",t)},expression:"ruleForm.commodityName"}})],1),o("el-form-item",{attrs:{label:"商品封面",prop:"commodityCover"}},[o("cl-upload",{staticClass:"avatar-uploader",attrs:{value:e.ruleForm.commodityCover,size:[150,150],icon:"el-icon-plus",accept:"*","on-success":e.commodityCoverUploadSuccess}})],1),o("el-form-item",{attrs:{label:"商品图片",prop:""}},[o("cl-upload",{staticClass:"avatar-uploader",attrs:{multiple:"",limit:5,listType:"picture-card",filePath:e.ruleForm.commodityBannerImg,size:[150,150],icon:"el-icon-plus",accept:"*","on-success":e.commodityBannerImgUploadSuccess}})],1),o("el-form-item",{attrs:{label:"兑换方式"}},[o("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm.changeMethod,callback:function(t){e.$set(e.ruleForm,"changeMethod",t)},expression:"ruleForm.changeMethod"}},[o("el-option",{attrs:{label:"纯积分兑换",value:1}})],1)],1),o("el-form-item",{attrs:{label:"规格",prop:"specification"}},[o("goods-spec-select",{ref:"goods-spec-select",attrs:{type:e.ruleForm.specType}})],1),o("el-form-item",{attrs:{label:"配送方式"}},[o("el-radio-group",{model:{value:e.ruleForm.deliveryMethod,callback:function(t){e.$set(e.ruleForm,"deliveryMethod",t)},expression:"ruleForm.deliveryMethod"}},[o("el-radio",{attrs:{label:0}},[e._v("普通快递")]),o("el-radio",{attrs:{label:1}},[e._v("到店自提")])],1)],1),0==e.ruleForm.deliveryMethod?o("el-form-item",{attrs:{label:"是否包邮"}},[o("el-radio-group",{model:{value:e.ruleForm.freeShippingMethod,callback:function(t){e.$set(e.ruleForm,"freeShippingMethod",t)},expression:"ruleForm.freeShippingMethod"}},[o("el-radio",{attrs:{label:0}},[e._v("否")]),o("el-radio",{attrs:{label:1}},[e._v("是")])],1)],1):e._e(),o("el-form-item",{attrs:{label:"商品详情",prop:"desc"}},[o("cl-editor-quill",{attrs:{height:"300"},model:{value:e.ruleForm.detailImage,callback:function(t){e.$set(e.ruleForm,"detailImage",t)},expression:"ruleForm.detailImage"}})],1),o("el-form-item",{attrs:{label:"商品排序"}},[o("el-input-number",{model:{value:e.ruleForm.commodityOrder,callback:function(t){e.$set(e.ruleForm,"commodityOrder",t)},expression:"ruleForm.commodityOrder"}})],1),o("el-form-item",{attrs:{label:"状态"}},[o("el-switch",{attrs:{"active-text":"上架","inactive-text":"下架"},model:{value:e.ruleForm.commodityStatus,callback:function(t){e.$set(e.ruleForm,"commodityStatus",t)},expression:"ruleForm.commodityStatus"}})],1),o("el-form-item",[o("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("立即创建")]),o("el-button",{on:{click:function(t){return e.resetForm("ruleForm")}}},[e._v("重置")])],1)],1)},l=[],n=(o("99af"),o("4160"),o("d81d"),o("159b"),o("5530")),a=(o("96cf"),o("1da1")),i=o("144b"),s=[{label:"图片",prop:"pic",width:80,value:"",component:{name:"cl-upload",props:{size:46,text:""}}},{label:"名称",prop:"name",value:"",width:150,component:{name:"el-input",props:{placeholder:"请输入名称"}}},{label:"积分消耗",prop:"scoreCost",value:0,width:150,component:{name:"el-input-number",props:{step:1,min:0,max:1e6,precision:0}}},{label:"库存",prop:"stock",value:100,width:150,component:{name:"el-input-number",props:{step:1,min:100,max:1e6,precision:0}}}],c={components:{GoodsSpecSelect:i["default"]},data:function(){return{defaultColumn:[],ruleForm:{changeMethod:1,commodityName:"",commodityCover:"",commodityBannerImg:[],deliveryMethod:0,freeShippingMethod:0,freeShippingMethodShow:!1,commodityOrder:1,detailImage:"",commodityStatus:0,scopeReward:1},rules:{commodityName:[{required:!0,message:"请输入商品名称",trigger:"blur"}],commodityCover:[{required:!0,message:"请上传商品封面",trigger:"blur"}],commodityBannerImg:[{required:!0,message:"请上传商品主图",trigger:"blur"}],detailImage:[{required:!0,message:"请编辑商品详情",trigger:"blur"}],commodityOrderg:[{required:!0,message:"请填写商品排序",trigger:"blur"}],commodityStatus:[{required:!0,message:"",trigger:"blur"}]}}},watch:{ruleForm:{handler:function(e,t){},deep:!0}},created:function(){this.$store.dispatch("setDefaultcolumn",s)},methods:{salePromotionMethodChange:function(e){var t=new Array;this.ruleForm.salePromotionMethod.forEach((function(e,o,r){console.log(e),0==e&&t.push({label:"促销价格",prop:"salePromotionPrice",value:0,width:150,component:{name:"el-input-number",props:{step:1,min:.1,max:1e6,precision:2}}}),1==e&&t.push({label:"积分抵扣",prop:"scoreCost",value:0,width:150,component:{name:"el-input-number",props:{step:1,min:0,max:1e6,precision:0}}})})),console.log(t);var o=s.concat(t);this.$store.dispatch("setDefaultcolumn",o),console.log(this.defaultColumn)},commodityCoverUploadSuccess:function(e,t,o){console.log(e,o),e&&(this.ruleForm.commodityCover=e)},commodityCoverBeforeUpload:function(){},commodityBannerImgUploadSuccess:function(e,t,o){console.log(e,o),e&&(this.ruleForm.commodityBannerImg=o.map((function(e){return e.url}))),console.log(this.ruleForm.commodityBannerImg)},submitForm:function(e){var t=this;this.$refs[e].validate(function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(o){var r,l,a,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r=t.$refs["goods-spec-select"].validate(),l=r.type,a=r.spec,t.ruleForm.specificationType=l,t.ruleForm.specification=JSON.stringify(a),!o){e.next=12;break}return i=Object(n["a"])({},t.ruleForm),i.salePromotionMethod=t.salePromotionMethod,console.log(JSON.stringify(i)),e.next=9,t.$service.app.commodity.score.add(i);case 9:t.$alert("商品添加成功！","提示",{confirmButtonText:"确定",callback:function(e){}}),e.next=14;break;case 12:return console.log("error submit!!"),e.abrupt("return",!1);case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},resetForm:function(e){console.log("重置表单"),this.$refs[e].resetFields()}}},u=c,m=(o("f3c9"),o("2877")),d=Object(m["a"])(u,r,l,!1,null,"50d6d568",null);t["default"]=d.exports},dbd1:function(e,t,o){"use strict";o.r(t);var r,l,n=o("2877"),a={},i=Object(n["a"])(a,r,l,!1,null,null,null);t["default"]=i.exports},e1ab:function(e,t,o){"use strict";o.r(t);var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"goods-spec-upsert"},[e._l(e.vlist,(function(t,r){return o("div",{key:r,staticClass:"goods-spec-upsert__item",class:{"is-error":t.error}},[o("div",{staticClass:"goods-spec-upsert__item-label"},[o("el-input",{attrs:{size:"mini",clearable:"",maxlength:"20",placeholder:"规格名称（颜色）"},model:{value:t.label,callback:function(o){e.$set(t,"label",o)},expression:"item.label"}})],1),o("div",{staticClass:"goods-spec-upsert__item-list"},[e._l(t.children,(function(r,l){return o("el-tag",{key:l,attrs:{size:"small",effect:"dark",closable:""},on:{close:function(o){return e.itemRemove(t,l)}}},[e._v(e._s(r))])})),o("div",{staticClass:"goods-spec-upsert__item-add"},[o("el-input",{attrs:{size:"mini",placeholder:"规格属性（白色）"},nativeOn:{keydown:function(o){return!o.type.indexOf("key")&&e._k(o.keyCode,"enter",13,o.key,"Enter")?null:e.itemAdd(t)}},model:{value:t.text,callback:function(o){e.$set(t,"text",o)},expression:"item.text"}}),o("el-button",{attrs:{size:"mini",type:"success",disabled:!t.text},on:{click:function(o){return e.itemAdd(t)}}},[e._v("添加")])],1)],2),o("i",{staticClass:"el-icon-error",on:{click:function(t){return e.remove(r)}}})])})),o("div",{staticClass:"goods-spec-upsert__append"},[o("el-button",{attrs:{size:"mini"},on:{click:e.append}},[e._v("添加规格")]),e.createBtn?o("el-button",{attrs:{disabled:0==e.list.length,size:"mini",type:"success"},on:{click:e.onCreate}},[e._v("立即生成")]):e._e()],1)],2)},l=[],n=(o("caad"),o("d81d"),o("a434"),o("2532"),o("2ef0")),a=o.n(n),i={name:"goods-spec-edit",ref:"goods-spec-edit",props:["createBtn","value"],data:function(){return{list:[]}},watch:{value:{immediate:!0,handler:function(e){this.list=a.a.cloneDeep(e||[])}}},computed:{vlist:function(){return this.list.map((function(e){return e.error=null===e.error?null:!e.label||0===e.children.length,e}))}},methods:{itemAdd:function(e){e.children.includes(e.text)?this.$message.warning("属性已存在"):(e.children.push(e.text),e.text="")},itemRemove:function(e,t){e.children.splice(t,1)},remove:function(e){var t=this;this.$confirm("确认要移除该条规格码？","提示",{type:"warning"}).then((function(){t.list.splice(e,1)}))["catch"]((function(){return null}))},append:function(){this.list.push({label:"",value:"",text:"",children:[],error:null})},clear:function(){this.list=[]},validate:function(){var e=!0;return this.list.map((function(t,o){t.error=!t.label||0===t.children.length,t.error&&(e=!1)})),e?this.list.map((function(e,t){return{label:e.label,value:"spec_".concat(t),children:e.children}})):null},onCreate:function(){var e=this.validate();e?(this.$message.success("生成成功"),this.$emit("create",e)):this.$message.warning("请填写完整")}}},s=i,c=(o("5ec7"),o("2877")),u=Object(c["a"])(s,r,l,!1,null,"732c61ce",null);t["default"]=u.exports},e589:function(e,t,o){},ed08:function(e,t,o){"use strict";o.r(t),o.d(t,"calcDescartes",(function(){return r})),o.d(t,"getSpec",(function(){return l})),o.d(t,"deepMerge",(function(){return n}));o("99af"),o("4de4"),o("4160"),o("caad"),o("277d"),o("a15b"),o("d81d"),o("13d5"),o("0d03"),o("d3b7"),o("25f0"),o("2532"),o("159b"),o("ddb0");function r(e){return e.length<2?e[0]||[]:[].reduce.call(e,(function(e,t){var o=[];return e.forEach((function(e){t.forEach((function(t){var r=[].concat(Array.isArray(e)?e:[e]);r.push(t),o.push(r)}))})),o}))}function l(e){return _.keys(e).filter((function(e){return e.includes("spec_")})).map((function(t){return e[t]})).join()}function n(e,t){var o;for(o in t)e[o]=e[o]&&"[object Object]"===e[o].toString()?n(e[o],t[o]):e[o]=t[o];return e}},ed54:function(e,t,o){},efcd:function(e,t,o){"use strict";o.r(t);var r,l,n=o("2877"),a={},i=Object(n["a"])(a,r,l,!1,null,null,null);t["default"]=i.exports},f3c9:function(e,t,o){"use strict";var r=o("28e1"),l=o.n(r);l.a},f52d:function(e,t,o){"use strict";var r=o("e589"),l=o.n(r);l.a}}]);