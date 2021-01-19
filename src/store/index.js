import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import app from "./modules/app";
import process from "./modules/process";
import menu from "./modules/menu";
import user from "./modules/user";
import mall from "./modules/mall";
import common from "./modules/common";
Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		app,
		process,
		menu,
		user,
		mall,
		common,
		main: {
			actions: {
				appLoad() {
					if (store.state.user.token) {
						store.dispatch("permMenu");
						store.dispatch("userInfo");
						store.dispatch("getFanClubRegion")
						store.dispatch("getFanClub")


					}
				}
			}
		}
	},
	getters
});

export default store;