import { someObject } from "../const/types";
import EventBus from "./EventBus";

export class Socket {
	constructor(options: someObject) {
		const { userId, chatId, tokenValue } = options;
		const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${tokenValue}`);

		const ping = () => socket.send(JSON.stringify({
			content: '',
			type: 'message',
		}));

		function sendMessage(message: string) {
			socket.send(JSON.stringify({ type: 'message', content: message }))
		}

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

			socket.sendMessage = sendMessage;
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
			const objData = JSON.parse(event.data);

			if (Array.isArray(objData)) {
				if (socket.setData) socket.setData(objData)
			} else {
				if (socket.push) socket.push(objData)
			}

		});

		socket.addEventListener('error', event => {
			console.log('Ошибка', event.message);
		});

		return socket;
	}
}

export enum WSTransportEvents {
	message = "WSTransportEvents-message",
	error = "WSTransportEvents-error",
	close = "WSTransportEvents-close",
	open = "WSTransportEvents-open",
}

class WSTransport extends EventBus {
	private pingIntervalTimer: number | undefined;
	public url: string;
	public socket: WebSocket | undefined;

	constructor(url: string) {
		super();
		this.url = url; // `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${tokenValue}`
	}

	setupPing() {
		this.pingIntervalTimer = setInterval(this.ping, 100000);
	}

	removePing() {
		if (this.pingIntervalTimer) clearInterval(this.pingIntervalTimer)
	}

	ping() {
		this.send({ type: 'ping' });
	}

	sendMessage(content: string) {
		this.send({ type: 'message', content });
	}

	send(data: string | number | object) {
		if (!this.socket) {
			throw new Error('Socket is not connected');
		}

		this.socket.send(JSON.stringify(data));
	}

	getOld() {
		this.send({ content: 0, "type": "get old" });
	}

	connect() {
		if (this.socket) {
			throw new Error('Socket is already connected');
		}

		this.socket = new WebSocket(this.url);

		this.subscribe();
		this.setupPing();
	}

	subscribe() {
		const { socket } = this;

		if (!socket) return;

		socket.addEventListener('open', () => {
			console.log('Соединение установлено');			
			this.emit(WSTransportEvents.open);
		});

		socket.addEventListener('close', event => {
			if (event.wasClean) {
				console.log('Соединение закрыто чисто');
			} else {
				console.log('Обрыв соединения');
			}

			console.log(`Код: ${event.code} | Причина: ${event.reason}`);

			this.emit(WSTransportEvents.close);
			this.removePing();
		});

		socket.addEventListener('message', event => {
			this.emit(WSTransportEvents.message, JSON.parse(event.data));
		});

		socket.addEventListener('error', event => {
			this.emit(WSTransportEvents.error, event);
			console.log('Ошибка', event.message);
		});

	}
}

export default WSTransport
