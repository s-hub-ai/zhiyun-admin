import {
 BaseService,
 Service,
 Permission
} from "@/cool";

@Service("app/activity")
export default class extends BaseService {
 @Permission("userIds")
 userIds(data) {
  return this.request({
   url: "/userIds",
   method: "POST",
   data
  });
 }


 @Permission("clockinList")
 clockinList(params) {
  return this.request({
   url: "/clockinList",
   params
  });
 }
}