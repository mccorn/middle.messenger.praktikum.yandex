export default class EventBus {
	constructor() {
		this.listeners = {};
	}

	on(eventName, callback) {
		if (!this.listeners[eventName]) this.listeners[eventName] = [];

		this.listeners[eventName].push(callback)
	}

	off(eventName, callback) {
		if (!this.listeners[eventName]) return;

		this.listeners[eventName] = this.listeners[eventName].filter(node => node !== callback)
	}

	emit(eventName, ...args) {
		if (!this.listeners[eventName]) return;

		this.listeners[eventName].forEach(listener => listener(...args))
	}
}
