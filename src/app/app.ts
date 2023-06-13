import { compile } from "handlebars"

import greetingTmpl from "./templates/greeting.tmpl";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import Error404Page from "./pages/Error404Page";
import Error500Page from "./pages/Error500Page";

import registerUI from "./ui";
import { utils } from "../utils";
import App from "./blocks/App";

const env = {
	devMode: true,
}

const INIT_DATA = {
	text: 'asdas',
	test: '123132',
	login: {
		login: 'login2',
		// password: 'password',
	},
	register: {},
	profile: {},
	userData: {
		username: 'Andrew',
		authorize: false,
		chats: utils.GEN.getDataArrayChats(5),
		messages: utils.GEN.getArray(100, () => utils.GEN.getDataMessage(0))
	},
	error: {},
}

export const innerTemplate = (selector = "#app", templateFunc = greetingTmpl, data = {}) => {
	const root = document.querySelector(selector);
	const template = compile(templateFunc);

	if (root) root.innerHTML = template(data);
}

registerUI();

const state = INIT_DATA
const app = new App(Object.assign(state, env))

document.addEventListener('DOMContentLoaded', () => utils.render("#app", app))
// document.addEventListener('DOMContentLoaded', () => innerTemplate("#app", app.render(state), state))

setTimeout(() => {
	
	// app.setProps({
  //   login: {
	// 		login: 'Click me, please',
	// 	}
  // });

	// console.log('setTimeout', app.props)
}, 3000);

setTimeout(() => {
	
	// app.setProps({
  //   login: {
	// 		password: 'Click me, please, too',
	// 	}
  // });

}, 5000);

