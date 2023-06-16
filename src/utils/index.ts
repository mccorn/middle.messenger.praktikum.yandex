import { GENERATORS } from "./generators";

export const utils = {
	GEN: GENERATORS,
	render: function render(query: string, block) {
		const root = document.querySelector(query);
		if (root) root.appendChild(block.getContent());

		block.dispatchComponentDidMount();
		return root;
	},
	clear: function(parent: HTMLElement) {
		if (parent) {
			let child = parent.childNodes[0];

			while (child) {
				parent.removeChild(child);
				child = parent.childNodes[0];
			} 
		}
	},
	clearBySelector: function(selector: string) {
		const parent = document.querySelector(selector) as HTMLElement;

		if (parent) this.clear(parent)
	}
}
