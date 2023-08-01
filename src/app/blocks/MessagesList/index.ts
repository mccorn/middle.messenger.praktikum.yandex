import "./styles.less";

import tmpl from "./index.tmpl";
import Block from "../../../utils/Component";
import { Indexed, someObject } from "../../../const/types";
import { connect } from "../../../utils";
import Store from "../../../utils/Store";

type TChatData = {
	messages: someObject[];
}

class MessagesList extends Block {
	render() {
		const {currentChatData} = Store.getState() as {currentChatData: TChatData};

		if (currentChatData) {
			currentChatData.messages?.forEach((node: someObject) => {
				node.classNames = this.props.me === node.user_id ? "me" : "";
			})
		}
		return this.compile(tmpl, this.props);
	}
}

const mapStateToProps = (state: Indexed) => ({
	currentChatData: state.currentChatData,
})

export default connect(MessagesList, mapStateToProps)
