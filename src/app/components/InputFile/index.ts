import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Component";
import { eventsObject } from "../../../const/types";

export interface InputProps {
	name: string,
	value: string,
	placeholder?: string,
	events?: eventsObject,
}

export default class InputFile extends Block {
	constructor(tagName: string, props: InputProps) {
		super(tagName, props);
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}
