import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Block";
import InputLazy from "../../components/InputLazy";
import Button from "../../components/Button";

export default class ProfilePage extends Block {
	componentDidMount() {
		this.state = {};
	}

	render() {
		const handleFocusOut = (event: Event) => {
			const target = event.target as HTMLInputElement;

			if (target) this.state[target.name] = target.value
		}
		const handleSubmit = (event: Event) => {
			event.preventDefault();
			console.log(this.state);
		}

		const inputEvents = { focusout: handleFocusOut };
		const buttonEvents = { click: handleSubmit }

		const inputAvatar = new InputLazy('div', { value: "", name: "avatar", inputEvents: inputEvents });
		
		const inputLogin = new InputLazy('div', { value: "", name: "login", inputEvents: inputEvents });
		const inputDisplayName = new InputLazy('div', { value: "", name: "display_name", inputEvents: inputEvents });
		const inputFirstName = new InputLazy('div', { value: "", name: "first_name", inputEvents: inputEvents });
		const inputSecondName = new InputLazy('div', { value: "", name: "second_name", inputEvents: inputEvents });
		const inputEmail = new InputLazy('div', { value: "", name: "email", inputEvents: inputEvents });
		const inputPhone = new InputLazy('div', { value: "", name: "phone", inputEvents: inputEvents });

		const inputNewPassword = new InputLazy('div', { value: "", name: "newPassword", inputEvents: inputEvents });
		const inputOldPassword = new InputLazy('div', { value: "", name: "oldPassword", inputEvents: inputEvents });

		const button = new Button('div', { label: "Save", events: buttonEvents });

		this.children = {
			inputAvatar,

			inputLogin,
			inputDisplayName,
			inputFirstName,
			inputSecondName,
			inputEmail,
			inputPhone,

			inputNewPassword,
			inputOldPassword,
			
			button,
		}

		return this.compile(tmpl, this.props);
	}
}
