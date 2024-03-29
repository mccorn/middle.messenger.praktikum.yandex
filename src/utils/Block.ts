import Handlebars from "handlebars"
import { v4 as makeUUID } from "uuid";
import EventBus, { IEventBus } from "./EventBus";
import { someObject } from "../const/types";
import IBlock from "./BlockInterface";
import { utils } from ".";

export enum EVENTS_ENUM {
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
class Block implements IBlock {
	static EVENTS = EVENTS_ENUM;

	_element: HTMLElement | DocumentFragment | null = null;
	_id = "";
	_isMounted = false;
	_meta: META;

	eventBus: () => IEventBus;
	children: someObject;
	props: someObject;
	state: someObject;

	constructor(tagName = "div", propsAndChildren: someObject = {}) {
		const { children, props } = this._getChildren(propsAndChildren);

		this.children = children;
		this.state = {};

		const eventBus = new EventBus();

		this._meta = {
			tagName,
			props
		};

		this._id = makeUUID();
		this.props = this._makePropsProxy({ ...props, __id: this._id });

		this.eventBus = () => eventBus as IEventBus;

		this._registerEvents(eventBus as IEventBus);
		eventBus.emit(EVENTS_ENUM.INIT);
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
			if (!child) return;
			propsAndStubs[key] = `<div data-id="${child.id}"></div>`
		});

		const fragment = this._createDocumentElement("template") as HTMLMetaElement;

		fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

		Object.values(this.children).forEach(child => {
			if (!child) return;

			const content = fragment.content as unknown as HTMLElement;
			const stub = content.querySelector(`[data-id="${child.id}"]`);

			if (stub && child) stub.replaceWith(child.getContent());
		});

		return fragment.content;
	}

	_registerEvents(eventBus: IEventBus) {
		eventBus.on(EVENTS_ENUM.INIT, this.init.bind(this));
		eventBus.on(EVENTS_ENUM.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(EVENTS_ENUM.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(EVENTS_ENUM.FLOW_RENDER, this._render.bind(this));
	}

	_createResources() {
		this._element = this._createDocumentElement(this._meta.tagName);
	}

	init() {
		this._createResources();

		this.dispatchComponentDidMount();

		if (!this._isMounted) {
			this.emit(EVENTS_ENUM.FLOW_RENDER);
			this._isMounted = true;
		}
	}

	_componentDidMount(oldProps: someObject) {
		this.componentDidMount(oldProps);

		Object.values(this.children).forEach(child => {
			if (!child) return;
			child.dispatchComponentDidMount();
		});
	}

	componentDidMount(oldProps: someObject) { oldProps }

	dispatchComponentDidMount() {
		const { eventBus } = this;
		if (eventBus) eventBus().emit(EVENTS_ENUM.FLOW_CDM);
	}

	_componentDidUpdate(oldProps: someObject, newProps: someObject) {
		const response = this.componentDidUpdate(oldProps, newProps);

		if (response) this.emit(EVENTS_ENUM.FLOW_RENDER);
	}

	componentDidUpdate(oldProps: someObject, newProps: someObject) {
		return !utils.isEqual(oldProps, newProps);
	}

	setProps(nextProps: someObject): void {
		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);
	}

	setState(nextState: someObject): void {
		this.setProps({state: nextState});
	}

	get element() {
		return this._element;
	}

	_render() {
		const block = this.render() as unknown as DocumentFragment;

		this._removeEvents();
		
		if (this._element) {
			if (this._element instanceof HTMLElement) this._element.innerHTML = "";
			this._element.appendChild(block);
		}

		this._addEvents();
	}

	// Переопределяется пользователем. Необходимо вернуть разметку
	render() { return this.compile('', {}); }

	getContent(): HTMLElement | DocumentFragment | null {
		return this.element;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	emit(event: EVENTS_ENUM, ...args: any) {
		this.eventBus().emit(event, ...args);
	}

	_makePropsProxy(props: someObject) {
		return new Proxy(props, {
			get: (target, key: string) => {
				return typeof target[key] === "function" ? target[key].bind(target) : target[key]
			},
			set: (target, key: string, value) => {
				if (key[0] === "_") {
					// throw new Error("Нет прав")
				}

				if (typeof target[key] === "function") {
					target[key] = value.bind(target)
				} else {
					target[key] = value
				}

				this.emit(EVENTS_ENUM.FLOW_CDU);

				return true;
			},
			deleteProperty: () => {
				throw new Error("нет доступа")
			},
		});
	}

	_createDocumentElement(tagName: string) {
		let element; 
		
		if (tagName === 'fragment') {
			element = document.createDocumentFragment(); 
		} else {
			element = document.createElement(tagName);
			element.setAttribute("data-id", this._id || "");
		}
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
		if (this._element instanceof HTMLElement) this._element.style.display = "block";
	}

	hide() {
		if (this._element instanceof HTMLElement) this._element.style.display = "none";
	}
}

export default Block;
