import {
 BaseService,
 Service,
 Permission
} from "@/cool";

@Service("app/applyActivity")
export default class extends BaseService {
 @Permission("audit")
 audit(params) {
  return this.request({
   url: "/audit",
   params
  });
 }
}