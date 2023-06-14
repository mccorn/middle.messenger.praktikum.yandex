import Handlebars, { compile } from "handlebars"
import Block from "../utils/Block.js";
import App from "./blocks/App/index.js";
import LoginPage from "./pages/LoginPage/index.js";
// import { utils } from "../utils";
// import App from "./blocks/App";

// const env = {
// 	devMode: true,
// }

// const INIT_DATA = {
// 	text: 'asdas',
// 	test: '123132',
// 	login: {
// 		login: 'login2',
// 		password: 'password',
// 	},
// 	register: {},
// 	profile: {},
// 	userData: {
// 		username: 'Andrew',
// 		authorize: false,
// 		chats: utils.GEN.getDataArrayChats(5),
// 		messages: utils.GEN.getArray(100, () => utils.GEN.getDataMessage(0))
// 	},
// 	error: {},
// }

// registerUI();

// const state = INIT_DATA
// const app = new App(Object.assign(state, env))

// document.addEventListener('DOMContentLoaded', () => utils.render("#app", app))
// document.addEventListener('DOMContentLoaded', () => innerTemplate("#app", app.render(state), state))

const template = `
<div class="{{className}}">
	{{child}}
</div>
`;

const profileTemplate1 = `
<div class="templateProfile {{className}}">
	{{child}}
	{{child1}}
	{{child2}}
</div>
`;

const profileTemplate = `
	<div>
		{{ userName }}
		{{{ button }}}
		{{{ child2 }}}
	</div>
`;

const source = "<div>{{text}}  {{ button }}</div>";

function render(query, block) {
	const root = document.querySelector(query);

	// Можно завязаться на реализации вашего класса Block
	root.appendChild(block.getContent());

	block.dispatchComponentDidMount();

	return root;
}

class Button extends Block {
	constructor(props) {
		// Создаём враппер DOM-элемент button
		super("button", props);
	}

	render() {
		// В данном случае render возвращает строкой разметку из шаблонизатора
		// return 'btn';
		return this.compile(template, this.props);
	}
}

class Profile extends Block {
	constructor(props) {
		// Создаём враппер DOM-элемент button
		super("section", props);
	}

	render() {
		return this.compile(profileTemplate, this.props);
		// return compile(profileTemplate)({
		// 	userName: this.props.userName,
		// 	button: this.props.button,
		// });
	}
}

let i = 0;
let j = 0;

const button = new Button({
	className: 'my-class1',
	child: 'Click me1',
	settings: { withInternalID: true },
	events: {
		click: () => console.log(i++)
	}
});

const button2 = new Button({
	className: 'my-class2',
	child: 'Click me2',
	events: {
		click: () => console.log(j++)
	}
});

const profile = new Profile({
	userName: 'profile',
	className: 'my-class2',
	button: button,
	// child: 'child',
	// child1: button,
	child2: button2,
});

// render(".app", button);
// render(".app", button2);
// render(".app", profile);


const loginPage = new LoginPage('article', {})

const app = new App('section', {
	userName: 'profile',
	button: button,
	loginPage: loginPage,
})


render("#app", app);
