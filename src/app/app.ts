import App from "./blocks/App/index.js";
import registerUIPartials, { UI } from "./ui.js";

import AuthAPI from "./api/AuthAPI.js";
import { USERS_DATA } from "./data.js";
import { utils } from "../utils/index.js";
import Store from "../utils/Store/index.js";

// const INIT_DATA = utils.GEN.getInitData();

registerUIPartials(UI);

export const app = new App();
export const store = Store;

// const app = new App();

function getNewUser(id: number | string) {
	return {
		"first_name": `user${id}`,
		"second_name": `user${id}`,
		"login": `user${id}login`,
		"email": `user${id}@com.com`,
		"password": `user${id}_Passw0rd`,
		"phone": "+71234567890"
	}
}

const currentUser = getNewUser(10);
// utils.printObject(currentUser);
// console.log('currentUser', currentUser)
// console.log('login', currentUser.login)
// console.log('password', currentUser.password)

const step = 500

// setTimeout(() => AuthAPI.logout(), 1 * step)

// setTimeout(() => AuthAPI.signup(currentUser), 2 * step)

// setTimeout(() => AuthAPI.signin(currentUser), 2 * step)

// setTimeout(() => AuthAPI.getAuthUser(), 3 * step)

// setTimeout(() => AuthAPI.logout(), 4 * step)

// setTimeout(() => AuthAPI.signin(USERS_DATA.user1), 5 * step)

// setTimeout(() => AuthAPI.getAuthUser(), 6 * step)
