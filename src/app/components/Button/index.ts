import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Block";
import { eventsObject } from "../../../const/types";

type ButtonProps = {
	label: string,
	events?: eventsObject,
}

export default class Button extends Block {
	constructor(tagName: string, props: ButtonProps) {
		super(tagName, props);
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}
