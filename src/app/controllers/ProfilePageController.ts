import Store from "../../utils/Store";
import AuthAPI from "../api/AuthAPI";
import ChatAPI from "../api/ChatAPI";

class ProfilePageController {
	setData() {
		const promise = AuthAPI.getAuthUser();
		promise.then((response) => {
			if (response.status === 200) {
				Store.set('userData', JSON.parse(response.response))
			}
			
			console.log('HomePageController setData', Store.getState())
		});
	}
}

export default new ProfilePageController();
