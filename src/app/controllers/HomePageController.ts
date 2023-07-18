import { someObject } from "../../const/types";
import Store from "../../utils/Store";
import { Socket } from "../../utils/WSTransport";
import ChatAPI from "../api/ChatAPI";

class HomePageController {
	async getDataPromise() {
		const promise = ChatAPI.request();
		const response = await promise;
		const data = JSON.parse(response.response);

		if (response.status === 200) {
			Store.set('chats', data);
		}

		console.log('HomePageController setData', Store.getState());

		return data
	}

	setData() {
		const promise = ChatAPI.request();
		const {userData = {}} = Store.getState();
		
		promise.then((response) => {
			const data = JSON.parse(response.response)
			Store.set('chats', data)

			console.log('HomePageController setData', Store.getState())
			return data;
		}).then(data => {
			data.forEach((node: someObject) => {
				this
					.getTokenPromise(node.id)
					.then(response => {
						node.token = JSON.parse(response.response).token;
						node.socket = new Socket({userId: userData.id, chatId: node.id, tokenValue: node.token});
						node.socket.setData = (data: someObject) => {if (data) node.messages = data};
						node.socket.push = (data: someObject) => {if (data && node.messages) node.messages.push(data)};

						console.log(node)
				
						return node
					})
			})
		});
	}

	getTokenPromise(id: string | number) {
		return ChatAPI.getToken(id);
	}

	getSocket(data: someObject) {		
		return new Socket(data);
	}

}

export default new HomePageController();
