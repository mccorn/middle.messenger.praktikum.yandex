import Handlebars, { compile } from "handlebars"
import EventBus from "./EventBus";
import { v4 as makeUUID } from 'uuid';

// Нельзя создавать экземпляр данного класса
class Block {
	static EVENTS = {
		INIT: "init",
		FLOW_CDM: "flow:component-did-mount",
		FLOW_CDU: "flow:component-did-update",
		FLOW_RENDER: "flow:render"
	};

	_element = null;
	_meta = null;

	/** JSDoc
	 * @param {string} tagName
	 * @param {Object} props
	 *
	 * @returns {void}
	 */
	constructor(tagName = "div", props = {}) {
		const eventBus = new EventBus();

		this._meta = {
			tagName,
			props
		};

		this.props = this._makePropsProxy(props);

		this.eventBus = () => eventBus;

		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	_registerEvents(eventBus) {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	_createResources() {
		const { tagName } = this._meta;
		this._element = this._createDocumentElement(tagName);
	}

	init() {
		this._createResources();
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	_componentDidMount() {
		this.componentDidMount();
	}

	componentDidMount(oldProps) { }

	dispatchComponentDidMount() {
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	_componentDidUpdate(oldProps, newProps) {
		const response = this.componentDidUpdate(oldProps, newProps);

		if (response) this.emit(Block.EVENTS.FLOW_RENDER);
	}

	componentDidUpdate(oldProps, newProps) {
		return true;
	}

	setProps = nextProps => {
		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);
	};

	get element() {
		return this._element;
	}

	_render() {
		const block = this.render();
		// Это небезопасный метод для упрощения логики
		// Используйте шаблонизатор из npm или напишите свой безопасный
		// Нужно компилировать не в строку (или делать это правильно),
		// либо сразу превращать в DOM-элементы и возвращать из compile DOM-ноду
		this._removeEvents();
		this._element.innerHTML = block;

		this._addEvents();
	}

	// Переопределяется пользователем. Необходимо вернуть разметку
	render() { }

	getContent() {
		return this.element;
	}

	emit(event, ...args) {
		this.eventBus().emit(event, ...args);
	}

	_makePropsProxy(props) {
		// Ещё один способ передачи this, но он больше не применяется с приходом ES6+
		const self = this;

		return new Proxy(props, {
			get(target, key) {
				return typeof target[key] === 'function' ? target[key].bind(target) : target[key]
			},
			set(target, key, value) {
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
			deleteProperty(target, key) {
				throw new Error("нет доступа")
			},
		});
	}

	_createDocumentElement(tagName) {
		// Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
		return document.createElement(tagName);
	}

	_addEvents() {
    const {events = {}} = this.props;

    Object.keys(events).forEach(eventName => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

	_removeEvents() {
    const {events = {}} = this.props;

    Object.keys(events).forEach(eventName => {
      this._element.removeEventListener(eventName, events[eventName]);
    });
  }

	show() {
		this.getContent().style.display = "block";
	}

	hide() {
		this.getContent().style.display = "none";
	}
}

export default Block;
