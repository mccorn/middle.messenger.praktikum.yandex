import App from "./blocks/App/index.js";
// import { utils } from "../utils/index.js";
import registerUIPartials, { UI } from "./ui.js";
// import Router from "../utils/Router/index.js";
// import HomePage from "./pages/HomePage/index.js";
// import LoginPage from "./pages/LoginPage/index.js";
// import Route from "../utils/Router/Route.js";

// const INIT_DATA = utils.GEN.getInitData();

registerUIPartials(UI);

// const app = new App("section", INIT_DATA)

// utils.render("#app", app);

const app = new App()


