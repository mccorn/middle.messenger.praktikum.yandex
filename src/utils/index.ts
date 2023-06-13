import { GENERATORS } from "./generators";

export const utils = {
	GEN: GENERATORS,
	render: function render(query, block) {
		const root = document.querySelector(query);
		if (root) root.appendChild(block.getContent());
		return root;
	}
}
