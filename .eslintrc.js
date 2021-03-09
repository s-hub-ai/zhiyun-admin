module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ["plugin:vue/essential"],
	rules: {
		"no-console": "off",
		"comma-dangle": [2, "never"],
		"trailing-comma":"off"
	},
	parserOptions: {
		parser: "@typescript-eslint/parser"
	}
};
