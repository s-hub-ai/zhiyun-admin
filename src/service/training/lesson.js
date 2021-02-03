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

}