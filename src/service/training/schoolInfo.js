import {
    BaseService,
    Service,
    Permission
} from "@/cool";
//咨询管理
@Service({
    namespace: "app/schoolInfo",
    proxy: '/training'
})

export default class extends BaseService {
    @Permission("listProvince")
    listProvince () {
            return this.request({
            url: "/listProvince",
            method: "get"
        })
    }
    @Permission("listCity")
    listCity (params) {
            return this.request({
            url: "/listCity",
            method: "get",
            params
        })
    }
    @Permission("listCounty")
    listCounty (params) {
            return this.request({
            url: "/listCounty",
            method: "get",
            params
        })
    }
    @Permission("listTown")
    listTown (params) {
            return this.request({
            url: "/listTown",
            method: "get",
            params
        })
    }
    @Permission("listSchool")
    listSchool (params) {
            return this.request({
            url: "/listSchool",
            method: "get",
            params
        })
    }
    @Permission("delete")
    delete (data) {
        return this.request({
            url:"/delete",
            method: "post",
            data
        })
    }
    @Permission("getSchool")
    getSchool (params) {
        return this.request({
        url: "/getSchool",
        method: "get",
        params
        })
    }
    @Permission("listSchoolTree")
    listSchoolTree (){
        return this.request({
            
            url:"/listSchoolTree",
            method: "get"
            
        })
    }
}