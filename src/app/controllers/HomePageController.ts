import { Response, UserDataType, someObject } from "../../const/types";
import Store from "../../utils/Store";
import { ChatsTransport, WSTransportEvents } from "../../utils/WSTransport";
import ChatAPI from "../api/ChatAPI";



class HomePageController {
	async getDataPromise() {
		const promise = ChatAPI.request();
		const response = await promise as Response;

		const data = JSON.parse(response.response);

		if (response.status === 200) {
			Store.set('chats', data);
		}

		console.log('HomePageController setData', Store.getState());

		return data
	}

	setData() {
		const promise = ChatAPI.request();
		const {userData} = Store.getState() as {userData: UserDataType};
		
		promise.then((response: Response | unknown) => {
			const data = JSON.parse((response as Response).response)
			Store.set('chats', data)

			console.log('HomePageController setData', Store.getState())
			return data;
		}).then(data => {
			data.forEach((node: someObject) => {
				this
					.getTokenPromise(node.id)
					.then((response: Response | unknown) => {
						node.token = JSON.parse((response as Response).response).token;

						if (userData && userData.id && !node.transport) {
							node.transport = new ChatsTransport(`/${userData.id}/${node.id}/${node.token}`);
							node.transport.connect();

							node.transport.on(WSTransportEvents.message, (data: someObject[]) => {

								if (!data[0].type || data[0].type === 'message') {
									if (Array.isArray(data) && node.messages) {
										if (!node.messages) {
											node.messages = data[0];
										} else {
											node.messages = data.concat(node.messages)
										}
									} else {
										if (!node.messages) node.messages = data[0]; else node.messages.push(data[0])
									}

									Store.set('currentChatData.messages', node.messages);
								}
							})
						}
				
						return node
					})
			})
		});
	}

	getTokenPromise(id: string | number) {
		return ChatAPI.getToken(id);
	}
}

export default new HomePageController();
