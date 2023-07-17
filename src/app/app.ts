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
