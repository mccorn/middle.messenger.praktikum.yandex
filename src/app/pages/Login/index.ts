import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Block.js";

export default class Login extends Block {
	render() {
		return typeof tmpl === 'function' ? tmpl(this.props) : tmpl;
	}
}

// export default tmpl;
