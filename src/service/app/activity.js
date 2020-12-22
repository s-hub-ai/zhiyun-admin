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
}