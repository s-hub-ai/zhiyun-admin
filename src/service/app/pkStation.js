import {
    BaseService,
    Service,
    Permission
   } from "@/cool";

@Service({
	namespace:"app/pkStation"
})
export default class extends BaseService {

    @Permission("createPkStation")
	createPkStation(data) {
		return this.request({
			url: "/createPkStation",
			method: "post",
			data
		});
	}
	@Permission("page")
	page(params) {
		console.log("pappapage")
	 return this.request({
	  url: "/page",
	  method: "get",
	  params
	 });
	}
}