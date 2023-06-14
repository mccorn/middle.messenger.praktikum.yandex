import "./styles.less";

import Block from "../../../utils/Block.js";

import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import ProfilePage from "../../pages/ProfilePage";
import HomePage from "../../pages/HomePage";
import Error404Page from "../../pages/Error404Page";
import Error500Page from "../../pages/Error500Page";
import Button from "../../components/Button";

export default class App extends Block {
	render() {
		const { pathname } = window.location;
		let component;

		switch (pathname) {
			case '/login': component = new LoginPage('section', { data: this.props.login }); break;
			case '/register': component = new RegisterPage('section', { data: this.props.register }); break;
			case '/profile': component = new ProfilePage('section', { data: this.props.profile }); break;
			case '/home': component = new HomePage('section', { data: this.props.userData }); break;
			case '/error404': component = new Error404Page('section'); break;
			case '/error500': component = new Error500Page('section'); break;

			default: window.location.replace("/error404");
		}

		return component.render(this.props);
	}
}
