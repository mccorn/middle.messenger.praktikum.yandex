import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Block";

type ChatInfoProps = {
	data: {
		id: string | number,
		avatarUrl: string,
		name: string,
		text: string,
		date: string,
		noreadMessagesCounter?: number,
	}
}

export default class ChatInfo extends Block {
	constructor(tagName: string, props: ChatInfoProps) {
		super(tagName, props);
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}
