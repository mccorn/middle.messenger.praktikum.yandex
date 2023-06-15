import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Block.js";
import InputWithLabel from "../../components/InputWithLabel";
import Button from "../../components/Button";

export default class LoginPage extends Block {
	componentDidMount() {
		this.state = {}
	}

	render() {
		const handleSubmit = (event) => {
			event.preventDefault();
			console.log(this.state);
		}

		const inputLoginEvents = {
			focusout: (event) => this.state.login = event.target.value,
		}
		const inputPasswordEvents = {
			focusout: (event) => this.state.password = event.target.value,
		}
		const buttonEvents = {
			click: (event) => handleSubmit(event, self),
		}

		const inputLogin = new InputWithLabel('div', { value: "", placeholder: "login", label: "login", inputEvents: inputLoginEvents });
		const inputPassword = new InputWithLabel('div', { value: "", placeholder: "password", label: "password", inputEvents: inputPasswordEvents });
		const button = new Button('div', { label: "Sign in", events: buttonEvents });

		this.children.inputLogin = inputLogin;
		this.children.inputPassword = inputPassword;
		this.children.button = button;

		return this.compile(tmpl, this.props);
	}
}
