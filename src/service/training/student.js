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
    @Permission("addClassrooms")
    addClassrooms (data) {
        return this.request({
        url: "/addClassrooms",
        method: "POST",
        data
        })
    }
}   