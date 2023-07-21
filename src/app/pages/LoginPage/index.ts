import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Block";
import InputWithLabel from "../../components/InputWithLabel";
import Button from "../../components/Button";
import { HANDLERS } from "../../../utils/handlers";
import { validate } from "../../../utils/validator";
import { TResponse, someObject } from "../../../const/types";
import AuthAPI from "../../api/AuthorizationAPI";

class UserLoginController {
	login(data: someObject) {
		const validateResult = validate("form", data)

		if (!validateResult.success) {
			console.log('validateResult incorrect', validateResult)
			// throw new Error("Validate incorrect")
		} else {
			const authPromise = AuthAPI.login(data)

			authPromise.then((response: TResponse | unknown) => {
				if ((response as TResponse)?.readyState === 4) {
					window.location.href = '/messenger'
				}
			}).catch(console.warn)

		}
	}
}

export default class LoginPage extends Block {
	componentDidMount() {
		this.state = {
			login: "",
			password: "",
		}
	}

	render() {
		const inputLoginEvents = {
			focusout: (event: Event) => HANDLERS.handleFocusOut(event, this, this.children.inputLogin),
			// input: () => HANDLERS.handleInputWithError(this.children.inputLogin)
		};
		const inputPasswordEvents = {
			focusout: (event: Event) => HANDLERS.handleFocusOut(event, this, this.children.inputPassword),
			// input: () => HANDLERS.handleInputWithError(this.children.inputPassword),
		};

		const buttonEvents = {
			click: (event: Event) => {
				event.preventDefault();

				const userLoginController = new UserLoginController();
				userLoginController.login({
					login: this.state.login,
					password: this.state.password,
				})
			}
		}

		const inputLogin = new InputWithLabel("div", { value: "", name: "login", placeholder: "login", label: "login", inputEvents: inputLoginEvents });
		const inputPassword = new InputWithLabel("div", { value: "", name: "password", placeholder: "password", label: "password", inputEvents: inputPasswordEvents });

		const button = new Button("div", { label: "Sign in", events: buttonEvents });

		this.children.inputLogin = inputLogin;
		this.children.inputPassword = inputPassword;

		this.children.button = button;

		return this.compile(tmpl, this.props);
	}
}
