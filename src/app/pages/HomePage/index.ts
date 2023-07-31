import tmpl from "./index.tmpl";
import "./styles.less";

import Block from "../../../utils/Component";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ChatsList from "../../blocks/ChatsList";
import { connect, utils } from "../../../utils";
import { ChatData, Indexed, TResponse, someObject } from "../../../const/types";
import { VALIDATORS_TYPES, validate } from "../../../utils/validator";
import AuthAPI from "../../api/AuthorizationAPI";
import ChatAPI from "../../api/ChatAPI";
import HomePageController from "../../controllers/HomePageController";
import MessagesList from "../../blocks/MessagesList";
import Store from "../../../utils/Store";
import ProfileInfo from "../../components/ProfileInfo";
import { RESOURCES_URL } from "../../api";

class HomePage extends Block {
	restructuringData(chats: ChatData[]) {
		chats.forEach((node: ChatData) => {
			if (node.restructuring) return;

			const cutTitle = node.title.toString().slice(0, 2);
			node.cutTitle = cutTitle;
			node.avatar = node.avatar && RESOURCES_URL + node.avatar;
			node.restructuring = true;
			return { ...node }
		})
	}

	render() {
		const { chats, userData } = this.props;
		const { currentChatIdx, currentChatData } = this.state;

		if (chats) {
			this.restructuringData(chats as ChatData[]);
		} else {
			HomePageController.setData();
		}

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

			const currentChatIdx = chats.findIndex((node: someObject) => node.id.toString() === id);

			if (currentChatIdx === this.state.currentChatIdx) return;

			const chatData = chats[currentChatIdx]

			this.state.currentChatIdx = currentChatIdx;

			utils.clear(messagesNode)

			this.state.currentChatData = chatData;

			Store.set('currentChatData', chatData)
		}

		const handleSubmit = (event: Event) => {
			event.preventDefault();
			const { currentChatIdx, message } = this.state;
			const chatData = chats[currentChatIdx];

			const validateResult = validate("message", message);

			if (validateResult.success) {
				chatData.transport.sendMessage(message);
			}

			console.log('handleSubmit', chatData, this.state);
		}

		const handleFocusOut = (event: Event) => {
			const target = event.target as HTMLInputElement;

			if (target) this.state[target.name] = target.value
			// console.log("handleFocusOut: " + target.name, "validate success = " + validate(target.name, target.value));
		}

		const inputEvents = {
			focusout: handleFocusOut,
			input: (event: InputEvent) => {
				const {button} = this.children;
				const target = event.target as HTMLInputElement;
				const validateResult = validate(VALIDATORS_TYPES.message, target.value);

				if (validateResult.success) {
					button.enable();
				} else {
					button.disable();
				}
				console.log('inputEvents_change', target.value, validateResult.success)
			}
		};
		const buttonEvents = {
			click: (event: Event) => handleSubmit(event),
		}
		const createChatButtonEvents = {
			click: function () {
				const newTitle = prompt('Введите имя нового чата: ');

				console.log('newTitle', newTitle)

				if (!newTitle || !(newTitle.trim())) return;

				const promise = ChatAPI.create({ title: newTitle.toString() });
				promise.then(() => HomePageController.setData()).catch(console.warn);
			},
		}
		const getUsersButtonEvents = {
			click: function () {
				const chatId = prompt('Введите id чата (при пустом вводе будут получены пользователи активного чата): ');

				if (!chatId && !currentChatData) return;

				ChatAPI.getUsers({
					chatId: chatId || currentChatData.id,
				}).then((response: TResponse | unknown) => {
					console.log(utils.safeGetData(response));
				}).catch(console.warn);
			},
		}
		const addUsersButtonEvents = {
			click: function () {
				const userId = prompt('Введите id пользователя (пользователь будет добавлен в активный чат): ');

				if (!userId || !currentChatData) return;

				const promise = ChatAPI.addUsers({
					chatId: currentChatData.id,
					users: [userId]
				});
				promise.then(console.log).catch(console.warn);
			},
		}
		const deleteUsersButtonEvents = {
			click: function () {
				const userId = prompt('Введите id пользователя (пользователь будет удален из активного чата): ');

				if (!userId || !currentChatData) return;

				const promise = ChatAPI.deleteUsers({
					chatId: currentChatData.id,
					users: [userId]
				});
				promise.then(console.log).catch(console.warn);
			},
		}

		const chatsList = new ChatsList("section", { chats, currentChatIdx, events: { click: handleChatsClick } });
		const profileInfo = new ProfileInfo("section", { data: userData });
		const messagesList = new MessagesList("fragment", { data: currentChatData, currentChatIdx, me: userData.id });
		const input = new Input("div", { value: "", name: "message", events: inputEvents });
		const button = new Button("div", { label: "send", disabled: true, events: buttonEvents });

		const createChatButton = new Button("div", { label: "createChatButton", events: createChatButtonEvents });
		const getUsersButton = new Button("div", { label: "getUsersButton", events: getUsersButtonEvents });
		const addUsersButton = new Button("div", { label: "addUserButton", events: addUsersButtonEvents });
		const deleteUsersButton = new Button("div", { label: "deleteUsersButton", events: deleteUsersButtonEvents });

		this.children = {
			createChatButton,
			getUsersButton,
			addUsersButton,
			deleteUsersButton,

			chatsList,

			profileInfo,

			messagesList,

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
