import {
    BaseService,
    Service,
    Permission
} from "@/cool";
@Service("app/user/info")
export default class extends BaseService {
    //更新积分
    @Permission("updateScore")
    updateScore(data) {
        return this.request({
            url: "/updateScore",
            method: "POST",
            data
        })
    }
    //导出数据
    @Permission("export")
    export (data) {
        return this.request({
            url: "/export",
            method: "POST",
            data
        })
    }
    ocr(data) {
        return this.request({
            url: "/ocr",
            method: "POST",
            data
        });
    }
    certification(data) {
        return this.request({
            url: "/certification",
            method: "POST",
            data
        });
    }
    saveCertification(data) {
        return this.request({
            url: "/saveCertification",
            method: "POST",
            data
        });
    }
}