import { IEventBus } from "./EventBus";
import { someObject } from "../const/types";

export type META = {
	tagName: string,
	props: someObject,
}

// Нельзя создавать экземпляр данного класса
interface IBlock {
	_element: HTMLElement | DocumentFragment | null,
	_id: string,
	_isMounted: boolean,
	_meta: META,

	eventBus: () => IEventBus,
	children: someObject,
	props: someObject,
	state: someObject,

	dispatchComponentDidMount: () => void,

	setProps: (nextProps: someObject) => void,

	getContent: () => HTMLElement | DocumentFragment | null,

	show: () => void,
	hide: () => void,
}

export default IBlock;
