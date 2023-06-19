import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Block";
import { someObject } from "../../../const/types";

export interface InputProps {
	name: string,
	value: string,
	placeholder?: string,
	events: someObject,
}

export default class Input extends Block {
	constructor(tagName: string, props: InputProps) {
		super(tagName, props);
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}
