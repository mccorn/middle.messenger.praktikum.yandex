import EventBus from "./EventBus";

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
		this.pingIntervalTimer = setInterval(this.ping.bind(this), 10000);
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
		if (!this.socket) {
			throw new Error('Socket is not connected');
		}

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
			this.getOld();
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

const DEFAULT_WS_URL = 'wss://ya-praktikum.tech/ws';
const CHATS_WS_URL = DEFAULT_WS_URL + '/chats';

export class ChatsTransport extends WSTransport {
	constructor(url: string) {
		super(CHATS_WS_URL + url)
	}
}

export default WSTransport
