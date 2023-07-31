import template from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Component";
import { Indexed, TResponse, UserDataType } from "../../../const/types";
import { RESOURCES_URL } from "../../api";
import { connect } from "../../../utils";
import LogoutIcon from "../../blocks/LogoutIcon";
import AuthorizationAPI from "../../api/AuthorizationAPI";

type ProfileInfoProps = {
	data: UserDataType
}

class ProfileInfo extends Block {
	render() {
		const logoutEvents = {
			click: (event: Event) => {
				event.preventDefault();

				const promise = AuthorizationAPI.logout();
				promise.then(response => (response as TResponse).status === 200 ? window.location.href = "" : null).catch(console.warn);
			},
		}

		const logoutIcon = new LogoutIcon('div', {events: logoutEvents});

		this.children = {
			logoutIcon
		}
		
		return this.compile(template, {...this.props as ProfileInfoProps, avatarUrl: RESOURCES_URL + this.props.data.avatar});
	}
}

const mapStateToProps = (state: Indexed) => ({
	data: state.userData,
})

export default connect(ProfileInfo, mapStateToProps)
