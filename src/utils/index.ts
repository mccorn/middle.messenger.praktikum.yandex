import { Indexed, someObject } from "../const/types";
import Block from "./Block";
import IBlock from "./BlockInterface";
import Store, { StoreEvents } from "./Store";
import { GENERATORS } from "./generators";

export const utils = {
	GEN: GENERATORS,
	render: function render(query: string, block: IBlock) {
		const root = document.querySelector(query);
		if (root) root.appendChild(block.getContent() as HTMLElement);

		block.dispatchComponentDidMount();
		return root;
	},
	clear: function (parent: HTMLElement) {
		if (parent) {
			let child = parent.childNodes[0];

			while (child) {
				parent.removeChild(child);
				child = parent.childNodes[0];
			}
		}
	},
	clearBySelector: function (selector: string) {
		const parent = document.querySelector(selector) as HTMLElement;

		if (parent) this.clear(parent)
	},
	isEqual: function (a: Indexed | string, b: Indexed | string): boolean {
		if (!a || !b || typeof a !== 'object' || typeof b !== 'object') return a === b;

		let result = true;
		const { isEqual } = this;

		for (const key in a) {
			result = result && isEqual(a[key] as Indexed, b[key] as Indexed)

		}

		for (const key in b) {
			result = result && isEqual(a[key] as Indexed, b[key] as Indexed)

		}

		return result;
	},
	set: function (object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
		if (!object || typeof object !== 'object') return object;
		if (typeof path !== 'string') throw new Error('path must be string');

		const pathArr = path.split('.');
		let target = object as Indexed;

		for (let i = 0; i < pathArr.length; i++) {
			const key = pathArr[i];
			
			if (i === pathArr.length - 1) {
				target[key] = value;
			} else {
				if (!target[key]) target[key] = {};
				target = target[key] as Indexed;
			}
		}

		return object;
	},
	printObject: function(obj: someObject = {}) {
		for (const key in obj) {
			console.log(key, obj[key])
		}
	},
	getNewUser: function(id: number | string) {
		return {
			"first_name": `user${id}`,
			"second_name": `user${id}`,
			"login": `user${id}login`,
			"email": `user${id}@com.com`,
			"password": `user${id}_Passw0rd`,
			"phone": "+71234567890"
		}
	}
}

export function connect(ComponentClass: typeof Block, mapStateToProps: (state: Indexed) => Indexed) {
	return class extends ComponentClass {
		constructor(tagName: string, props: someObject) {
			super(tagName, { ...props, ...mapStateToProps(Store.getState()) });

			Store.on(StoreEvents.Updated, () => {
				this.setProps({ ...mapStateToProps(Store.getState()) });
			});
		}
	}
}
