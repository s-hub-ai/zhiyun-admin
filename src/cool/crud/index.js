import Vue from "vue";
import Cl_CRUD from "cl-crud2";

export function SET_CRUD({ crud }) {
	Vue.use(Cl_CRUD, crud);
}
