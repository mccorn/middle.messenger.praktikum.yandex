import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Block";
import Input, { InputProps } from "../Input";

type InputLazyProps = InputProps;

export default class InputLazy extends Block {
	constructor(tagName: string, props: InputLazyProps) {
		super(tagName, props);
	}

	render() {
		const {value, placeholder, inputEvents, name, label} = this.props;

		const input = new Input("div", {name: name, value: value, placeholder: placeholder || name, events: inputEvents});
		this.children.input = input;

		return this.compile(tmpl, {...this.props, label: label || name, events: null});
	}
}
