
import Handlebars from "handlebars"

// import buttonTmpl from "./partials/button/input.tmpl";
// import inputTextTmpl from "./partials/inputText/inputText.tmpl";
// import inputTextWithLabelTmpl from "./partials/inputText/inputTextWithLabel.tmpl";

import chatInfo from "./partials/chatInfo/index.tmpl";
// import inputArea from "./partials/inputArea/input.tmpl";
import message from "./partials/message/index.tmpl";
import { someObject } from "../const/types";

export const UI = {
	// button: buttonTmpl,
	// inputText: inputTextTmpl,
	// inputTextWithLabel: inputTextWithLabelTmpl,
	chatInfo: chatInfo,
	// inputArea: inputArea,
	message: message,
}

const registerUIPartials = (UI: someObject) => {
	for (let keyName in UI) {
		Handlebars.registerPartial(keyName, UI[keyName])
	}
}

export default registerUIPartials
