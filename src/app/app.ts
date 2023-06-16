import App from "./blocks/App/index.js";
import { utils } from "../utils/index.js";
import registerUIPartials, { UI } from "./ui.js";
/**
 * Для ручного тестирования
 * import { testLogins, testNames, testPasswords, testPhones } from "../utils/tests.js";
 * testPhones();
 * testLogins();
 * testNames();
 * testPasswords();
 */

const INIT_DATA = utils.GEN.getInitData();

registerUIPartials(UI);

const app = new App('section', INIT_DATA)

utils.render("#app", app);


