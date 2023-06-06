import { compile } from "handlebars"

import greetingTmpl from "./templates/greeting.tmpl";

import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ProfilePage from "./pages/Profile";
import Error404Page from "./pages/Error404";
import Error500Page from "./pages/Error500";

import registerUI from "./ui";

const env = {
	devMode: true,
}

const INIT_DATA = {
	login: {},
	register: {},
	profile: {},
	userData: {
		username: 'Andrew',
		authorize: false,
	},
	error: {},
}

export const innerTemplate = (selector = "#app", templateFunc = greetingTmpl, data = {}) => {
	const root = document.querySelector(selector);
	const template = compile(templateFunc);

	root.innerHTML = template(data);
}

registerUI();

const renderApp = (data = INIT_DATA) => {
	const { pathname } = window.location;

	console.log('pathname', pathname)
	switch (pathname) {
		case '/login': innerTemplate("#app", LoginPage, data.login); break;
		case '/register': innerTemplate("#app", RegisterPage, data.register); break;
		case '/profile': innerTemplate("#app", ProfilePage, data.profile); break;
		case '/home': innerTemplate("#app", HomePage, data.userData); break;
		case '/': innerTemplate("#app", HomePage, data.userData); break;
		case '/error404': innerTemplate("#app", Error404Page, data.error); break;
		case '/error500': innerTemplate("#app", Error500Page, data.error); break;

		case '/nav': {
			env.devMode ? innerTemplate("#app", greetingTmpl, INIT_DATA) : window.location.replace("/home");
			break;
		}

		// default: window.location.replace(env.devMode ?  "/nav" : "/home");
		default: window.location.replace(env.devMode ? "/nav" : "/");
	}

	// innerTemplate("#app", Error500Page, data.error);
}

document.addEventListener('DOMContentLoaded', () => renderApp())