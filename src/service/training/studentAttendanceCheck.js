import {
    BaseService,
    Service,
    Permission
} from "@/cool";

@Service({
    namespace:"app/studentAttendanceCheck",
    proxy:'/training'
})
export default class extends BaseService {

}