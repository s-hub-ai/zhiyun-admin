import {
 BaseService,
 Service,
 Permission
} from "@/cool";

@Service("app/commodity/common")
export default class extends BaseService {
 //设置商品销量展示
 @Permission("updateShowSaleVolume")
 updateShowSaleVolume(data) {
  return this.request({
   url: "/updateShowSaleVolume",
   method: "POST",
   data
  });
 }
 //设置商品上架状态
 @Permission("updateStatus")
 updateStatus(data) {
  return this.request({
   url: "/updateStatus",
   method: "POST",
   data
  });
 }

 //设置商品自定义销量
 @Permission("updateFakeSaleVolume")
 updateFakeSaleVolume(data) {
  return this.request({
   url: "/updateFakeSaleVolume",
   method: "POST",
   data
  });
 }

 //设置商品排序
 @Permission("updateCommodityOrder")
 updateCommodityOrder(data) {
  return this.request({
   url: "/updateCommodityOrder",
   method: "POST",
   data
  });
 }

}