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
		let spec = value;
		try {
			spec = eval("(" + value + ")");

			for (let i in spec) {
				arr.push(spec[i]);
			}
			spec = arr.join(',')

			return spec
		} catch (e) {
			console.log(e)
			return spec
		}

	} else {
		return "默认规格";
	}
});

Vue.filter("fixed", (value) => {
	console.log(value);
	value = value ? value : 0;
	return parseFloat(value.toFixed(2))
});