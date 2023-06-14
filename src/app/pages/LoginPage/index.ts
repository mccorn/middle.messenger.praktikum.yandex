import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Block.js";
import InputWithLabel from "../../components/InputWithLabel";
import Button from "../../components/Button";

let isMounted = false;

export default class LoginPage extends Block {
	render() {
		let inputLogin = new InputWithLabel('div', {value: "", placeholder: "login", label: "login"});
		let inputPassword = new InputWithLabel('div', {value: "", placeholder: "password", label: "password"});
		let button = new Button('div', {label: "Sign in"});

		this.children.inputLogin = inputLogin;
		this.children.inputPassword = inputPassword;
		this.children.button = button;

		return this.compile(tmpl, this.props);
	}
}
