import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Block";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ChatsList from "../../blocks/ChatsList";
import Message from "../../components/Message";
import { connect, utils } from "../../../utils";
import { ChatData, Indexed, someObject } from "../../../const/types";
import { validate } from "../../../utils/validator";
import AuthAPI from "../../api/AuthAPI";
import ChatAPI from "../../api/ChatAPI";
import HomePageController from "../../controllers/HomePageController";

let counter = 0;

class HomePage extends Block {
	restructuringData(chats: ChatData[]) {
		chats.forEach((node: ChatData) => {
			const cutTitle = node.title.toString().slice(0, 2);
			node.cutTitle = cutTitle;
			return {...node }
		})
	}

	render() {
		const { chats, userData } = this.props;
		const { currentChatIdx } = this.state;

		if (chats) this.restructuringData(chats as ChatData[]); else HomePageController.setData();

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

			const currentChatIdx = chats.findIndex((node: someObject) => node.id.toString() === id)
			const chatData = chats[currentChatIdx]

			this.state.currentChatIdx = currentChatIdx;

			utils.clear(messagesNode)

			console.log('chatData', chatData, userData)

			if (chatData) {
				// chatData.messages = [];
				chatData.messages.forEach((node: someObject) => {
					const block = new Message("div", { data: node, classNames: node.user_id === userData.id ? "me" : "" }).getContent() as HTMLElement;

					messagesNode?.appendChild(block)
				})
			}
		}

		const handleSubmit = (event: Event) => {
			event.preventDefault();
			console.log(this.state, "validate success = " + validate("form", { message: this.state.message }));
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
		const logoutEvents = {
			click: function (event: Event) {
				event.preventDefault();

				const promise = AuthAPI.logout();
				promise.then(console.log);
			},
		}
		const getChatsButtonEvents = {
			click: () => HomePageController.setData(),
		}
		const createChatButtonEvents = {
			click: function () {
				const newTitle = 'user13chatTitle' + counter++;

				const promise = ChatAPI.create({ title: newTitle });
				promise.then(console.log);
			},
		}
		const getUsersButtonEvents = {
			click: function () {
				const promise = ChatAPI.getUsers({
					chatId: 16986,
				});
				promise.then(response => {
					console.log(JSON.parse(response.response))
				});
			},
		}
		const addUsersButtonEvents = {
			click: function () {
				const promise = ChatAPI.addUsers({
					chatId: 16986,
					users: [1204237, 1203661]
				});
				promise.then(console.log);
			},
		}
		const deleteUsersButtonEvents = {
			click: function () {
				const promise = ChatAPI.deleteUsers({
					chatId: 16986,
					users: [1204237]
				});
				promise.then(console.log);
			},
		}

		const chatsList = new ChatsList("section", { chats, currentChatIdx, events: { click: handleChatsClick } });
		const input = new Input("div", { value: "", name: "message", events: inputEvents });
		const button = new Button("div", { label: "send", events: buttonEvents });
		const logout = new Button("div", { label: "logout", events: logoutEvents });
		const getChatsButton = new Button("div", { label: "getChatsButton", events: getChatsButtonEvents });
		const createChatButton = new Button("div", { label: "createChatButton", events: createChatButtonEvents });
		const getUsersButton = new Button("div", { label: "getUsersButton", events: getUsersButtonEvents });
		const addUsersButton = new Button("div", { label: "addUserButton", events: addUsersButtonEvents });
		const deleteUsersButton = new Button("div", { label: "deleteUsersButton", events: deleteUsersButtonEvents });

		this.children = {
			logout,
			getChatsButton,
			createChatButton,
			getUsersButton,
			addUsersButton,
			deleteUsersButton,

			chatsList,
			input,
			button,
		}

		return this.compile(tmpl, { ...this.props });
	}
}

const mapStateToProps = (state: Indexed) => ({
	userData: state.userData,
	chats: state.chats,
})

export default connect(HomePage, mapStateToProps)
