import "./styles.less";

import Block from "../../../utils/Block";

import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import ProfilePage from "../../pages/ProfilePage";
import HomePage from "../../pages/HomePage";
import Error404Page from "../../pages/Error404Page";
import Error500Page from "../../pages/Error500Page";

import template from "./index.tmpl";
import Route from "../../../utils/Router/Route";
import Router from "../../../utils/Router";
import { HTTPTransport } from "../../../utils/fetch";

// export default class App extends Block {
// 	__render() {
// 		const { pathname } = window.location;
// 		let component;

// 		switch (pathname) {
// 		case "/login": component = new LoginPage("section", { data: this.props.login }); break;
// 		case "/register": component = new RegisterPage("section", { data: this.props.register }); break;
// 		case "/profile": component = new ProfilePage("section", { data: this.props.profile }); break;
// 		case "/home": component = new HomePage("section", { data: this.props.userData }); break;
// 		case "/error404": component = new Error404Page("section"); break;
// 		case "/error500": component = new Error500Page("section"); break;
// 		case "/": window.location.replace("/home"); break;

// 		default: window.location.replace("/error404");
// 		}

// 		return component ? component.render() : "app error";
// 	}

// 	render() {
// 		this.children.loginPage = (new Route('/home', LoginPage, { data: this.props.login })).render();
// 		this.children.registerPage = (new Route('/home', RegisterPage, { data: this.props.register })).render();
// 		this.children.profilePage = (new Route('/home', ProfilePage, { data: this.props.profile })).render();
// 		this.children.homePage = (new Route('/home', HomePage, { data: this.props.userData })).render();
// 		this.children.error404Page = (new Route('/home', Error404Page, {})).render();
// 		this.children.error500Page = (new Route('/home', Error500Page, {})).render();

// 		return this.compile(template, this.props);
// 	}
// }


export default class App {
	constructor() {
		const router = new Router();

		router
			.use("/login", LoginPage)
			.use("/register", RegisterPage)
			.use("/profile", ProfilePage)
			.use("/", HomePage)
			.use("/error404", Error404Page)
			.use("/error500", Error500Page)
			.start();

		return router
	}
}
