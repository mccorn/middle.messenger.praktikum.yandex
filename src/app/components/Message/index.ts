import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Block.js";

export default class Message extends Block {
	render() {
		return this.compile(tmpl, this.props);
	}
}
