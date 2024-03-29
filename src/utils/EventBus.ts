export interface IEventBus {
	listeners: { [key: string]: FunctionStringCallback[] };
	on: (eventName: string, callback: (...args: any) => unknown) => void;
	off: (eventName: string, callback: (...args: any) => unknown) => void;
	emit: (eventName: string, ...args: any) => void;
}

export default class EventBus implements IEventBus {
	listeners: { [key: string]: FunctionStringCallback[] } = {};

	on(eventName: string, callback: (...args: any) => unknown): void {
		if (!this.listeners[eventName]) this.listeners[eventName] = [];

		this.listeners[eventName].push(callback)
	}

	off(eventName: string, callback: (...args: any) => unknown): void {
		if (!this.listeners[eventName]) return;

		this.listeners[eventName] = this.listeners[eventName].filter(node => node !== callback)
	}

	emit(eventName: string, ...args: any): void {
		if (!this.listeners[eventName]) return;

		this.listeners[eventName].forEach(listener => listener(args))
	}
}
