import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Block.js";

export default class App extends Block {
	render() {
		const { pathname } = window.location;

		switch (pathname) {
			// case '/login': innerTemplate("#app", login.render(), data.login); break;
			// case '/register': innerTemplate("#app", RegisterPage, data.register); break;
			// case '/profile': innerTemplate("#app", ProfilePage, data.profile); break;
			// case '/home': innerTemplate("#app", HomePage, data.userData); break;
			// case '/': innerTemplate("#app", HomePage, data.userData); break;
			// case '/error404': innerTemplate("#app", Error404Page, data.error); break;
			// case '/error500': innerTemplate("#app", Error500Page, data.error); break;

			// case '/nav': {
			// 	env.devMode ? innerTemplate("#app", greetingTmpl, INIT_DATA) : window.location.replace("/home");
			// 	break;
			// }

			// default: window.location.replace(env.devMode ? "/nav" : "/home");
		}

		return typeof tmpl === 'function' ? tmpl(this.props) : tmpl;
		// return tmpl({component: (new Login()).render(), data: this.props, pathname: pathname.slice(1)});
	}
}
