import Vue from "vue";

import { PermissionDirective, checkPerm } from "./permission";
import { Service, Permission } from "./decorator/service";
import { BaseService } from "./request/service";
import * as utils from "./utils";

import "./common";
import "./components";
import "./directive";

Vue.use(PermissionDirective);

export { Service, Permission, BaseService, checkPerm, utils };
