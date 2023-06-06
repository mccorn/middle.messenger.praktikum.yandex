
import Handlebars from "handlebars"

import buttonTmpl from "./partials/button/button.tmpl";
import inputTextTmpl from "./partials/inputText/inputText.tmpl";
import inputTextWithLabelTmpl from "./partials/inputText/inputTextWithLabel.tmpl";

const UI = {
	button: buttonTmpl,
	inputText: inputTextTmpl,
	inputTextWithLabel: inputTextWithLabelTmpl,
}

const registerUIPartials = () => {
	for (let keyName in UI) {
		Handlebars.registerPartial(keyName, UI[keyName])
	}
}

export default registerUIPartials