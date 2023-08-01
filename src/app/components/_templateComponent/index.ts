import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Component";

type Props = {
	label?: string,
}

export default class Template extends Block {
	constructor(tagName: string, props: Props) {
		super(tagName, props);
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}
