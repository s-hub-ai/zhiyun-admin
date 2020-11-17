import {
    BaseService,
    Service,
    Permission
   } from "@/cool";

@Service("app/delivery")
export default class extends BaseService {
    @Permission("checkDeliverList")
    checkList(data){
        return this.request({
            url: "/list",
            method: "POST",
            data
        })
    }
}