import {
    BaseService,
    Service,
    Permission
   } from "@/cool";
   //咨询管理
   @Service({
    namespace:"app/county",
    proxy:'/training'
    })

   export default class extends BaseService {
   
   }