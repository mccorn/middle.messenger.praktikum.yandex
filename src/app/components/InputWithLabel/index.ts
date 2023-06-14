import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Block.js";
import Input from "../Input";

export default class InputWithLabel extends Block {
	render() {
		const {value, placeholder, onBlur} = this.props;

		const input = new Input('div', {value: value, placeholder: placeholder, onBlur: onBlur});
		this.children.input = input;

		return this.compile(tmpl, this.props);
	}
}
