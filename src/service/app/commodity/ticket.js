import {
 BaseService,
 Service,
 Permission
} from "@/cool";

@Service("app/commodity/ticket")
export default class extends BaseService {
 @Permission('ticketNumCheck')
 ticketNumCheck(data) {
  return this.request({
   url: "/ticketNumCheck",
   method: "POST",
   data
  })
 }
}