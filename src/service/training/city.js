import {
    BaseService,
    Service,
    Permission
   } from "@/cool";
   //咨询管理
   @Service({
    namespace:"app/city",
    proxy:'/training'
    })

   export default class extends BaseService {
   
   }