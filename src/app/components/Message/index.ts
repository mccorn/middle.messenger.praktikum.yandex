import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Block";

type MessageProps = {
	data: {
		text?: string,
		date?: string,
		isEdited?: boolean,
	},
	classNames?: string,
}

export default class Message extends Block {
	constructor(tagName: string, props: MessageProps) {
		super(tagName, props);
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}
