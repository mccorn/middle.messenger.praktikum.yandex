const TIME_OPTIONS_DEFAULT = { hour: "2-digit", minute: "2-digit" };

const TEXTS = {
	0: `Отлично! Теперь мы будем присылать вам уведомления о занятиях Открытого лектория по направлению «Разработка интерфейсов». Каждый понедельник — дайджест занятий на неделю, а за час до лекции — ссылка для подключения.
	Если вы хотите выбрать ещё одно направление, нажмите на нужную кнопку. Чтобы отписаться от направления, нажмите на кнопку с его названием ещё раз.
	Приятного обучения!`,
}


const GENERATORS = {
	getArrayString: (length = 3) => Object.keys(new Array(length).fill(1)),
	getArrayNumbers: (length = 3) => GENERATORS.getArray(length, a => +a),
	getArray: (length = 3, callback = () => {}) => GENERATORS.getArrayString(length).map(callback),
	getDataMessage: (i, idx) => ({
		"text": Math.random() > 0.5 ? TEXTS[0] : `text_${i}_${idx}`,
		"date": (new Date()).toLocaleTimeString('ru-Ru', TIME_OPTIONS_DEFAULT),
		"me": Math.random() > 0.5,
		"isEdited": Math.random() > 0.5,
		"isRead": Math.random() > 0.5,
	}),
	getDataChat: (idx) => ({
		"avatarUrl": "https://n1s2.hsmedia.ru/6a/46/ae/6a46aeed947a183d67d1bc48211151bf/480x496_0xac120003_4430520541578509619.jpg",
		"name": "Chat Name " + idx,
		"messages": [
			GENERATORS.getDataMessage(idx, 0),
			GENERATORS.getDataMessage(idx, 1),
			GENERATORS.getDataMessage(idx, 2),
			GENERATORS.getDataMessage(idx, 3),
		],
		lastMessage: {
			"text": "text_last_" + idx,
			"date": (new Date()).toLocaleTimeString('ru-Ru', TIME_OPTIONS_DEFAULT),
		},
		noreadMessagesCounter: Math.round(Math.random() * 5)
	}),
	getDataArrayChats: () => GENERATORS.getArray(5, GENERATORS.getDataChat)
}

export const utils = {
	GEN: GENERATORS
}
