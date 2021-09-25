import {
    BaseService,
    Service,
    Permission
   } from "@/cool";
   //咨询管理
   @Service({
    namespace:"app/school",
    proxy:'/training'
    })

   export default class extends BaseService {
   
   }