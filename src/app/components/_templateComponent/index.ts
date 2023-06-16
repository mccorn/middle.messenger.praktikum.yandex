import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Block";

export default class Input extends Block {
	render() {
		return typeof tmpl === 'function' ? tmpl(this.props) : tmpl;
	}
}
