
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

const locale = "ru-Ru"

Handlebars.registerHelper("formattedTime", function(time) {
	console.log('formattedTime', time);

	const date = new Date(time);
	const now = new Date();

	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

	const optionsShort = {
		timezone: 'UTC',
		hour: 'numeric',
		minute: 'numeric',
	};
	const optionsLong = {
		timezone: 'UTC',
		day: 'numeric',
		month: 'numeric',
		weekday: 'short',
	};
	const options = date > today ? optionsShort : optionsLong;

  return new Handlebars.SafeString('<div class="date">' + date.toLocaleString(locale, options as never) + "</div>");
});

export default registerUIPartials
