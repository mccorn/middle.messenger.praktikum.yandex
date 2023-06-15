import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Block.js";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ChatsList from "../../blocks/ChatsList";

export default class HomePage extends Block {
	componentDidMount() {
		this.state = {};
	}

	render() {
		const {data} = this.props;
		const {chats, messages} = data;

		const messagesNodes = messages.map((node, idx) => {
			if (node.me) {
				node.classNames += " me"
			}
			return node;
		})

		const handleSubmit = (event) => {
			event.preventDefault();
			console.log(this.state);
		}
		const handleFocusOut = (event) => {
			this.state[event.target.name] = event.target.value
		}

		const inputEvents = { focusout: handleFocusOut };
		const buttonEvents = {
			click: (event) => handleSubmit(event, self),
		}

		const chatsList = new ChatsList('section', {chats});
		const input = new Input('div', { value: "", name: "message", events: inputEvents });
		const button = new Button('div', { label: "send", events: buttonEvents });

		this.children = {
			chatsList,
			input,
			button,
		}

		return this.compile(tmpl, {...this.props, messagesNodes });
	}
}
