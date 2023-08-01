import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Component";
import { eventsObject } from "../../../const/types";

type ButtonProps = {
	label: string,
	events?: eventsObject,
	disabled?: boolean,
}

export default class Button extends Block {
	constructor(tagName: string, props: ButtonProps) {
		super(tagName, props);
	}

	enable() {
		if (this.props.disabled) this.setProps({ disabled: false, events: this.props.oldEvents });
	}

	disable() {
		this.props.oldEvents = this.props.events;
		if (!this.props.disabled) this.setProps({ disabled: true, events: {} });
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}
