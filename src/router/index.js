import Vue from "vue";
import VueRouter from "vue-router";
import Store from "@/store/index";
import { routerMode } from "@/config/env";
import routes from "./routes/pages";

Vue.use(VueRouter);

const ignore = {
	token: ["/login", "/403", "/404", "/500", "/503"]
};

const Router = new VueRouter({
	mode: routerMode || "history",
	base: process.env.BASE_URL,
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return { x: 0, y: 0 };
		}
	}
});

// Add process
Router.beforeEach((to, from, next) => {
	if (Store.state.user.token) {
		Store.commit("ADD_PROCESS", {
			label: to.name,
			value: to.fullPath
		});
	} else {
		if (!ignore.token.some((e) => to.path.includes(e))) {
			return next("/login");
		}
	}

	next();
});

// Remove Navigating to current location (XXX) is not allowed
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return routerPush.call(this, location).catch((error) => error);
};

export default Router;
