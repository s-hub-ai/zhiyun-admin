import {
    BaseService,
    Service,
    Permission
} from "@/cool";

@Service({
    namespace:"app/coach",
    proxy:'/training'
})
export default class extends BaseService {
    @Permission("export")
    export (data) {
        return this.request({
        url: "/export",
        method: "POST",
        data
        })
    }
    @Permission("detail")
    detail (params) {
        return this.request({
        url: "/detail",
        method: "get",
        params
        })
    }
}   