module.exports = {
	env: {
		"browser": true,
		node: true,
		es6: true
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	parser: '@typescript-eslint/parser',
	plugins: ["@typescript-eslint", "import"],
	root: true,
	rules: {
		'@typescript-eslint/no-var-requires': 0,
		'@typescript-eslint/no-explicit-any': "warn"
	}
};