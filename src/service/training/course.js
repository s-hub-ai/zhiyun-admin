import {
    BaseService,
    Service,
    Permission
} from "@/cool";

@Service({
    namespace:"app/course",
    proxy:'/training'
})
export default class extends BaseService {

}