import App from "./blocks/App/index.js";
import UserController from "./controllers/UserController.js";
import registerUIPartials, { UI } from "./ui.js";

// const INIT_DATA = utils.GEN.getInitData();

registerUIPartials(UI);

const app = new App()

function getNewUser(id: number | string) {
	return {
		"first_name": `user${id}`,
		"second_name": `user${id}`,
		"login": `user${id}login`,
		"email": `user${id}@com.com`,
		"password": `user${id}_P@ssw0rd`,
		"phone": "+71234567890"
	}
}

const currentUser = getNewUser(9);
console.log('currentUser', currentUser)

const userController = new UserController();

setTimeout(() => userController.logout(), 0)

// setTimeout(() => userController.signup(currentUser), 1000)

// setTimeout(() => userController.logout(), 2000)

setTimeout(() => userController.signin(currentUser), 100)

// setTimeout(() => userController.getAuthUser(), 0)
