import {
    BaseService,
    Service,
    Permission
   } from "@/cool";
   //咨询管理
   @Service({
    namespace:"app/town",
    proxy:'/training'
    })

   export default class extends BaseService {
   
   }