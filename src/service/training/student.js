import {
    BaseService,
    Service,
    Permission
} from "@/cool";

@Service({
    namespace:"app/student",
    proxy:'/training'
})
export default class extends BaseService {
    @Permission("addBatch")
    addBatch (data) {
        return this.request({
        url: "/addBatch",
        method: "POST",
        data
        })
    }
}   