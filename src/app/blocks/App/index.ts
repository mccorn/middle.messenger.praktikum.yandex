import "./styles.less";

import Block from "../../../utils/Block.js";

import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import ProfilePage from "../../pages/ProfilePage";
import HomePage from "../../pages/HomePage";
import Error404Page from "../../pages/Error404Page";
import Error500Page from "../../pages/Error500Page";

export default class App extends Block {
	render() {
		const { pathname } = window.location;
		let component;

		switch (pathname) {
			case '/login': component = new LoginPage({data: this.props.login}); break;
			case '/register': component = new RegisterPage({data: this.props.register}); break;
			case '/profile': component = new ProfilePage({data: this.props.profile}); break;
			case '/home': component = new HomePage({data: this.props.userData}); break;
			case '/error404': component = new Error404Page(); break;
			case '/error500': component = new Error500Page(); break;

			default: window.location.replace("/error404");
		}

		return component ? component.render() : null;
		// return (new Login({data: this.props.login})).render();
		// return pageName ? getPage(pageName, { data: this.props[pageName] }) : 'app';
		// return tmpl({component: (new Login()).render(), data: this.props, pathname: pathname.slice(1)});
	}
}
