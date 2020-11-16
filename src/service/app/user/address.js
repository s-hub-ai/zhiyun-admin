import {
	BaseService,
	Service
} from "@/cool";

@Service("app/user/address")
export default class extends BaseService {
	default () {
		return this.request({
			url: "/default"
		});
	}
}