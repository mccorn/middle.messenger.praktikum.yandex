import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Block";
import Input from "../Input";

export default class InputLazy extends Block {
	render() {
		const {value, placeholder, inputEvents, name, label} = this.props;

		const input = new Input('div', {name: name, value: value, placeholder: placeholder || name, events: inputEvents});
		this.children.input = input;

		return this.compile(tmpl, {...this.props, label: label || name, events: null});
	}
}
