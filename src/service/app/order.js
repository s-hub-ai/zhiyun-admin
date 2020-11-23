import {
 BaseService,
 Service,
 Permission
} from "@/cool";

@Service("app/order")
export default class extends BaseService {
 @Permission("delivery")
 delivery(data) {
  return this.request({
   url: "/delivery",
   method: "POST",
   data
  });
 }
 @Permission("offerRefund")
 offerRefund(data) {
  return this.request({
   url: "/offerRefund",
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


 @Permission("orderComplete")
 orderComplete(data) {
  return this.request({
   url: "/orderComplete",
   method: "POST",
   data
  });
 }
}