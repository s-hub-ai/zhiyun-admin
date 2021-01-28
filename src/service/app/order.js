import {
 BaseService,
 Service,
 Permission
} from "@/cool";

@Service("app/order")
export default class extends BaseService {
 //导出数据
 @Permission("export")
 export (data) {
  return this.request({
   url: "/export",
   method: "POST",
   data
  })
 }

 @Permission("delivery")
 delivery(data) {
  return this.request({
   url: "/delivery",
   method: "POST",
   data
  });
 }
 @Permission("updateOfferRefund")
 offerRefund(data) {
  return this.request({
   url: "/updateOfferRefund",
   method: "POST",
   data
  });
 }

 @Permission("refuseRefund")
 refuseRefund(data) {
  return this.request({
   url: "/refuseRefund",
   method: "POST",
   data
  });
 }


 @Permission("updateOrderComplete")
 orderComplete(data) {
  return this.request({
   url: "/updateOrderComplete",
   method: "POST",
   data
  });
 }
}