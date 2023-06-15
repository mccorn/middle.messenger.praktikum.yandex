import App from "./blocks/App/index.js";
import { utils } from "../utils/index.js";
import registerUIPartials from "./ui.js";

// const env = {
// 	devMode: true,
// }

const chats = utils.GEN.getDataArrayChats(5);

const INIT_DATA = {
	text: 'asdas',
	test: '123132',
	login: {
		login: 'login2',
		password: 'password',
	},
	register: {},
	profile: {},
	userData: {
		username: 'Andrew',
		authorize: false,
		chats,
		messages: utils.GEN.getArray(100, utils.GEN.getDataMessage)
	},
	error: {},
}

registerUIPartials();

const app = new App('section', INIT_DATA)

utils.render("#app", app);
