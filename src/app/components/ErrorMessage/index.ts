import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Block";

export default class ErrorMessage extends Block {
	render() {
		return this.compile(tmpl, this.props);
	}
}
