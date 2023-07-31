import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Block";
import Button from "../../components/Button";
import InputLazy from "../../components/InputLazy";
import { HANDLERS } from "../../../utils/handlers";
import AuthAPI from "../../api/AuthorizationAPI";
import { TResponse, someObject } from "../../../const/types";

class UserSignUpController {
	signup(data: someObject) {
		const authPromise = AuthAPI.signup(data)

		authPromise.then((response: TResponse | unknown) => {
			console.log('signup', response)

			if ((response as TResponse)?.readyState === 4) {
				window.location.href = '/'
			}
		}).then(data => {
			// state = Object.assign({}, data);
			console.log('state', data)
		}).catch(console.warn)
	}
}

export default class RegisterPage extends Block {
	componentDidMount() {
		this.state = {
			login: "",
			password: "",
			first_name: "",
			second_name: "",
			email: "",
			phone: "",
		};
	}

	render() {
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

		const buttonEvents = {
			click: (event: Event) => {
				event.preventDefault();
				const { login, password, first_name, second_name, email, phone } = this.state;

				const userLoginController = new UserSignUpController();
				userLoginController.signup({ login, password, first_name, second_name, email, phone })
			}
		}

		const inputLogin = new InputLazy("div", { value: "", name: "login", inputEvents: inputLoginEvents });
		const inputPassword = new InputLazy("div", { value: "", name: "password", inputEvents: inputPasswordEvents });

		const inputFirstName = new InputLazy("div", { value: "", name: "first_name", inputEvents: inputFirstNameEvents });
		const inputSecondName = new InputLazy("div", { value: "", name: "second_name", inputEvents: inputSecondNameEvents });

		const inputEmail = new InputLazy("div", { value: "", name: "email", inputEvents: inputEmailEvents });
		const inputPhone = new InputLazy("div", { value: "", name: "phone", inputEvents: inputPhoneEvents });

		const button = new Button("div", { label: "Save", events: buttonEvents });

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
