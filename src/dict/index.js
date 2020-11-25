//套票会员类型
export const ticketPackageUserDict = [{
  value: 0,
  text: '非套票'
}, {
  value: 1,
  text: '基础套票'
}, {
  value: 2,
  text: '普通套票'
}, {
  value: 3,
  text: '亲子套票'
}, {
  value: 4,
  text: 'VIP套票'
}]
//用户实名状态
export const useCcertificationDict = [{
  value: 0,
  text: "未认证"
}, {
  value: 1,
  text: "已认证"
}]

//支云卡状态
export const zhiyunCardStatusDict = [{
  value: 0,
  text: '非云卡用户'
}, {
  value: 1,
  text: '云卡用户'
}]
//积分使用事件类型
export const pointsUseDetailTypeDict = [{
  value: 0,
  text: '活动报名'
}, {
  value: 2,
  text: '商城购物'
}, {
  value: 4,
  text: '实名认证'
}, {
  value: 3,
  text: '套票充值'
}, {
  value: 1,
  text: '远征观赛'
}, {
  value: 5,
  text: '办理支云卡'
}, {
  value: 6,
  text: '成为套票会员'
}, {
  value: 7,
  text: '商城购物'
}, {
  value: 8,
  text: '积分兑换礼品'
}, {
  value: 9,
  text: '系统赠送'
}, {
  value: 10,
  text: '个人原有积分'
}]

//商品类型
export const goodsTypeDict = [{
  value: -1,
  text: '全部'
}, {
  value: 0,
  text: '商城商品'
}, {
  value: 1,
  text: '票务商品'
}, {
  value: 2,
  text: '积分商品'
}, {
  value: 3,
  text: '活动商品'
}]
//订单类型
export const orderTypeDict = [{
  value: -1,
  text: '全部'
}, {
  value: 0,
  text: '商城订单'
}, {
  value: 2,
  text: '兑换订单'
}, {
  value: 1,
  text: '票务订单'
}]
//订单状态
export const orderStatusDict = [{
    text: "全部",
    value: -1
  }, {
    text: "待付款",
    value: 0
  },
  {
    text: "待发货",
    value: 1
  },
  {
    text: "待收货",
    value: 2
  },
  {
    text: "发起退款",
    value: 4
  },
  {
    text: "交易完成",
    value: 3,
    type: "success"
  },
  {
    text: "平台退款中",
    value: 5,
    type: "danger"
  },
  {
    text: "订单关闭/已退款",
    value: 6,
    type: "danger"
  }, {
    text: "待提货",
    value: 7,
    type: "danger"
  }
];
//卡券类型
export const couponTypeDict = [{
  value: -1,
  text: '全部'
}, {
  value: 0,
  text: '满减券'
}, {
  value: 1,
  text: '立减券'
}, {
  value: 2,
  text: '折扣券'
}]
//用户会员等级
export const vipLevelDict = [{
  value: 0,
  text: '非会员'
}, {
  value: 1,
  text: "白银"
}, {
  value: 2,
  text: "白金"
}, {
  value: 3,
  text: '钻石'
}, {
  value: 4,
  text: '黑金'
}]