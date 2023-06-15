import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Block.js";
import Input from "../Input";

export default class InputWithLabel extends Block {
	render() {
		const {value, placeholder, inputEvents, name} = this.props;

		const input = new Input('div', {name: placeholder, value: value, placeholder: placeholder, events: inputEvents});
		this.children.input = input;

		return this.compile(tmpl, {...this.props, events: null});
	}
}
