import "./styles.less";

import tmpl from "./index.tmpl";
import Block from "../../../utils/Component";

export default class ChatsList extends Block {
	render() {
		return this.compile(tmpl, this.props);
	}
}
