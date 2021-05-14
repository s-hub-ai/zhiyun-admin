import {
    BaseService,
    Service,
    Permission
} from "@/cool";

@Service({
    namespace:"app/student",
    
})
export default class extends BaseService {
    @Permission("getSchool")
    addClassrooms (data) {
        return this.request({
        url: "/getSchool",
        method: "get",
        data
        })
    }
    @Permission("listSchool")
    listSchool (){
        return this.request({
            
            url:"/listSchool",
            method: "get"
            
        })
    }
}