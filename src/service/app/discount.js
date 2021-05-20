import {
    BaseService,
    Service,
    Permission
} from "@/cool";
   
@Service("app/discount")
export default class extends BaseService {
    
    @Permission("createDiscount")
    createDiscount (data) {
        return this.request({
            url: "/createDiscount",
            method: "POST",
            data
        })
    }
}