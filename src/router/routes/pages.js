// 页面路由，用于整个屏幕区域展示

export default [
	{
		path: "/login",
		name: "login",
		component: () => import("@/pages/login/index.vue")
	},

	{
		path: "/403",
		name: "403",
		component: () => import("@/pages/403/index.vue")
	},
	{
		path: "/404",
		name: "404",
		component: () => import("@/pages/404/index.vue")
	},
	{
		path: "/500",
		name: "500",
		component: () => import("@/pages/500/index.vue")
	},
	{
		path: "/503",
		name: "503",
		component: () => import("@/pages/503/index.vue")
	}
];
