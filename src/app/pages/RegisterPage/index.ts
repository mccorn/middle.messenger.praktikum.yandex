import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Block";
import Button from "../../components/Button";
import InputLazy from "../../components/InputLazy";

export default class RegisterPage extends Block {
	componentDidMount() {
		this.state = {};
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
