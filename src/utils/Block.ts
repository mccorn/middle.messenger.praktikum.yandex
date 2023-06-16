import Handlebars from "handlebars"
import EventBus, { IEventBus } from "./EventBus";
import { v4 as makeUUID } from "uuid";
import { someObject } from "../const/types";

enum EVENTS_ENUM {
	INIT = "init",
	FLOW_CDM = "flow:component-did-mount",
	FLOW_CDU = "flow:component-did-update",
	FLOW_RENDER = "flow:render"
}

type META = {
	tagName: string,
	props: someObject,
}

// Нельзя создавать экземпляр данного класса
class Block {
	static EVENTS = EVENTS_ENUM;

	children: someObject = {};
	props: someObject = {};
	eventBus: (() => IEventBus) | null = null;

	_element: someObject | null = null;
	_meta: META;
	_id = '';
	_isMounted = false;


	constructor(tagName: string = "div", propsAndChildren: someObject = {}) {
		const { children, props } = this._getChildren(propsAndChildren);

		this.children = children;

		const eventBus = new EventBus();

		this._meta = {
			tagName,
			props
		};

		this._id = makeUUID();
		this.props = this._makePropsProxy({ ...props, __id: this._id });

		this.eventBus = () => eventBus;

		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	_getChildren(propsAndChildren: someObject) {
		const children: someObject = {};
		const props: someObject = {};

		Object.entries(propsAndChildren).forEach(([key, value]) => {
			if (value instanceof Block) {
				children[key] = value;
			} else {
				props[key] = value;
			}
		});

		return { children, props };
	}

	compile(template: string, props: someObject) {
		const propsAndStubs = { ...props };

		Object.entries(this.children).forEach(([key, child]) => {
			propsAndStubs[key] = `<div data-id="${child.id}"></div>`
		});

		const fragment = this._createDocumentElement('template') as HTMLMetaElement;

		fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

		Object.values(this.children).forEach(child => {
			const content = fragment.content as any as HTMLElement;
			const stub = content.querySelector(`[data-id="${child.id}"]`);

			if (stub && child) stub.replaceWith(child.getContent());
		});

		return fragment.content;
	}

	_registerEvents(eventBus: IEventBus) {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	_createResources() {
		this._element = this._createDocumentElement(this._meta.tagName);
	}

	init() {
		this._createResources();

		this.dispatchComponentDidMount();

		if (!this._isMounted) {
			this.emit(Block.EVENTS.FLOW_RENDER);
			this._isMounted = true;
		}
	}

	_componentDidMount() {
		this.componentDidMount();

		Object.values(this.children).forEach(child => {
			child.dispatchComponentDidMount();
		});
	}

	componentDidMount() { }

	dispatchComponentDidMount() {
		const { eventBus } = this;
		if (eventBus) eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	_componentDidUpdate(oldProps: someObject, newProps: someObject) {
		const response = this.componentDidUpdate(oldProps, newProps);

		if (response) this.emit(Block.EVENTS.FLOW_RENDER);
	}

	componentDidUpdate(oldProps: someObject, newProps: someObject) {
		return oldProps === newProps; // TODO: Продумать логику
	}

	setProps(nextProps: someObject): void {
		if (!nextProps) {
			return;
		}

		Object.assign(this.props || {}, nextProps);
	};

	get element() {
		return this._element;
	}

	o_render() {
		const block = this.render();
		// Это небезопасный метод для упрощения логики
		// Используйте шаблонизатор из npm или напишите свой безопасный
		// Нужно компилировать не в строку (или делать это правильно),
		// либо сразу превращать в DOM-элементы и возвращать из compile DOM-ноду
		this._removeEvents();
		if (this._element) this._element.innerHTML = block;

		this._addEvents();
	}

	_render() {
		const block = this.render(); // render теперь возвращает DocumentFragment

		this._removeEvents();

		if (this._element) {
			this._element.appendChild(block);
			this._element.innerHTML = '';
		}

		this._addEvents();
	}

	// Переопределяется пользователем. Необходимо вернуть разметку
	render() { }

	getContent() {
		return this.element;
	}

	emit(event: string, ...args: any) {
		const { eventBus } = this;
		if (eventBus) eventBus().emit(event, ...args);
	}

	_makePropsProxy(props: someObject) {
		// Ещё один способ передачи this, но он больше не применяется с приходом ES6+
		const self = this;

		return new Proxy(props, {
			get(target, key: string) {
				return typeof target[key] === 'function' ? target[key].bind(target) : target[key]
			},
			set(target, key: string, value) {
				if (key[0] === '_') {
					throw new Error("Нет прав")
				}

				if (typeof target[key] === 'function') {
					target[key] = value.bind(target)
				} else {
					target[key] = value
				}

				self.emit(Block.EVENTS.FLOW_CDU);

				return target[key]
			},
			deleteProperty() {
				throw new Error("нет доступа")
			},
		});
	}

	_createDocumentElement(tagName: string) {
		// Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
		const element = document.createElement(tagName);
		element.setAttribute('data-id', this._id || "");
		return element;
	}

	_addEvents() {
		const { events = {} } = this.props;

		Object.keys(events).forEach(eventName => {
			if (this._element) this._element.addEventListener(eventName, events[eventName]);
		});
	}

	_removeEvents() {
		const { events = {} } = this.props;

		Object.keys(events).forEach(eventName => {
			if (this._element) this._element.removeEventListener(eventName, events[eventName]);
		});
	}

	show() {
		const block = this.getContent();
		if (block) block.style.display = "block";
	}

	hide() {
		const block = this.getContent();
		if (block) block.style.display = "none";
	}
}

export default Block;
