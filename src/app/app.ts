import App from "./blocks/App/index.js";
import registerUIPartials, { UI } from "./ui.js";

import Store from "../utils/Store/index.js";

registerUIPartials(UI);

export const app = new App();
export const store = Store;
