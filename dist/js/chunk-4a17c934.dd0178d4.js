(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4a17c934","chunk-2d2288b5","chunk-17921dc9"],{1073:function(e,t,a){"use strict";var r=a("e918"),l=a.n(r);l.a},"67f3":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("cl-crud",{ref:"crud",on:{load:e.onLoad}},[a("el-row",{attrs:{type:"flex",align:"middle"}},[a("cl-refresh-btn"),a("cl-search-key",{attrs:{placeholder:"请输入用户姓名、手机号、套票号"}}),a("cl-flex1"),a("el-button",{attrs:{size:"mini",type:"primary"}},[e._v("导出")])],1),a("el-row",[a("cl-table",{attrs:{columns:e.tableColumn},scopedSlots:e._u([{key:"column-avatar",fn:function(t){var r=t.scope;return[a("cl-avatar",{style:{margin:"auto"},attrs:{shape:"square",size:"medium",src:e._f("default_avatar")(r.row.avatar)}})]}},{key:"column-op",fn:function(t){var r=t.scope;return[a("el-link",{attrs:{type:"primary"},on:{click:function(t){return e.editDialog(r.row.id)}}},[e._v("详情")])]}},{key:"column-availablePoints",fn:function(t){var r=t.scope;return[a("el-link",{attrs:{type:"primary"},on:{click:function(t){return e.$router.push({path:"PointsUseDetails",query:{id:r.row.id}})}}},[e._v(e._s(e._f("default")(r.row.availablePoints)))])]}}])})],1),a("el-row",{attrs:{type:"flex"}},[a("cl-flex1"),a("cl-pagination")],1),a("el-dialog",{attrs:{title:e.addDialogTitle,visible:e.addDialogShow,width:"1200px"},on:{"update:visible":function(t){e.addDialogShow=t},close:e.addDialogClose}},[a("add-dialog",{ref:"editDialog",attrs:{addDialogShow:e.addDialogShow},on:{"update:addDialogShow":function(t){e.addDialogShow=t},"update:add-dialog-show":function(t){e.addDialogShow=t}}})],1)],1)},l=[],i=(a("d81d"),a("da46")),s=a("acb2"),o={components:{addDialog:s["default"]},computed:{fanClubList:function(){var e=this.$store.state.common.fanClub,t=null===e||void 0===e?void 0:e.map((function(e,t,a){var r={value:e.id,text:e.fanClubName};return r}));return t}},data:function(){var e=this;return{addDialogShow:!1,addDialogTitle:"",tableColumn:[{type:"index",label:"编号",align:"center",width:50},{label:"头像",prop:"avatar",align:"center",width:70},{label:"昵称",align:"center",prop:"nickName"},{label:"手机号",prop:"phoneNum",align:"center",width:105},{label:"微信号",prop:"weChatAccount",align:"center"},{label:"套票类型",prop:"ticketPackageUser",filters:i["ticketPackageUserDict"],align:"center",formatter:function(e){var t;return null===i["ticketPackageUserDict"]||void 0===i["ticketPackageUserDict"]||i["ticketPackageUserDict"].map((function(a){e.ticketPackageUser==a.value&&(t=a.text)})),t},width:90},{label:"套票号",prop:"ticketPackageNum",align:"center"},{label:"球迷会",prop:"fanClubId",filters:[],align:"center",formatter:function(t){var a,r="-";return null===(a=e.fanClubList)||void 0===a||a.map((function(e){t.fanClubId==e.value&&(r=e.text)})),r},"filter-method":function(e,t,a){return console.log(e),console.log(t),t[a["property"]]==e}},{label:"实名状态",prop:"userCertification",filters:i["useCcertificationDict"],align:"center",formatter:function(e){var t;return null===i["useCcertificationDict"]||void 0===i["useCcertificationDict"]||i["useCcertificationDict"].map((function(a){e.userCertification==a.value&&(t=a.text)})),t},"filter-method":function(e,t,a){return console.log(e),console.log(t),t[a["property"]]==e},width:90},{label:"姓名",prop:"userName",align:"center"},{label:"可用积分",prop:"availablePoints",align:"center"},{label:"累计积分",prop:"accumulatedPoints",align:"center"},{label:"积分排名",prop:"pointsOrder",align:"center",sortable:!0,width:100},{label:"会员等级",prop:"vipLevel",filters:i["vipLevelDict"],align:"center",width:90,formatter:function(e){var t;return null===i["vipLevelDict"]||void 0===i["vipLevelDict"]||i["vipLevelDict"].map((function(a){e.vipLevel==a.value&&(t=a.text)})),t},"filter-method":function(e,t,a){return console.log(e),console.log(t),t[a["property"]]==e}},{label:"支云卡状态",prop:"zhiyunCardStatus",align:"center",filters:i["zhiyunCardStatusDict"],formatter:function(e){var t;return null===i["zhiyunCardStatusDict"]||void 0===i["zhiyunCardStatusDict"]||i["zhiyunCardStatusDict"].map((function(a){e.zhiyunCardStatus==a.value&&(t=a.text)})),t},"filter-method":function(e,t,a){return console.log(e),console.log(t),t[a["property"]]==e},width:100},{label:"操作",prop:"op",align:"center",fixed:"right",width:60}]}},methods:{onLoad:function(e){var t=e.ctx,a=e.app;this.tableColumn[7].filters=this.fanClubList,t.service(this.$service.app.user.info).done(),a.refresh()},editDialog:function(e){var t=this;this.addDialogTitle="基础信息",this.addDialogShow=!0,this.$nextTick((function(){t.$refs.editDialog.getEditInfo(e)}))},addDialogClose:function(){this.$refs.editDialog.resetForm("ruleForm"),this.$refs["crud"].refresh()}}},u=o,n=a("2877"),c=Object(n["a"])(u,r,l,!1,null,null,null);t["default"]=c.exports},acb2:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticStyle:{display:"flex","justify-content":"space-between","align-items":"center"}},[e.notEdit?a("el-button",{staticStyle:{"margin-left":"auto"},attrs:{size:"medium",type:"primary",disabled:!1},on:{click:function(t){e.notEdit=!1}}},[e._v("编辑")]):a("el-button-group",{staticStyle:{"margin-left":"auto"}},[a("el-button",{attrs:{size:"medium"},on:{click:function(t){e.notEdit=!0}}},[e._v("取消")]),a("el-button",{attrs:{size:"medium",type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("保存")])],1)],1),a("el-form",{ref:"ruleForm",staticClass:"form",attrs:{inline:!0,model:e.ruleForm,rules:e.rules,disabled:e.notEdit,"label-width":"100px"}},[a("div",{staticStyle:{"max-width":"900px"}},[a("el-form-item",{staticClass:"form-item",attrs:{label:"头像:",prop:"avatar"}},[a("el-avatar",{attrs:{size:50,src:e.ruleForm.avatar}})],1),a("el-form-item",{attrs:{label:"昵称:",prop:"nickName"}},[a("el-input",{attrs:{placeholder:"请输入用户昵称"},model:{value:e.ruleForm.nickName,callback:function(t){e.$set(e.ruleForm,"nickName",t)},expression:"ruleForm.nickName"}})],1),a("el-form-item",{attrs:{label:"手机号:",prop:"phoneNum"}},[a("el-input",{attrs:{placeholder:"请输入手机号"},model:{value:e.ruleForm.phoneNum,callback:function(t){e.$set(e.ruleForm,"phoneNum",t)},expression:"ruleForm.phoneNum"}})],1),a("el-form-item",{attrs:{label:"微信号:",prop:"weChatAccount"}},[a("el-input",{attrs:{placeholder:"请输入微信账号"},model:{value:e.ruleForm.weChatAccount,callback:function(t){e.$set(e.ruleForm,"weChatAccount",t)},expression:"ruleForm.weChatAccount"}})],1),a("el-form-item",{attrs:{label:"邮箱号:",prop:"email"}},[a("el-input",{attrs:{placeholder:"请输入邮箱"},model:{value:e.ruleForm.email,callback:function(t){e.$set(e.ruleForm,"email",t)},expression:"ruleForm.email"}})],1),a("el-form-item",{attrs:{label:"微博号:",prop:"weiboAccount"}},[a("el-input",{attrs:{placeholder:"请输入微博账号"},model:{value:e.ruleForm.weiboAccount,callback:function(t){e.$set(e.ruleForm,"weiboAccount",t)},expression:"ruleForm.weiboAccount"}})],1)],1),a("span",{staticClass:"title"},[e._v("套票信息")]),a("el-divider"),a("div",{staticStyle:{"max-width":"800px"}},[a("el-form-item",{staticClass:"form-item",attrs:{prop:"ticketPackageNum",label:"套票号:"}},[a("el-input",{attrs:{placeholder:"请输入套票号"},model:{value:e.ruleForm.ticketPackageNum,callback:function(t){e.$set(e.ruleForm,"ticketPackageNum",t)},expression:"ruleForm.ticketPackageNum"}})],1),a("el-form-item",{staticClass:"form-item",attrs:{prop:"ticketPackageUser",label:"套票类型:"}},[a("el-select",{attrs:{placeholder:"请选择套票类型"},model:{value:e.ruleForm.ticketPackageUser,callback:function(t){e.$set(e.ruleForm,"ticketPackageUser",t)},expression:"ruleForm.ticketPackageUser"}},e._l(e.ticketPackageUserDict,(function(e){return a("el-option",{key:e.value,attrs:{label:e.text,value:e.value}})})),1)],1),a("el-form-item",{staticClass:"form-item",attrs:{prop:"fanClubId",label:"球迷会:"}},[a("el-select",{attrs:{placeholder:"请选择球迷会"},model:{value:e.ruleForm.fanClubId,callback:function(t){e.$set(e.ruleForm,"fanClubId",t)},expression:"ruleForm.fanClubId"}},e._l(e.fanClubList,(function(e){return a("el-option",{key:e.id,attrs:{label:e.fanClubName,value:String(e.value)}})})),1)],1),a("el-form-item",{staticClass:"form-item",attrs:{prop:"fanClubRegion",label:"球迷会区域:"}},[a("el-select",{attrs:{placeholder:"请选择球迷会区域"},model:{value:e.ruleForm.fanClubRegion,callback:function(t){e.$set(e.ruleForm,"fanClubRegion",t)},expression:"ruleForm.fanClubRegion"}},e._l(e.fanClubRegionList,(function(e){return a("el-option",{key:e.id,attrs:{label:e.regionName,value:e.id}})})),1)],1)],1),a("span",{staticClass:"title"},[e._v("实名信息")]),a("el-divider"),a("div",{staticStyle:{"max-width":"1200px"}},[a("el-form-item",{staticClass:"form-item",attrs:{prop:"userName",label:"姓名:"}},[a("el-input",{attrs:{placeholder:"请输入姓名"},model:{value:e.ruleForm.userName,callback:function(t){e.$set(e.ruleForm,"userName",t)},expression:"ruleForm.userName"}})],1),a("el-form-item",{staticClass:"form-item",attrs:{prop:"userSex",label:"性别:"}},[a("el-select",{attrs:{placeholder:"请选择性别"},model:{value:e.ruleForm.userSex,callback:function(t){e.$set(e.ruleForm,"userSex",t)},expression:"ruleForm.userSex"}},e._l([{value:"0",text:"男"},{value:"1",text:"女"}],(function(e){return a("el-option",{key:e.value,attrs:{label:e.text,value:e.value}})})),1)],1),a("el-form-item",{staticClass:"form-item",attrs:{prop:"userBirthday",label:"生日:"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"请选择生日"},model:{value:e.ruleForm.userBirthday,callback:function(t){e.$set(e.ruleForm,"userBirthday",t)},expression:"ruleForm.userBirthday"}})],1),a("el-form-item",{staticClass:"form-item",attrs:{prop:"userCertificateType",label:"证件类型:"}},[a("el-select",{attrs:{placeholder:"请选择证件类型"},model:{value:e.ruleForm.userCertificateType,callback:function(t){e.$set(e.ruleForm,"userCertificateType",t)},expression:"ruleForm.userCertificateType"}},e._l([{value:"0",text:"身份证"}],(function(e){return a("el-option",{key:e.value,attrs:{label:e.text,value:e.value}})})),1)],1),a("el-form-item",{staticClass:"form-item",attrs:{prop:"userCertificateNum",label:"证件号码:"}},[a("el-input",{attrs:{placeholder:"请输入证件号码"},model:{value:e.ruleForm.userCertificateNum,callback:function(t){e.$set(e.ruleForm,"userCertificateNum",t)},expression:"ruleForm.userCertificateNum"}})],1),a("el-form-item",{staticClass:"form-item",attrs:{prop:"userCertificateValidity",label:"有效期:"}},[a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.ruleForm.userCertificateValidity,callback:function(t){e.$set(e.ruleForm,"userCertificateValidity",t)},expression:"ruleForm.userCertificateValidity"}})],1),a("el-form-item",{staticClass:"form-item",attrs:{prop:"userCertificateAddress",label:"身份证住址:"}},[a("el-input",{staticStyle:{width:"1000px"},attrs:{placeholder:"请输入姓身份证住址"},model:{value:e.ruleForm.userCertificateAddress,callback:function(t){e.$set(e.ruleForm,"userCertificateAddress",t)},expression:"ruleForm.userCertificateAddress"}})],1),a("el-form-item",{staticClass:"form-item",attrs:{label:"附件信息:",prop:"userCertificatePositiveImg"}},[a("span",{staticStyle:{display:"flex","align-items":"center"}},[a("cl-upload",{staticClass:"avatar-uploader",attrs:{value:e.ruleForm.userCertificatePositiveImg,filePath:e.ruleForm.userCertificatePositiveImg,size:[160,252],icon:"el-icon-plus",text:"身份证正面",accept:"*","on-success":e.userCertificatePositiveImgUploadSuccess}}),a("cl-upload",{staticClass:"avatar-uploader",attrs:{value:e.ruleForm.userCertificateNegativeImg,size:[160,252],icon:"el-icon-plus",text:"身份证背面",accept:"*","on-success":e.userCertificateNegativeImgUploadSuccess}}),a("cl-upload",{staticClass:"avatar-uploader",attrs:{value:e.ruleForm.userCertificatePortraitImg,size:[160,252],icon:"el-icon-plus",text:"人像",accept:"*","on-success":e.userCertificatePortraitImgUploadSuccess}})],1)])],1),a("span",{staticClass:"title"},[e._v("积分信息")]),a("el-divider"),a("div",{staticStyle:{"max-width":"800px"}},[a("el-form-item",{staticClass:"form-item",attrs:{label:"会员等级:"}},[a("span",[e._v(e._s(e.vipLevelFormatter(e.ruleForm.vipLevel)))])]),a("el-form-item",{staticClass:"form-item",attrs:{label:"累计积分:"}},[a("span",[e._v(e._s(e._f("default")(e.ruleForm.accumulatedPoints)))])]),a("el-form-item",{staticClass:"form-item",attrs:{label:"积分排名:"}},[a("span",[e._v(e._s(e._f("default")(e.ruleForm.accumulatedPoints)))])]),a("el-form-item",{staticClass:"form-item",attrs:{label:"可用积分:"}},[a("span",[e._v(e._s(e._f("default")(e.ruleForm.availablePoints)))])])],1),a("span",{staticClass:"title"},[e._v("支云卡信息")]),a("el-divider"),a("div",{staticStyle:{"max-width":"800px"}},[a("el-form-item",{staticClass:"form-item",attrs:{label:"卡号:"}},[a("span",[e._v(e._s(e._f("default")(e.ruleForm.zhiyunCardNum)))])]),a("el-form-item",{staticClass:"form-item",attrs:{label:"办卡时间:"}},[a("span",[e._v(e._s(e._f("default")(e.ruleForm.zhiyunCardOpentime)))])])],1),a("span",{staticClass:"title"},[e._v("常用购票人信息")]),a("el-divider"),a("div",{staticStyle:{"max-width":"800px"}},e._l(e.buyTicketsPeople,(function(t,r){return a("block",{key:r},[a("el-form-item",{staticClass:"form-item",attrs:{label:"姓名:"}},[a("span",[e._v(e._s(e._f("default")(t.userName)))])]),a("el-form-item",{staticClass:"form-item",attrs:{label:"证件类型:"}},[a("span",[e._v(e._s(e._f("default")(t.userCertificateType)))])]),a("el-form-item",{staticClass:"form-item",attrs:{label:"证件号码:"}},[a("span",[e._v(e._s(e._f("default")(t.userCertificateNum)))])])],1)})),1),a("span",{staticClass:"title"},[e._v("收货地址")]),a("el-divider"),e._l(e.addresseeList,(function(t,r){return a("div",{key:r,staticStyle:{"max-width":"800px"}},[a("el-form-item",{staticClass:"form-item",attrs:{label:"收货人:"}},[a("span",[e._v(e._s(e._f("default")(t.contact)))])]),a("el-form-item",{staticClass:"form-item",attrs:{label:"手机号:"}},[a("span",[e._v(e._s(e._f("default")(t.phone)))])]),a("el-form-item",{staticClass:"form-item",attrs:{label:"收货地址:"}},[a("span",[e._v(e._s(t.province.label+t.city.label+t.country.label)+" "+e._s(t.detail))])])],1)}))],2)],1)},l=[],i=(a("4160"),a("d81d"),a("0d03"),a("159b"),a("5530")),s=(a("96cf"),a("1da1")),o=a("da46"),u={computed:{fanClubList:function(){return this.$store.state.common.fanClub},fanClubRegionList:function(){return this.$store.state.common.fanClubRegion}},data:function(){return{id:"",ticketPackageUserDict:o["ticketPackageUserDict"],buyTicketsPeople:[],addresseeList:[],notEdit:!0,ruleForm:{userCertificatePositiveImg:""},rules:{name:[{required:!0,message:"请输入活动名称",trigger:"blur"},{min:3,max:5,message:"长度在 3 到 5 个字符",trigger:"blur"}],region:[{required:!0,message:"请选择活动区域",trigger:"change"}],date1:[{type:"date",required:!0,message:"请选择日期",trigger:"change"}],date2:[{type:"date",required:!0,message:"请选择时间",trigger:"change"}],type:[{type:"array",required:!0,message:"请至少选择一个活动性质",trigger:"change"}],resource:[{required:!0,message:"请选择活动资源",trigger:"change"}],desc:[{required:!0,message:"请填写活动形式",trigger:"blur"}]}}},methods:{vipLevelFormatter:function(e){var t;return console.log(e),null===o["vipLevelDict"]||void 0===o["vipLevelDict"]||o["vipLevelDict"].forEach((function(a,r,l){e!=a.value||(t=a.text)})),t},qrCodeUploadSuccess:function(e){e&&(this.ruleForm.qrCode=e)},getEditInfo:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var r,l,i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,t.id=e,a.next=4,t.$service.app.user.info.info({id:e});case 4:return r=a.sent,a.next=7,t.$service.app.fanClubRegion.info({id:r.fanClubId});case 7:return l=a.sent,a.next=10,t.$service.app.user.address.page({page:1,size:999,userId:r.id});case 10:i=a.sent,console.log(i),t.addresseeList=i.list.map((function(e){return e.province=JSON.parse(e.province),e.city=JSON.parse(e.city),e.country=JSON.parse(e.country),e})),r.fanClubRegion=l.id,r.userCertificateValidity=[new Date(r.userCertificateValidityStart),new Date(r.userCertificateValidityEnd)],t.ruleForm=r,console.log(t.ruleForm),a.next=22;break;case 19:a.prev=19,a.t0=a["catch"](0),t.$message.error(a.t0);case 22:case"end":return a.stop()}}),a,null,[[0,19]])})))()},submitForm:function(e){var t=this;this.$refs[e].validate(function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(a){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!a){e.next=13;break}return e.prev=1,r=Object(i["a"])({},t.ruleForm),e.next=5,t.$service.app.user.info.update(r);case 5:t.$emit("update:addDialogShow",!1),e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](1),t.$message.error(e.t0);case 11:e.next=15;break;case 13:return console.log("error submit!!"),e.abrupt("return",!1);case 15:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}())},resetForm:function(e){this.$refs[e].resetFields()},userCertificatePositiveImgUploadSuccess:function(){},userCertificateNegativeImgUploadSuccess:function(){},userCertificatePortraitImgUploadSuccess:function(){}}},n=u,c=(a("1073"),a("2877")),m=Object(c["a"])(n,r,l,!1,null,"4e5f72e8",null);t["default"]=m.exports},da46:function(e,t,a){"use strict";a.r(t),a.d(t,"ticketPackageUserDict",(function(){return r})),a.d(t,"useCcertificationDict",(function(){return l})),a.d(t,"zhiyunCardStatusDict",(function(){return i})),a.d(t,"pointsUseDetailTypeDict",(function(){return s})),a.d(t,"goodsTypeDict",(function(){return o})),a.d(t,"orderTypeDict",(function(){return u})),a.d(t,"orderStatusDict",(function(){return n})),a.d(t,"couponTypeDict",(function(){return c})),a.d(t,"vipLevelDict",(function(){return m}));var r=[{value:0,text:"非套票"},{value:1,text:"基础套票"},{value:2,text:"普通套票"},{value:3,text:"亲子套票"},{value:4,text:"VIP套票"}],l=[{value:0,text:"未认证"},{value:1,text:"已认证"}],i=[{value:0,text:"非云卡用户"},{value:1,text:"云卡用户"}],s=[{value:1,text:"商城购物"},{value:2,text:"活动打卡"},{value:3,text:"套票充值"},{value:4,text:"远征观赛"},{value:5,text:"商城购物"},{value:6,text:"兑换礼品"}],o=[{value:-1,text:"全部"},{value:0,text:"商城商品"},{value:1,text:"票务商品"},{value:2,text:"积分商品"},{value:3,text:"活动商品"}],u=[{value:-1,text:"全部"},{value:0,text:"商城订单"},{value:2,text:"兑换订单"},{value:1,text:"票务订单"}],n=[{text:"全部",value:-1},{text:"待付款",value:0},{text:"待发货",value:1},{text:"待收货",value:2},{text:"发起退款",value:4},{text:"交易完成",value:3,type:"success"},{text:"已退款",value:5,type:"danger"},{text:"订单关闭",value:6,type:"danger"}],c=[{value:-1,text:"全部"},{value:0,text:"满减券"},{value:1,text:"立减券"},{value:2,text:"折扣券"}],m=[{value:0,text:"非会员"},{value:1,text:"白银"},{value:2,text:"白金"},{value:3,text:"钻石"},{value:4,text:"黑金"}]},e918:function(e,t,a){}}]);