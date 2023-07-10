import IBlock from "./BlockInterface";
import { GENERATORS } from "./generators";

type Indexed<T = unknown> = {
	[key in string | symbol | number]: T;
};

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
	}
}
