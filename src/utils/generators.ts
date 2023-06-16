import { someFunction } from "../const/types";

const TEXTS = [
	`Отлично! Теперь мы будем присылать вам уведомления о занятиях Открытого лектория по направлению «Разработка интерфейсов». Каждый понедельник — дайджест занятий на неделю, а за час до лекции — ссылка для подключения.
	Если вы хотите выбрать ещё одно направление, нажмите на нужную кнопку. Чтобы отписаться от направления, нажмите на кнопку с его названием ещё раз.
	Приятного обучения!`,
	"480x496_0xac120003_443052054157850480x496_0xac120003_44305205415785096199619"
]

const AVATARS = [
	"https://n1s2.hsmedia.ru/6a/46/ae/6a46aeed947a183d67d1bc48211151bf/480x496_0xac120003_4430520541578509619.jpg",
]

export const GENERATORS = {
	getRndElement: (arr: any[]): any => {
		const idx = GENERATORS.getRndInt(0, arr.length - 1);
		return arr[idx]
	},
	getRndInt: (min = 0, max = 1): number => Math.round(Math.random() * (max - min) + min),
	getArrayString: (length = 3) => Object.keys(new Array(length).fill(1)),
	getArrayNumbers: (length = 3) => GENERATORS.getArray(length, (a: any): number => Number.parseFloat(a)),
	getArray: (length = 3, callback: someFunction) => GENERATORS.getArrayString(length).map(callback),
	getDataMessage: (i: any, idx?: number) => ({
		"text": Math.random() > 0.5 ? GENERATORS.getRndElement(TEXTS) : `text_${i}_${idx}`,
		"date": (new Date()).toLocaleTimeString("ru-Ru", { hour: "2-digit", minute: "2-digit" }),
		"me": Math.random() > 0.5,
		"isEdited": Math.random() > 0.5,
		"isRead": Math.random() > 0.5,
	}),
	getDataChat: (i: any, idx: number) => ({
		"id": `Chat_${i}_${idx}`,
		"avatarUrl": GENERATORS.getRndElement(AVATARS),
		"name": "Chat Name " + idx,
		"messages": GENERATORS.getArray(5, GENERATORS.getDataMessage),
		lastMessage: {
			"text": "text_last_" + idx,
			"date": (new Date()).toLocaleTimeString("ru-Ru", { hour: "2-digit", minute: "2-digit" }),
		},
		noreadMessagesCounter: Math.round(Math.random() * 5)
	}),
	getDataArrayChats: (length: number) => GENERATORS.getArray(length, GENERATORS.getDataChat),
	getInitData: () => ({
		text: "asdas",
		test: "123132",
		login: {
			login: "login2",
			password: "password",
		},
		register: {},
		profile: {},
		userData: {
			username: "Andrew",
			authorize: false,
			chats: GENERATORS.getDataArrayChats(5),
			messages: GENERATORS.getArray(100, GENERATORS.getDataMessage)
		},
		error: {},
	})
}
