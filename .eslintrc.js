module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ["plugin:vue/essential"],
	rules: {
		"no-console": "off",
		"comma-dangle": 'off',
		"trailing-comma":"off"
	},
	parserOptions: {
		parser: "@typescript-eslint/parser"
	}
};
