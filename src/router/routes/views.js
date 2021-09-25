// 视图路由，用于中间区域展示

export default [{
		path: "/",
		name: "欢迎使用",
		component: () => import("@/Home.vue")
	},
	{
		path: "/my/info",
		name: "用户信息",
		component: () => import("@/pages/my/info.vue")
	},
	{
		path: "/components",
		name: "组件库",
		component: () => import("@/views/workbench/ui-components.vue")
	}
];