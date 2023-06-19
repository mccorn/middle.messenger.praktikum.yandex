import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Block";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ChatsList from "../../blocks/ChatsList";
import Message from "../../components/Message";
import { utils } from "../../../utils";
import { someObject } from "../../../const/types";
import { validate } from "../../../utils/validator";

export default class HomePage extends Block {
	render() {
		const {currentChatIdx} = this.state;
		const {data} = this.props;
		const {chats} = data;

		function findParentBySelector(target: HTMLElement | null, selector = "", count = 10) {
			let i = 0;

			while (i < count && target) {
				if (target.matches(selector)) {
					return target;
				} else {
					target = target.parentNode as HTMLElement;
					i += 1;
				}
			}

			return null;
		}

		const handleChatsClick = (event: Event) => {
			const parentNode = findParentBySelector(event.target as HTMLElement, ".chatInfo", 10);
			
			if (!parentNode) return;

			const messagesNode = document.querySelector("#messages") as HTMLElement;
			const id = parentNode.getAttribute("data-id");

			const currentChatIdx = chats.findIndex((node: someObject) => node.id === id)
			const chatData = chats[currentChatIdx]

			this.state.currentChatIdx = currentChatIdx;
			
			utils.clear(messagesNode)

			if (chatData) {
				chatData.messages.forEach((node: someObject) => {
					const block = new Message("div", {data: node, classNames: node.me ? "me" : ""}).getContent() as HTMLElement;
	
					messagesNode?.appendChild(block)
				})
			}
		}

		const handleSubmit = (event: Event) => {
			event.preventDefault();
			console.log(this.state, "validate success = " + validate("form", {message: this.state.message}));
		}
		const handleFocusOut = (event: Event) => {
			const target = event.target as HTMLInputElement;

			if (target) this.state[target.name] = target.value
			console.log("handleFocusOut: " + target.name, "validate success = " + validate(target.name, target.value));
		}

		const inputEvents = { focusout: handleFocusOut };
		const buttonEvents = {
			click: (event: Event) => handleSubmit(event),
		}

		const chatsList = new ChatsList("section", {chats, currentChatIdx, events: {click: handleChatsClick}});
		const input = new Input("div", { value: "", name: "message", events: inputEvents });
		const button = new Button("div", { label: "send", events: buttonEvents });

		this.children = {
			chatsList,
			input,
			button,
		}

		return this.compile(tmpl, {...this.props });
	}
}
