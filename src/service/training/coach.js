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

}   