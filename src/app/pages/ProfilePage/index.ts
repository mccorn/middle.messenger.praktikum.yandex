import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Block";
import InputLazy from "../../components/InputLazy";
import Button from "../../components/Button";
import { HANDLERS } from "../../../utils/handlers";

export default class ProfilePage extends Block {
	componentDidMount() {
		this.state = {
			avatar: "",
			login: "",
			display_name: "",
			first_name: "",
			second_name: "",
			email: "",
			phone: "",
			newPassword: "",
			oldPassword: "",
		};
	}

	render() {
		const inputAvatarEvents = {
			focusout: (event: Event) => HANDLERS.handleFocusOut(event, this, this.children.inputAvatar),
			// input: () => HANDLERS.handleInputWithError(this.children.inputLogin),
		};
		const inputLoginEvents = {
			focusout: (event: Event) => HANDLERS.handleFocusOut(event, this, this.children.inputLogin),
			// input: () => HANDLERS.handleInputWithError(this.children.inputLogin),
		};
		const inputPasswordEvents = {
			focusout: (event: Event) => HANDLERS.handleFocusOut(event, this, this.children.inputPassword),
			// input: () => HANDLERS.handleInputWithError(this.children.inputPassword),
		};
		const inputFirstNameEvents = {
			focusout: (event: Event) => HANDLERS.handleFocusOut(event, this, this.children.inputFirstName),
			// input: () => HANDLERS.handleInputWithError(this.children.inputFirstName),
		};
		const inputSecondNameEvents = {
			focusout: (event: Event) => HANDLERS.handleFocusOut(event, this, this.children.inputSecondName),
			// input: () => HANDLERS.handleInputWithError(this.children.inputSecondName),
		};
		const inputEmailEvents = {
			focusout: (event: Event) => HANDLERS.handleFocusOut(event, this, this.children.inputEmail),
			// input: () => HANDLERS.handleInputWithError(this.children.inputEmail),
		};
		const inputPhoneEvents = {
			focusout: (event: Event) => HANDLERS.handleFocusOut(event, this, this.children.inputPhone),
			// input: () => HANDLERS.handleInputWithError(this.children.inputPhone),
		};

		const inputNewPasswordEvents = {
			focusout: (event: Event) => HANDLERS.handleFocusOut(event, this, this.children.inputNewPassword),
			// input: () => HANDLERS.handleInputWithError(this.children.inputEmail),
		};
		const inputOldPasswordEvents = {
			focusout: (event: Event) => HANDLERS.handleFocusOut(event, this, this.children.inputOldPassword),
			// input: () => HANDLERS.handleInputWithError(this.children.inputPhone),
		};
		
		const buttonEvents = { click: (event: Event) => HANDLERS.handleSubmit(event, this) }

		const inputAvatar = new InputLazy("div", { value: "", name: "avatar", inputEvents: inputAvatarEvents });
		
		const inputLogin = new InputLazy("div", { value: "", name: "login", inputEvents: inputLoginEvents });
		const inputDisplayName = new InputLazy("div", { value: "", name: "display_name", inputEvents: inputPasswordEvents });
		const inputFirstName = new InputLazy("div", { value: "", name: "first_name", inputEvents: inputFirstNameEvents });
		const inputSecondName = new InputLazy("div", { value: "", name: "second_name", inputEvents: inputSecondNameEvents });
		const inputEmail = new InputLazy("div", { value: "", name: "email", inputEvents: inputEmailEvents });
		const inputPhone = new InputLazy("div", { value: "", name: "phone", inputEvents: inputPhoneEvents });

		const inputNewPassword = new InputLazy("div", { value: "", name: "newPassword", inputEvents: inputNewPasswordEvents });
		const inputOldPassword = new InputLazy("div", { value: "", name: "oldPassword", inputEvents: inputOldPasswordEvents });

		const button = new Button("div", { label: "Save", events: buttonEvents });

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
