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

}