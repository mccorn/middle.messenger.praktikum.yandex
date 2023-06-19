
import Handlebars from "handlebars"

import chatInfo from "./components/ChatInfo/index.tmpl";
import message from "./components/Message/index.tmpl";
import { someObject } from "../const/types";

export const UI = {
	chatInfo: chatInfo,
	message: message,
}

const registerUIPartials = (UI: someObject) => {
	for (const keyName in UI) {
		Handlebars.registerPartial(keyName, UI[keyName])
	}
}

export default registerUIPartials
