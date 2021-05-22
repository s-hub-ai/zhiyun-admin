import {
    BaseService,
    Service,
    Permission
   } from "@/cool";

@Service("app/pkStation")
export default class extends BaseService {

    @Permission("createPkStation")
	createPkStation(data) {
		return this.request({
			url: "/createPkStation",
			method: "post",
			data
		});
	}
}