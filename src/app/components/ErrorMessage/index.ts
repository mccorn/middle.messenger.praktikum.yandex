import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Block";

type ErrorMessageProps = {
	message: string,
}

export default class ErrorMessage extends Block {
	constructor(tagName: string, props: ErrorMessageProps) {
		super(tagName, props);
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}
