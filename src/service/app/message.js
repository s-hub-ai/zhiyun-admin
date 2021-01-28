import {
 BaseService,
 Service,
 Permission
} from "@/cool";

@Service("app/message")
export default class extends BaseService {

 @Permission("transferUser")
 transferUser(params) {
  return this.request({
   url: "/transferUser",
   params
  });
 }

 @Permission("transferUserDetail")
 transferUserDetail(data) {
  return this.request({
   url: "/transferUserDetail",
   method: "POST",
   data
  });
 }

 @Permission("importUser")
 importUser(data) {
  return this.request({
   url: "/importUser",
   method: "POST",
   data
  });
 }
}