import {
 BaseService,
 Service,
 Permission
} from "@/cool";

@Service("app/commodity/ticket")
export default class extends BaseService {
 ticketNumCheck(data) {
  return this.request({
   url: "/ticketNumCheck",
   method: "POST",
   data
  })
 }
}