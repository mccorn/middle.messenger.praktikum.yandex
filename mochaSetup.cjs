/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const {JSDOM} = require('jsdom');

const {window} = new JSDOM('<div id="app"></div>', {url: "http://localhost:5173"});

global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;
global.FormData = window.FormData;

require.extensions[".less"] = function () {
	module.export = () => ({});
}
