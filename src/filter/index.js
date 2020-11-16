import Vue from "vue";

Vue.filter("default_avatar", function (url) {
	if (!url) {
		return require("@/assets/icon/default-avatar.png");
	}

	return url;
});
Vue.filter("default", function (s) {
	if (!s) {
		return '-'
	}

	return s;
});
Vue.filter("default_name", function (name) {
	if (!name) {
		return "未命名";
	}

	return name;
});

Vue.filter("format_spec", value => {
	if (value) {
		let arr = [];
		let spec = eval("(" + value + ")");;

		for (let i in spec) {
			arr.push(spec[i]);
		}

		return arr.join(",");
	} else {
		return "默认规格";
	}
});