export interface IEventBus {
	listeners: { [key: string]: FunctionStringCallback[] };
	on: FunctionStringCallback;
	off: FunctionStringCallback;
	emit: FunctionStringCallback;
	// on: (eventName: string, callback: FunctionStringCallback) => void;
	// off: (eventName: string, callback: FunctionStringCallback) => void;
	// emit: (eventName: string, ...args: any) => void;
}

export default class EventBus implements IEventBus {
	listeners: { [key: string]: FunctionStringCallback[] } = {};

	on(eventName: string, callback: FunctionStringCallback): void {
		if (!this.listeners[eventName]) this.listeners[eventName] = [];

		this.listeners[eventName].push(callback)
	}

	off(eventName: string, callback: FunctionStringCallback): void {
		if (!this.listeners[eventName]) return;

		this.listeners[eventName] = this.listeners[eventName].filter(node => node !== callback)
	}

	emit(eventName: string, ...args: any): void {
		if (!this.listeners[eventName]) return;

		this.listeners[eventName].forEach(listener => listener(...args))
	}
}
