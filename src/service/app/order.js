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
}