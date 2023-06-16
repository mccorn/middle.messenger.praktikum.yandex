import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Block";
import Button from "../../components/Button";
import InputLazy from "../../components/InputLazy";
import { HANDLERS } from "../../../utils/handlers";

export default class RegisterPage extends Block {
	componentDidMount() {
		this.state = {
			login: '',
			password: '',
			first_name: '',
			second_name: '',
			email: '',
			phone: '',
		};
	}

	render() {
		const inputEvents = { focusout: (event: Event) => HANDLERS.handleFocusOut(event, this) };
		const buttonEvents = { click: (event: Event) => HANDLERS.handleSubmit(event, this) }

		const inputLogin = new InputLazy('div', { value: "", name: "login", inputEvents: inputEvents });
		const inputPassword = new InputLazy('div', { value: "", name: "password", inputEvents: inputEvents });

		const inputFirstName = new InputLazy('div', { value: "", name: "first_name", inputEvents: inputEvents });
		const inputSecondName = new InputLazy('div', { value: "", name: "second_name", inputEvents: inputEvents });

		const inputEmail = new InputLazy('div', { value: "", name: "email", inputEvents: inputEvents });
		const inputPhone = new InputLazy('div', { value: "", name: "phone", inputEvents: inputEvents });

		const button = new Button('div', { label: "Save", events: buttonEvents });

		this.children = {
			inputLogin,
			inputPassword,
			inputFirstName,
			inputSecondName,
			inputEmail,
			inputPhone,
			button,
		}

		return this.compile(tmpl, this.props);
	}
}
