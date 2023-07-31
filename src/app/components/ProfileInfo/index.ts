import template from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Block";
import { Indexed, UserDataType } from "../../../const/types";
import { RESOURCES_URL } from "../../api";
import { connect } from "../../../utils";

type ProfileInfoProps = {
	data: UserDataType
}

class ProfileInfo extends Block {
	render() {
		
		
		return this.compile(template, {...this.props as ProfileInfoProps, avatarUrl: RESOURCES_URL + this.props.data.avatar});
	}
}

const mapStateToProps = (state: Indexed) => ({
	data: state.userData,
})

export default connect(ProfileInfo, mapStateToProps)
