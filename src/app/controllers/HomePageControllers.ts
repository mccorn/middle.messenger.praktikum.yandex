import Store from "../../utils/Store";
import ChatAPI from "../api/ChatAPI";

class HomePageController {
	setData() {
		const promise = ChatAPI.request();
		promise.then((response) => {
			Store.set('chats', JSON.parse(response.response))

			console.log('HomePageController setData', Store.getState())
		});
	}
}

export default new HomePageController();
