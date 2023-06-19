import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Block";
import { someObject } from "../../../const/types";

type ButtonProps = {
	label: string,
	events?: someObject,
}

export default class Button extends Block {
	constructor(tagName: string, props: ButtonProps) {
		super(tagName, props);
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}
