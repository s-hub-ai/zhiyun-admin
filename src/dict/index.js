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
}, {
  value: 5,
  text: '天使套票'
}, {
  value: 6,
  text: '超级VIP'
}]
//票务类型
export const ticketTypeDict = [{
    value: 4,
    text: '套票'
  }
  /* , {
    value: 1,
    text: '球票'
  } */
]
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
  text: '非支云卡用户'
}, {
  value: 1,
  text: '支云卡用户'
}]
//积分状态
export const pointStatusDict = [{
  value: 0,
  text: '可用'
}, {
  value: 1,
  text: '冻结'
}, {
  value: 2,
  text: '退款扣除'
}, {
  value: 3,
  text: '退款恢复'
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
}, {
  value: 11,
  text: '系统扣除'
}, {
  value: 12,
  text: '活动打卡'
}]

//商品类型
export const goodsTypeDict = [{
    value: -1,
    text: '全部'
  }, {
    value: 0,
    text: '商城商品'
  },
  {
    value: 2,
    text: '积分商品'
  },
  {
    value: 5,
    text: '青训课程'
  }
  /* {
  value: 1,
  text: '票务商品'
},  */

  /* , {
    value: 3,
    text: '活动商品'
  } */
]
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
  value: 3,
  text: '活动订单'
}, {
  value: 4,
  text: '套票订单'
}, {
  value: 5,
  text: '青训课程'
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
    text: "已退款",
    value: 10,
    type: "drawback"
  }, {
    text: "待提货",
    value: 7,
    type: "danger"
  }
  // {
  //   text: "订单关闭",
  //   value: 6,
  //   type: "close"
  // }
];
//卡券类型
export const couponTypeDict = [{
  value: -1,
  text: '全部'
}, {
  value: 4,
  text: '满减券'
}, {
  value: 1,
  text: '立减券'
}, {
  value: 2,
  text: '折扣券'
}, {
  value: 3,
  text: '商品指定立减券'
} , {
  value: 5,
  text: '指定商品满减券'
}
]
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
// 活动商品状态
export const ActivityGoodsStatus = [{
    label: "开启",
    value: 1
  },
  {
    label: "关闭",
    value: 0,
    type: "danger"
  }
];
// 支付方式
export const paymentDict = [{
    text: "一网通支付",
    value: 0
  },
  {
    text: "微信支付",
    value: 1,
    type: "danger"
  }
];
// 支付方式
export const deliveryMethodDict = [{
    text: "普通快递",
    value: 0
  },
  {
    text: "到店自提",
    value: 1
  }
];
//性别 
export const sexDict=[
  {
    text: "未设置",
    value: -1
  },
  {
    text: "男",
    value: 0
  },
  {
    text: "女",
    value: 1
  }
]
//惯用脚 
export const footDict=[
  {
    text: "未设置",
    value: -1
  },
  {
    text: "左脚",
    value: 0
  },
  {
    text: "右脚",
    value: 1
  },
  {
    text: "双脚",
    value: 2
  }
]
//位置 
export const positionDict=[
  {
    text: "未设置",
    value: -1
  },
  {
    text: "守门员",
    value: 0
  },
  {
    text: "防守",
    value: 1
  },
  {
    text: "进攻",
    value: 2
  }
]
//归属地
export const addressDict=[
  {
    text: "南通",
    value: 0
  },
  {
    text: "海安",
    value: 1
  },
  {
    text: "如皋",
    value: 2
  },
  {
    text: "未设置",
    value: 3
  }
]

//星期
export const weekDict=[
  {
    text: "星期一",
    value: '0'
  },
  {
    text: "星期二",
    value: '1'
  },
  {
    text: "星期三",
    value: '2'
  },
  {
    text: "星期四",
    value: '3'
  },
  {
    text: "星期五",
    value: '4'
  },
  {
    text: "星期六",
    value: '5'
  },
  {
    text: "星期天",
    value: '6'
  }
]

// 青训用户

export const trainingStatusDict = [
  {
    text: "家长",
    value: '0'
  },
  {
    text: "教练",
    value: '1'
  }
]