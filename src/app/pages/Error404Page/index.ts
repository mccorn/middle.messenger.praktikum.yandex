import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Component";
import Button from "../../components/Button";

export default class Error404Page extends Block {
	render() {
		this.children.button = new Button("div", { label: "To home" });

		return this.compile(tmpl, this.props);
	}
}

const a = 5;

a = 6;
