import {
    BaseService,
    Service,
    Permission
} from "@/cool";

@Service({
    namespace:"app/classroom",
    proxy:'/training'
})
export default class extends BaseService {
    @Permission("addStudent")
    addStudent  (data) {
        return this.request({
        url: "/addStudent",
        method: "POST",
        data
        })
    }

    @Permission("addCoach")
    addCoach (data) {
        return this.request({
        url: "/addCoach",
        method: "POST",
        data
        })
    }
    @Permission("addCourse")
    addCourse (data) {
        return this.request({
        url: "/addCourse",
        method: "POST",
        data
        })
    }
    @Permission("listCourse")
    listCourse(params){
        return this.request({
            url: "/listCourse",
            method: "GET",
            params
        })
    }
    @Permission("updateCourse")
    updateCourse(data){
        return this.request({
            url: "/updateCourse",
            method: "POST",
            data
        })
    }
    @Permission("deleteCourse")
    deleteCourse(data){
        return this.request({
            url: "/deleteCourse",
            method: "POST",
            data
        })
    }
}