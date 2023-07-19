import "./styles.less";

import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import ProfilePage from "../../pages/ProfilePage";
import HomePage from "../../pages/HomePage";
import Error404Page from "../../pages/Error404Page";
import Error500Page from "../../pages/Error500Page";

import Router from "../../../utils/Router";
// import AuthAPI from "../../api/AuthAPI";
import ProfilePageController from "../../controllers/ProfilePageController";

// window.authAPI = AuthAPI;

export default class App {
	constructor() {
		ProfilePageController.setData(); // TODO: переименуй или перенеси
		const router = new Router();
		
		router
			.use("/login", LoginPage)
			.use("/register", RegisterPage)
			.use("/profile", ProfilePage, true)
			.use("/", HomePage, true)
			.use("/error404", Error404Page)
			.use("/error500", Error500Page)
			.start();

		return router
	}
}
