(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-18256c5a","chunk-2d2307dd","chunk-ef9ae348","chunk-b615ea16","chunk-47b9dfc5"],{"08e3":function(e,t,o){},"0a21":function(e,t,o){},"137e":function(e,t,o){"use strict";o.r(t);var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"goods-sku-edit"},[e.multiple&&e.selection.length>0?[o("div",{staticClass:"goods-sku-edit__set"},[o("el-divider",{attrs:{"content-position":"left"}},[e._v("批量设置")]),o("el-table",{attrs:{size:"mini",border:"",data:e.batch}},[e._l(e.columns,(function(t,r){return o("el-table-column",{key:r,attrs:{label:t.label,prop:t.prop,"min-width":t.width,align:"center"},scopedSlots:e._u([{key:"default",fn:function(r){return[o("el-row",{attrs:{type:"flex",justify:"center"}},[o(t.component.name,e._b({tag:"component",model:{value:r.row[t.prop],callback:function(o){e.$set(r.row,t.prop,o)},expression:"scope.row[item.prop]"}},"component",t.component.props,!1))],1)]}}],null,!0)})})),o("el-table-column",{attrs:{label:"操作",align:"center",width:"200",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(o){return e.batchUpdate(t.row)}}},[e._v("批量修改")]),o("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(o){return e.batchClear(t.row)}}},[e._v("清空")])]}}],null,!1,2235032277)})],2)],1)]:e._e(),e.columns.length>0?o("div",{staticClass:"goods-sku-edit__list"},[o("el-divider",{attrs:{"content-position":"left"}},[e._v("商品属性")]),o("el-table",{attrs:{size:"mini",border:"",data:e.list,"max-height":"500px"},on:{"selection-change":e.onSelectionChange}},[e.multiple?[o("el-table-column",{attrs:{fixed:"left",type:"selection",width:"60",align:"center"}}),e._l(e.spec,(function(e){return o("el-table-column",{key:e.value,attrs:{label:e.label,prop:e.value,align:"center","min-width":"80","show-overflow-tooltip":""}})}))]:e._e(),e._l(e.columns,(function(t,r){return o("el-table-column",{key:r,attrs:{label:t.label,prop:t.prop,"min-width":t.width,align:"center"},scopedSlots:e._u([{key:"default",fn:function(r){return[o("el-row",{attrs:{type:"flex",justify:"center"}},[o(t.component.name,e._b({tag:"component",model:{value:r.row[t.prop],callback:function(o){e.$set(r.row,t.prop,o)},expression:"scope.row[item.prop]"}},"component",t.component.props,!1))],1)]}}],null,!0)})})),e.multiple?[o("el-table-column",{attrs:{label:"操作",align:"center",width:"100",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(o){return e.remove(t.$index)}}},[e._v("删除")])]}}],null,!1,1235992341)})]:e._e()],2)],1):e._e()],2)},n=[],i=(o("7db0"),o("4160"),o("d81d"),o("45fc"),o("a434"),o("159b"),o("2ef0"),{name:"goods-sku-edit",props:{multiple:Boolean,value:{type:Array,default:function(){return[]}},spec:{type:Array,default:function(){return[]}}},computed:{defaultColumn:function(){return this.$store.state.mall.defaultColumn}},data:function(){return{columns:[],list:[],batch:[],selection:[]}},watch:{value:{immediate:!0,handler:function(e){var t=this;this.list=[],this.list=e.map((function(e){var o=t.list.find((function(o){return!t.spec.map((function(e){return e.value})).some((function(t){return e[t]!==o[t]}))}));return o||e})),this.multiple||0!==e.length||(this.list=[this.create()])}},defaultColumn:{immediate:!0,handler:function(e){this.columns=e,console.log(e)}}},created:function(){this.multiple&&(this.batch=[this.create()])},methods:{create:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t={};return this.columns.forEach((function(e){t[e.prop]=e.value})),Object.assign(t,e)},remove:function(e){this.list.splice(e,1)},batchClear:function(){this.batch=[this.create()]},batchUpdate:function(){var e=this;this.selection.map((function(t){for(var o in e.batch[0])t[o]=e.batch[0][o]}))},onSelectionChange:function(e){this.selection=e},validate:function(){return 0!==this.list.length&&this.list}}}),l=i,s=(o("90f1"),o("2877")),a=Object(s["a"])(l,r,n,!1,null,"a793b724",null);t["default"]=a.exports},"144b":function(t,o,r){"use strict";r.r(o);var n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"goods-spec-select"},[0==e.selects.type?o("div",{staticClass:"goods-spec-select--default"},[o("goods-sku-edit",{ref:"goods-sku-edit",attrs:{spec:e.form.spec,value:e.form.sku}})],1):1==e.selects.type?o("div",{staticClass:"goods-spec-select--multiple"},[o("div",{staticClass:"goods-spec-select__upsert"},[o("goods-spec-edit",{attrs:{"create-btn":!0,value:e.form.spec},on:{create:e.onCreated}}),o("goods-sku-edit",{ref:"goods-sku-edit",attrs:{multiple:"",spec:e.form.spec,value:e.form.sku}})],1)]):e._e(),o("cl-form",{ref:"spec-tmpl"})],1)},i=[],l=(r("4de4"),r("c740"),r("4160"),r("caad"),r("d81d"),r("b0c0"),r("a9e3"),r("d3b7"),r("2532"),r("159b"),r("ddb0"),r("2ef0")),s=r.n(l),a=r("137e"),c=r("e1ab"),u=r("ed08"),m={name:"goods-spec-select",components:{GoodsSkuEdit:a["default"],GoodsSpecEdit:c["default"]},props:{type:{type:Number,default:1},data:{type:Object,default:function(){return{sku:[],spec:[]}}}},data:function(){return{form:{sku:[],spec:[]},selects:{type:1,tmpl:{label:"自定义规格"}},options:{tmpl:[]}}},watch:{type:{immediate:!0,handler:function(e){this.selects.type=e}},data:{immediate:!0,handler:"onUpdate"}},created:function(){this.refreshTmpl()},methods:{refreshTmpl:function(){var e=this;this.$service.biz.spec.template.list().then((function(t){t.unshift({name:"自定义规格"}),e.options.tmpl=t.map((function(e){return{label:e.name,value:e.data}}))}))},onCreated:function(e){if(1==this.selects.type){var t=[];Object(u["calcDescartes"])(e.map((function(e){return e.children}))).forEach((function(e){var o={};s.a.isArray(e)?e.forEach((function(e,t){o["spec_".concat(t)]=e})):o["spec_0"]=e,t.push(o)})),this.onUpdate({sku:t,spec:e})}},onUpdate:function(e){var t=this,o=e.sku,r=e.spec;if(o){var n=this.form.sku.map(u["getSpec"]);o.forEach((function(e){var o=n.findIndex((function(t){return Object(u["getSpec"])(e).includes(t)}));o>=0&&Object.assign(e,t.form.sku[o])})),this.form.sku=o}r&&(this.form.spec=r)},findSpec:function(){s.a.keys(e).filter((function(e){return e.includes("spec_")})).map((function(t){return e[t]}))},onTmplChange:function(e){var t=this;this.$confirm("切换规格模板将覆盖之前的数据，是否继续？","提示",{type:"warning"}).then((function(){t.selects.tmpl=e,e.value?t.onUpdate({sku:[],spec:JSON.parse(e.value)}):t.onUpdate(t.data)}))["catch"]((function(){return null}))},addTmpl:function(){var e=this;this.$refs["spec-tmpl"].open({props:{title:"添加规则模板"},items:[{label:"模板名称",prop:"name",component:{name:"el-input",attrs:{placeholder:"请输入模板名称"}},rules:{required:!0,message:"模板名称不能为空"}},{label:"模板规格",prop:"data",value:[],component:c["default"]}],on:{submit:function(t,o){var r=o.done,n=o.close,i=o.$refs,l=i["goods-spec-edit"].validate();l?e.$service.biz.spec.template.add({name:t.name,data:JSON.stringify(l)}).then((function(){e.$message.success("添加成功"),e.refreshTmpl(),n()}))["catch"]((function(t){e.$message.error(t),r()})):r()}}})},validate:function(){var e=this.$refs["goods-sku-edit"].validate()||[],t=this.form.spec||[];return{type:this.selects.type,spec:{spec:t,sku:e}}}}},p=m,d=(r("a1fd"),r("2877")),f=Object(d["a"])(p,n,i,!1,null,"7ded528c",null);o["default"]=f.exports},"31ba":function(e,t,o){"use strict";var r=o("08e3"),n=o.n(r);n.a},"5488d":function(e,t,o){},"5ec7":function(e,t,o){"use strict";var r=o("5488d"),n=o.n(r);n.a},"672b":function(e,t,o){"use strict";o.r(t);var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[o("el-form-item",{attrs:{label:"商品分类",required:""}},[o("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm.commodityTypeId,callback:function(t){e.$set(e.ruleForm,"commodityTypeId",t)},expression:"ruleForm.commodityTypeId"}},e._l(e.commodityTypeList,(function(e){return o("el-option",{key:e.id,attrs:{label:e.commodityTypeName,value:e.id}})})),1)],1),o("el-form-item",{attrs:{label:"商品名称",prop:"commodityName"}},[o("el-input",{model:{value:e.ruleForm.commodityName,callback:function(t){e.$set(e.ruleForm,"commodityName",t)},expression:"ruleForm.commodityName"}})],1),o("el-form-item",{attrs:{label:"商品封面",prop:"commodityCover"}},[o("cl-upload",{staticClass:"avatar-uploader",attrs:{value:e.ruleForm.commodityCover,size:[150,150],icon:"el-icon-plus",accept:"*","on-success":e.commodityCoverUploadSuccess}})],1),o("el-form-item",{attrs:{label:"商品图片",prop:"commodityBannerImg"}},[o("cl-upload",{staticClass:"avatar-uploader",attrs:{multiple:"",limit:5,listType:"picture-card",filePath:e.ruleForm.commodityBannerImg,size:[150,150],icon:"el-icon-plus",accept:"*","on-success":e.commodityBannerImgUploadSuccess}})],1),o("el-form-item",{attrs:{label:"是否促销",required:""}},[o("el-radio-group",{model:{value:e.ruleForm.salePromotionShow,callback:function(t){e.$set(e.ruleForm,"salePromotionShow",t)},expression:"ruleForm.salePromotionShow"}},[o("el-radio",{attrs:{label:0}},[e._v("否")]),o("el-radio",{attrs:{label:1}},[e._v("是")])],1)],1),o("el-form-item",{attrs:{label:"规格",prop:"specification"}},[o("goods-spec-select",{ref:"goods-spec-select",attrs:{type:e.ruleForm.specType}})],1),o("el-form-item",{attrs:{label:"积分奖励"}},[o("el-radio-group",{model:{value:e.ruleForm.isScoreReward,callback:function(t){e.$set(e.ruleForm,"isScoreReward",t)},expression:"ruleForm.isScoreReward"}},[o("el-radio",{attrs:{label:0}},[e._v("否")]),o("el-radio",{attrs:{label:1}},[e._v("是")])],1)],1),0==e.ruleForm.deliveryMethod?o("el-form-item",{attrs:{label:"是否包邮"}},[o("el-radio-group",{model:{value:e.ruleForm.isFreeShipping,callback:function(t){e.$set(e.ruleForm,"isFreeShipping",t)},expression:"ruleForm.isFreeShipping"}},[o("el-radio",{attrs:{label:0}},[e._v("否")]),o("el-radio",{attrs:{label:1}},[e._v("是")])],1)],1):e._e(),o("el-form-item",{attrs:{label:"商品详情",prop:"detailImage"}},[o("cl-editor-quill",{attrs:{height:"300"},model:{value:e.ruleForm.detailImage,callback:function(t){e.$set(e.ruleForm,"detailImage",t)},expression:"ruleForm.detailImage"}})],1),o("el-form-item",{attrs:{label:"商品排序",prop:"commodityOrder"}},[o("el-input-number",{model:{value:e.ruleForm.commodityOrder,callback:function(t){e.$set(e.ruleForm,"commodityOrder",t)},expression:"ruleForm.commodityOrder"}})],1),o("el-form-item",{attrs:{label:"状态",prop:"commodityStatus"}},[o("el-switch",{attrs:{"active-text":"上架","inactive-text":"下架","active-value":1,"inactive-value":0},model:{value:e.ruleForm.commodityStatus,callback:function(t){e.$set(e.ruleForm,"commodityStatus",t)},expression:"ruleForm.commodityStatus"}})],1),o("el-form-item",[o("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("立即创建")]),o("el-button",{on:{click:function(t){return e.resetForm("ruleForm")}}},[e._v("重置")])],1)],1)},n=[],i=(o("99af"),o("4160"),o("d81d"),o("0d03"),o("159b"),o("5530")),l=(o("96cf"),o("1da1")),s=o("144b"),a=[{label:"图片",prop:"pic",width:80,value:"",component:{name:"cl-upload",props:{size:46,text:""}}},{label:"名称",prop:"name",value:"",width:150,component:{name:"el-input",props:{placeholder:"请输入名称"}}},{label:"售价",prop:"price",value:.01,width:150,component:{name:"el-input-number",props:{step:1,min:.01,max:1e6,precision:2}}},{label:"库存",prop:"stock",value:100,width:150,component:{name:"el-input-number",props:{step:1,min:0,max:1e6,precision:0}}}],c=[{label:"图片",prop:"pic",width:80,value:"",component:{name:"cl-upload",props:{size:46,text:""}}},{label:"名称",prop:"name",value:"",width:150,component:{name:"el-input",props:{placeholder:"请输入名称"}}},{label:"售价",prop:"price",value:.01,width:150,component:{name:"el-input-number",props:{step:1,min:.01,max:1e6,precision:2}}},{label:"促销价",prop:"salePromotionPrice",value:.01,width:150,component:{name:"el-input-number",props:{step:1,min:.01,max:1e6,precision:2}}},{label:"库存",prop:"stock",value:100,width:150,component:{name:"el-input-number",props:{step:1,min:0,max:1e6,precision:0}}}],u={components:{GoodsSpecSelect:s["default"]},data:function(){return{defaultColumn:[],commodityTypeList:[],salePromotionMethod:0,ruleForm:{salePromotionShow:0,salePromotionMethod:[],deliveryMethod:0,isFreeShipping:0,commodityTypeId:"",commodityName:"",commodityCover:"",commodityBannerImg:[],salePromotionTime:"",salePromotionStartTime:new Date,salePromotionEndTime:new Date,specificationType:1,specification:"",commodityOrder:1,detailImage:"",commodityStatus:1,scopeRewardShow:0,isScoreReward:0},rules:{commodityName:[{required:!0,message:"请输入商品名称",trigger:"blur"}],commodityCover:[{required:!0,message:"请上传商品封面",trigger:"blur"}],commodityBannerImg:[{required:!0,message:"请上传商品主图",trigger:"blur"}],detailImage:[{required:!0,message:"请编辑商品详情",trigger:"blur"}],commodityOrderg:[{required:!0,message:"请填写商品排序",trigger:"blur"}],commodityStatus:[{required:!0,message:"",trigger:"blur"}]}}},watch:{ruleForm:{handler:function(e,t){},deep:!0},"ruleForm.salePromotionShow":function(e,t){console.log(e),e?(this.ruleForm.salePromotionMethod=1,this.salePromotionMethod=1,this.$store.dispatch("setDefaultcolumn",c)):(this.ruleForm.salePromotionMethod=0,this.salePromotionMethod=0,this.$store.dispatch("setDefaultcolumn",a))}},created:function(){this.$store.dispatch("setDefaultcolumn",a),this.getCommodityTypeList()},methods:{getCommodityTypeList:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$service.app.commodityType.list();case 3:o=t.sent,e.commodityTypeList=o,console.log(o),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),e.$message.error(t.t0);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})))()},salePromotionMethodChange:function(e){var t=new Array,o=0;this.ruleForm.salePromotionMethod.forEach((function(e,r,n){o+=e,console.log(e),1==e&&t.push({label:"促销价格",prop:"salePromotionPrice",value:0,width:150,component:{name:"el-input-number",props:{step:1,min:.01,max:1e6,precision:2}}}),2==e&&t.push({label:"积分抵扣",prop:"scoreCost",value:0,width:150,component:{name:"el-input-number",props:{step:1,min:0,max:1e6,precision:0}}})})),console.log(t);var r=a.concat(t);this.$store.dispatch("setDefaultcolumn",r),this.salePromotionMethod=o,console.log(this.defaultColumn)},salePromotionTimeChange:function(e){console.log(e),this.ruleForm.salePromotionStartTime=e[0],this.ruleForm.salePromotionEndTime=e[1]},commodityCoverUploadSuccess:function(e,t,o){console.log(e,o),e&&(this.ruleForm.commodityCover=e)},commodityCoverBeforeUpload:function(){},commodityBannerImgUploadSuccess:function(e,t,o){console.log(e,o),e&&(this.ruleForm.commodityBannerImg=o.map((function(e){return e.url}))),console.log(this.ruleForm.commodityBannerImg)},submitForm:function(e){var t=this;this.$refs[e].validate(function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(o){var r,n,l,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r=t.$refs["goods-spec-select"].validate(),n=r.type,l=r.spec,t.ruleForm.specificationType=n,t.ruleForm.specification=JSON.stringify(l),!o){e.next=12;break}return s=Object(i["a"])({},t.ruleForm),s.salePromotionMethod=t.salePromotionMethod,console.log(JSON.stringify(s)),e.next=9,t.$service.app.commodity.shopping.add(s);case 9:t.$alert("商品添加成功！","提示",{confirmButtonText:"确定",callback:function(e){}}),e.next=14;break;case 12:return console.log("error submit!!"),e.abrupt("return",!1);case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},resetForm:function(e){console.log("重置表单"),this.$refs[e].resetFields()}}},m=u,p=(o("31ba"),o("2877")),d=Object(p["a"])(m,r,n,!1,null,"26ebff25",null);t["default"]=d.exports},"90f1":function(e,t,o){"use strict";var r=o("ed54"),n=o.n(r);n.a},a1fd:function(e,t,o){"use strict";var r=o("0a21"),n=o.n(r);n.a},e1ab:function(e,t,o){"use strict";o.r(t);var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"goods-spec-upsert"},[e._l(e.vlist,(function(t,r){return o("div",{key:r,staticClass:"goods-spec-upsert__item",class:{"is-error":t.error}},[o("div",{staticClass:"goods-spec-upsert__item-label"},[o("el-input",{attrs:{size:"mini",clearable:"",maxlength:"20",placeholder:"规格名称（颜色）"},model:{value:t.label,callback:function(o){e.$set(t,"label",o)},expression:"item.label"}})],1),o("div",{staticClass:"goods-spec-upsert__item-list"},[e._l(t.children,(function(r,n){return o("el-tag",{key:n,attrs:{size:"small",effect:"dark",closable:""},on:{close:function(o){return e.itemRemove(t,n)}}},[e._v(e._s(r))])})),o("div",{staticClass:"goods-spec-upsert__item-add"},[o("el-input",{attrs:{size:"mini",placeholder:"规格属性（白色）"},nativeOn:{keydown:function(o){return!o.type.indexOf("key")&&e._k(o.keyCode,"enter",13,o.key,"Enter")?null:e.itemAdd(t)}},model:{value:t.text,callback:function(o){e.$set(t,"text",o)},expression:"item.text"}}),o("el-button",{attrs:{size:"mini",type:"success",disabled:!t.text},on:{click:function(o){return e.itemAdd(t)}}},[e._v("添加")])],1)],2),o("i",{staticClass:"el-icon-error",on:{click:function(t){return e.remove(r)}}})])})),o("div",{staticClass:"goods-spec-upsert__append"},[o("el-button",{attrs:{size:"mini"},on:{click:e.append}},[e._v("添加规格")]),e.createBtn?o("el-button",{attrs:{disabled:0==e.list.length,size:"mini",type:"success"},on:{click:e.onCreate}},[e._v("立即生成")]):e._e()],1)],2)},n=[],i=(o("caad"),o("d81d"),o("a434"),o("2532"),o("2ef0")),l=o.n(i),s={name:"goods-spec-edit",ref:"goods-spec-edit",props:["createBtn","value"],data:function(){return{list:[]}},watch:{value:{immediate:!0,handler:function(e){this.list=l.a.cloneDeep(e||[])}}},computed:{vlist:function(){return this.list.map((function(e){return e.error=null===e.error?null:!e.label||0===e.children.length,e}))}},methods:{itemAdd:function(e){e.children.includes(e.text)?this.$message.warning("属性已存在"):(e.children.push(e.text),e.text="")},itemRemove:function(e,t){e.children.splice(t,1)},remove:function(e){var t=this;this.$confirm("确认要移除该条规格码？","提示",{type:"warning"}).then((function(){t.list.splice(e,1)}))["catch"]((function(){return null}))},append:function(){this.list.push({label:"",value:"",text:"",children:[],error:null})},clear:function(){this.list=[]},validate:function(){var e=!0;return this.list.map((function(t,o){t.error=!t.label||0===t.children.length,t.error&&(e=!1)})),e?this.list.map((function(e,t){return{label:e.label,value:"spec_".concat(t),children:e.children}})):null},onCreate:function(){var e=this.validate();e?(this.$message.success("生成成功"),this.$emit("create",e)):this.$message.warning("请填写完整")}}},a=s,c=(o("5ec7"),o("2877")),u=Object(c["a"])(a,r,n,!1,null,"732c61ce",null);t["default"]=u.exports},ed08:function(e,t,o){"use strict";o.r(t),o.d(t,"calcDescartes",(function(){return r})),o.d(t,"getSpec",(function(){return n})),o.d(t,"deepMerge",(function(){return i}));o("99af"),o("4de4"),o("4160"),o("caad"),o("277d"),o("a15b"),o("d81d"),o("13d5"),o("0d03"),o("d3b7"),o("25f0"),o("2532"),o("159b"),o("ddb0");function r(e){return e.length<2?e[0]||[]:[].reduce.call(e,(function(e,t){var o=[];return e.forEach((function(e){t.forEach((function(t){var r=[].concat(Array.isArray(e)?e:[e]);r.push(t),o.push(r)}))})),o}))}function n(e){return _.keys(e).filter((function(e){return e.includes("spec_")})).map((function(t){return e[t]})).join()}function i(e,t){var o;for(o in t)e[o]=e[o]&&"[object Object]"===e[o].toString()?i(e[o],t[o]):e[o]=t[o];return e}},ed54:function(e,t,o){}}]);