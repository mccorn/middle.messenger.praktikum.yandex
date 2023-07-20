import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Block";
import InputLazy from "../../components/InputLazy";
import Button from "../../components/Button";
import { HANDLERS } from "../../../utils/handlers";
import InputFile from "../../components/InputFile";
import UserAPI from "../../api/UserAPI";
import Store from "../../../utils/Store";
import { connect, utils } from "../../../utils";
import { Indexed, TResponse } from "../../../const/types";
import ProfilePageController from "../../controllers/ProfilePageController";

class ProfilePage extends Block {
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
		let { userData } = this.props;

		if (!userData) {
			ProfilePageController.setData();
			userData = {};
		}

		const inputAvatarEvents = {
			change: (event: Event) => {
				const target = event.target as HTMLInputElement;
				const file = (target.files as FileList)[0];
				const form = new FormData();
				
				form.set('avatar', file);

				const promise = UserAPI.updateAvatar(form);
				promise.then((response: Response | unknown) => {
					Store.set('userData.avatar', utils.safeGetData(response).avatar)

					console.log('inputAvatarEvents setData', Store.getState())
				})
			},
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

		const buttonEvents = {
			click: (event: Event) => {
				event.preventDefault();
				const {login, display_name, first_name, second_name, email, phone} = this.state;

				const promise = UserAPI.update({login, display_name, first_name, second_name, email, phone});
				promise.then((response: TResponse | unknown) => {
					if ((response as TResponse).status === 200) {
						Store.set('userData', utils.safeGetData(response))
					}

					console.log('buttonEvents setData', Store.getState())
				})
			},
		}
		const buttonChangePasswordEvents = { 
			click: (event: Event) => {
				event.preventDefault();
				const {newPassword, oldPassword} = this.state;

				console.log(newPassword, oldPassword)
				UserAPI.updatePassword({newPassword, oldPassword}).then(console.log);
			},
		}

		const inputAvatar = new InputFile("div", { value: "", name: "avatar", events: inputAvatarEvents });

		const inputLogin = new InputLazy("div", { value: userData.login, name: "login", inputEvents: inputLoginEvents });
		const inputDisplayName = new InputLazy("div", { value: userData.display_name, name: "display_name", inputEvents: inputPasswordEvents });
		const inputFirstName = new InputLazy("div", { value: userData.first_name, name: "first_name", inputEvents: inputFirstNameEvents });
		const inputSecondName = new InputLazy("div", { value: userData.second_name, name: "second_name", inputEvents: inputSecondNameEvents });
		const inputEmail = new InputLazy("div", { value: userData.email, name: "email", inputEvents: inputEmailEvents });
		const inputPhone = new InputLazy("div", { value: userData.phone, name: "phone", inputEvents: inputPhoneEvents });

		const button = new Button("div", { label: "Save", events: buttonEvents });

		const inputNewPassword = new InputLazy("div", { value: "", name: "newPassword", type: "password", inputEvents: inputNewPasswordEvents });
		const inputOldPassword = new InputLazy("div", { value: "", name: "oldPassword", type: "password", inputEvents: inputOldPasswordEvents });

		const buttonChangePassword = new Button("div", { label: "ChangePassword", events: buttonChangePasswordEvents });

		this.children = {
			inputAvatar,

			inputLogin,
			inputDisplayName,
			inputFirstName,
			inputSecondName,
			inputEmail,
			inputPhone,

			button,

			inputNewPassword,
			inputOldPassword,

			buttonChangePassword,
		}

		return this.compile(tmpl, this.props);
	}
}

const mapStateToProps = (state: Indexed) => ({
	userData: state.userData,
})

export default connect(ProfilePage, mapStateToProps)
