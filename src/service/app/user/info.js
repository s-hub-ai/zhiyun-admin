import {
 BaseService,
 Service,
 Permission
} from "@/cool";
@Service("app/user/info")
export default class extends BaseService {
    @Permission("updateScore")
    updateScore(data){
        return this.request({
            url: "/updateScore",
            method: "POST",
            data
        })
    }
 personal() {
  return this.request({
   url: "/personal"
  });
 }
 modify(data) {
  return this.request({
   url: "/modify",
   method: "POST",
   data
  });
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