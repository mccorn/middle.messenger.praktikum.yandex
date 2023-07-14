import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Block";
import { ChatData } from "../../../const/types";

type ChatInfoProps = {
	data: ChatData
}

export default class ChatInfo extends Block {
	constructor(tagName: string, props: ChatInfoProps) {
		super(tagName, props);
	}

	render() {
		return this.compile(tmpl, {...this.props });
	}
}
