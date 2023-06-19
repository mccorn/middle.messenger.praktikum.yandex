import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Block";
import InputWithLabel from "../../components/InputWithLabel";
import Button from "../../components/Button";
import { HANDLERS } from "../../../utils/handlers";
import ErrorMessage from "../../components/ErrorMessage";

export default class LoginPage extends Block {
	componentDidMount() {
		this.state = {
			login: "",
			password: "",
		}
	}

	render() {
		const inputLoginEvents = {
			focusout: (event: Event) => HANDLERS.handleFocusOut(event, this, this.children.inputLoginError),
			input: () => HANDLERS.handleInputWithError(this.children.inputLoginError)
		};
		const inputPasswordEvents = {
			focusout: (event: Event) => HANDLERS.handleFocusOut(event, this, this.children.inputPasswordError),
			input: () => HANDLERS.handleInputWithError(this.children.inputPasswordError),
		};

		const buttonEvents = { click: (event: Event) => HANDLERS.handleSubmit(event, this) }

		const inputLogin = new InputWithLabel("div", { value: "", name: "login", placeholder: "login", label: "login", inputEvents: inputLoginEvents });
		const inputPassword = new InputWithLabel("div", { value: "", name: "password", placeholder: "password", label: "password", inputEvents: inputPasswordEvents });

		const inputLoginError = new ErrorMessage("div", { message: "" });
		const inputPasswordError = new ErrorMessage("div", { message: "" });

		const button = new Button("div", { label: "Sign in", events: buttonEvents });

		this.children.inputLogin = inputLogin;
		this.children.inputLoginError = inputLoginError;

		this.children.inputPassword = inputPassword;
		this.children.inputPasswordError = inputPasswordError;

		this.children.button = button;

		return this.compile(tmpl, this.props);
	}
}
