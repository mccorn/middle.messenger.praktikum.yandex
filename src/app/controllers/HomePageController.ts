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
		
			socket.send(JSON.stringify({
				content: userId + ':Моё первое сообщение миру!',
				type: 'message',
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
			const {content} = event.data;

			if (content) console.log('Получены данные', event.data);
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
