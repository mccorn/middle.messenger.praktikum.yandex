import { IEventBus } from "./EventBus";
import { someObject } from "../const/types";
import Block from "./Block";

export type META = {
	tagName: string,
	props: someObject,
}

// Нельзя создавать экземпляр данного класса
interface IBlock {
	_element: HTMLElement | null,
	_id: string,
	_isMounted: boolean,
	_meta: META,

	eventBus: () => IEventBus,
	children: someObject,
	props: someObject,
	state: someObject,

	// constructor: (tagName: string, propsAndChildren: someObject) => Block,

	// _getChildren(propsAndChildren: someObject) {
	// 	const children: someObject = {};
	// 	const props: someObject = {};

	// 	Object.entries(propsAndChildren).forEach(([key, value]) => {
	// 		if (value instanceof Block) {
	// 			children[key] = value;
	// 		} else {
	// 			props[key] = value;
	// 		}
	// 	});

	// 	return { children, props };
	// }

	// compile(template: string, props: someObject) {
	// 	const propsAndStubs = { ...props };

	// 	Object.entries(this.children).forEach(([key, child]) => {
	// 		propsAndStubs[key] = `<div data-id="${child.id}"></div>`
	// 	});

	// 	const fragment = this._createDocumentElement('template') as HTMLMetaElement;

	// 	fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

	// 	Object.values(this.children).forEach(child => {
	// 		const content = fragment.content as any as HTMLElement;
	// 		const stub = content.querySelector(`[data-id="${child.id}"]`);

	// 		if (stub && child) stub.replaceWith(child.getContent());
	// 	});

	// 	return fragment.content;
	// }

	// _registerEvents(eventBus: IEventBus) {
	// 	eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
	// 	eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
	// 	eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
	// 	eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	// }

	// _createResources() {
	// 	this._element = this._createDocumentElement(this._meta.tagName);
	// }

	// init() {
	// 	this._createResources();

	// 	this.dispatchComponentDidMount();

	// 	if (!this._isMounted) {
	// 		this.emit(Block.EVENTS.FLOW_RENDER);
	// 		this._isMounted = true;
	// 	}
	// }

	// _componentDidMount(oldProps: someObject) {
	// 	this.componentDidMount(oldProps);

	// 	Object.values(this.children).forEach(child => {
	// 		child.dispatchComponentDidMount();
	// 	});
	// }

	// componentDidMount(oldProps: someObject) { }

	dispatchComponentDidMount: () => void,

	// _componentDidUpdate(oldProps: someObject, newProps: someObject) {
	// 	const response = this.componentDidUpdate(oldProps, newProps);

	// 	if (response) this.emit(Block.EVENTS.FLOW_RENDER);
	// }

	// componentDidUpdate(oldProps: someObject, newProps: someObject) {
	// 	return oldProps !== newProps;
	// }

	setProps: (nextProps: someObject) => void,

	// get element() {
	// 	return this._element;
	// }

	// _render() {
	// 	const block = this.render() as any as DocumentFragment;

	// 	this._removeEvents();
		
	// 	if (this._element) {
	// 		this._element.innerHTML = '';
	// 		this._element.appendChild(block);
	// 	}

	// 	this._addEvents();
	// }

	// // Переопределяется пользователем. Необходимо вернуть разметку
	// render() { }

	getContent: () => HTMLElement | null,

	// emit(event: string, ...args: any) {
	// 	this.eventBus().emit(event, ...args);
	// }

	// _makePropsProxy(props: someObject) {
	// 	return new Proxy(props, {
	// 		get: (target, key: string) => {
	// 			return typeof target[key] === 'function' ? target[key].bind(target) : target[key]
	// 		},
	// 		set: (target, key: string, value) => {
	// 			if (key[0] === '_') {
	// 				throw new Error("Нет прав")
	// 			}

	// 			if (typeof target[key] === 'function') {
	// 				target[key] = value.bind(target)
	// 			} else {
	// 				target[key] = value
	// 			}

	// 			this.emit(Block.EVENTS.FLOW_CDU);

	// 			return target[key]
	// 		},
	// 		deleteProperty: () => {
	// 			throw new Error("нет доступа")
	// 		},
	// 	});
	// }

	// _createDocumentElement(tagName: string) {
	// 	// Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
	// 	const element = document.createElement(tagName);
	// 	element.setAttribute('data-id', this._id || "");
	// 	return element;
	// }

	// _addEvents() {
	// 	const { events = {} } = this.props;

	// 	Object.keys(events).forEach(eventName => {
	// 		if (this._element) this._element.addEventListener(eventName, events[eventName]);
	// 	});
	// }

	// _removeEvents() {
	// 	const { events = {} } = this.props;

	// 	Object.keys(events).forEach(eventName => {
	// 		if (this._element) this._element.removeEventListener(eventName, events[eventName]);
	// 	});
	// }

	show: () => void,
	hide: () => void,
}

export default IBlock;
