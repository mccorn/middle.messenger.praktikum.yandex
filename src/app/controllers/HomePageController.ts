import { someObject } from "../../const/types";
import Store from "../../utils/Store";
import ChatAPI from "../api/ChatAPI";
import ProfilePageController from "./ProfilePageController";

class Socket {
	constructor(options: someObject) {
		const {userId, chatId, tokenValue} = options;
		const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${tokenValue}`);

		const ping = () => socket.send(JSON.stringify({
			content: '',
			type: 'message',
		}));

		socket.addEventListener('open', () => {
			console.log('Соединение установлено');
		
			// socket.send(JSON.stringify({
			// 	content: userId + ':Моё первое сообщение миру!',
			// 	type: 'message',
			// }));

			socket.send(JSON.stringify({
				content: 0,
				"type": "get old",
			}));

			// setInterval(ping, 100000); // TODO: Раскоментировать в проде
		});
		
		socket.addEventListener('close', event => {
			if (event.wasClean) {
				console.log('Соединение закрыто чисто');
			} else {
				console.log('Обрыв соединения');
			}
		
			console.log(`Код: ${event.code} | Причина: ${event.reason}`);
		});
		
		socket.addEventListener('message', event => {
			switch (typeof event.data) {
				case 'string': {
					console.log('Получены данные', JSON.parse(event.data) );

					if (socket.setData) socket.setData(JSON.parse(event.data))
					break;
				}
				case 'object': {
					const {content} = event.data;

					if (content) console.log('Получены данные', content );
					break;
				}
				default: {
					console.log('Получены данные', event.data, );
				}
			}
			
		});
		
		socket.addEventListener('error', event => {
			console.log('Ошибка', event.message);
		}); 

		return socket;
	}
}

class HomePageController {
	setData() {
		const promise = ChatAPI.request();
		const {userData = {}} = Store.getState();
		
		promise.then((response) => {
			const data = JSON.parse(response.response)
			Store.set('chats', data)

			console.log('HomePageController setData', Store.getState())
			return data;
		}).then(data => {
			data.forEach((node: someObject) => {
				this
					.getTokenPromise(node.id)
					.then(response => {
						node.token = JSON.parse(response.response).token;
						node.socket = new Socket({userId: userData.id, chatId: node.id, tokenValue: node.token});
						node.socket.setData = (data: someObject) => {if (data) node.messages = data};

						console.log(node)
				
						return node
					})
			})
		});
	}

	getTokenPromise(id: string | number) {
		return ChatAPI.getToken(id);
	}

	getSocket(data: someObject) {		
		return new Socket(data);
	}

}

export default new HomePageController();
