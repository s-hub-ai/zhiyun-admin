import {
 BaseService,
 Service,
 Permission
} from "@/cool";

@Service("app/count")
export default class extends BaseService {

 @Permission("sales")
 sales(params) {
  return this.request({
   url: "/sales",
   params
  });
 }

 @Permission("orders")
 orders(params) {
  return this.request({
   url: "/orders",
   params
  });
 }

 @Permission("page")
 page(params) {
  return this.request({
   url: "/page",
   params
  });
 }
}