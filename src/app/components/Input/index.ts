import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Block";
import { eventsObject } from "../../../const/types";

export interface InputProps {
	name: string,
	value: string,
	type?: string,
	placeholder?: string,
	events?: eventsObject,
}

export default class Input extends Block {
	constructor(tagName: string, props: InputProps) {
		super(tagName, props);
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}
