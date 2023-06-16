// module.exports = {
// 	"env": {
// 		"browser": true,
// 		"es2021": true
// 	},
// 	"extends": [
// 		"eslint:recommended",
// 		"plugin:@typescript-eslint/recommended",
// 		"plugin:react/recommended"
// 	],
// 	"parser": "@typescript-eslint/parser",
// 	"parserOptions": {
// 		"ecmaVersion": "latest",
// 		"sourceType": "module"
// 	},
// 	"plugins": [
// 		"@typescript-eslint",
// 		"react"
// 	],
// 	"rules": {
// 		"no-unused-vars": 2,
// 		"max-len": [1, 80],
// 		"max-params": [2, 3],
// 		"indent": [
// 			"error",
// 			"tab"
// 		],
// 		"linebreak-style": [
// 			"error",
// 			"windows"
// 		],
// 		"quotes": [
// 			"error",
// 			"double"
// 		],
// 	}
// }

module.exports = {
	"rules": {
		"no-unused-vars": 2,
		"max-len": [1, 80],
		"max-params": [2, 3],
	},
	"plugins": [
		"@typescript-eslint",
		"react"
	],
}
