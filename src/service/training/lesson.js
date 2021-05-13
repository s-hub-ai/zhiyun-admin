import {
    BaseService,
    Service,
    Permission
} from "@/cool";

@Service({
    namespace:"app/lesson",
    proxy:'/training'
})
export default class extends BaseService {
    @Permission("studentAbsenceReason")
    studentAbsenceReason (params) {
        return this.request({
        url: "/studentAbsenceReason",
        method: "get",
        params
        })
    }
    @Permission("coachAbsenceReason")
    coachAbsenceReason (params) {
        return this.request({
        url: "/coachAbsenceReason",
        method: "get",
        params
        })
    }
    @Permission("updateDateBatch")
    updateDateBatch (params) {
        return this.request({
        url: "/updateDateBatch",
        method: "post",
        data: {
            ...params
        }
        
        })
    }
}