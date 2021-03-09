import {
    BaseService,
    Service,
    Permission
} from "@/cool";

@Service({
    namespace:"app/coachAttendanceCheck",
    proxy:'/training'
})
export default class extends BaseService {

}