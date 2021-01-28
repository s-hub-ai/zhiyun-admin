import {
 BaseService,
 Service,
 Permission
} from "@/cool";

@Service("app/applyActivity")
export default class extends BaseService {
 @Permission("updateAudit")
 audit(params) {
  return this.request({
   url: "/updateAudit",
   params
  });
 }
}