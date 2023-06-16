import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Block";
import InputWithLabel from "../../components/InputWithLabel";
import Button from "../../components/Button";

export default class LoginPage extends Block {
	componentDidMount() {
		this.state = {}
	}

	render() {
		const handleSubmit = (event: Event) => {
			event.preventDefault();
			console.log(this.state);
		}
		const handleFocusOut = (event: Event) => {
			const target = event.target as HTMLInputElement;

			if (target) this.state[target.name] = target.value
		}
		const inputEvents = { focusout: handleFocusOut };
		const buttonEvents = { click: handleSubmit }

		const inputLogin = new InputWithLabel('div', { value: "", name: "login", placeholder: "login", label: "login", inputEvents: inputEvents });
		const inputPassword = new InputWithLabel('div', { value: "", name: "password", placeholder: "password", label: "password", inputEvents: inputEvents });
		const button = new Button('div', { label: "Sign in", events: buttonEvents });

		this.children.inputLogin = inputLogin;
		this.children.inputPassword = inputPassword;
		this.children.button = button;

		return this.compile(tmpl, this.props);
	}
}
