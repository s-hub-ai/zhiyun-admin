import {
 BaseService,
 Service,
 Permission
} from "@/cool";

@Service("sys/delivery")
export default class extends BaseService {

 @Permission("listby")
 listby(params) {
  return this.request({
   url: "/listby",
   params
  });
 }
}