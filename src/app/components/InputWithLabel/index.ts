import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Block";
import Input, {InputProps} from "../Input";
import { eventsObject } from "../../../const/types";

interface InputWithLabelProps extends InputProps {
	label?: string,
	inputEvents?: eventsObject,
}

export default class InputWithLabel extends Block {
	constructor(tagName: string, props: InputWithLabelProps) {
		super(tagName, props);
	}

	render() {
		const {value, placeholder, inputEvents, name} = this.props;

		const input = new Input("div", {name: name, value: value, placeholder: placeholder, events: inputEvents});
		this.children.input = input;

		return this.compile(tmpl, {...this.props, events: null});
	}
}
