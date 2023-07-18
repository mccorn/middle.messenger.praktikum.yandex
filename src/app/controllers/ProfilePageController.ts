import Store from "../../utils/Store";
import AuthAPI from "../api/AuthAPI";
import ChatAPI from "../api/ChatAPI";

class ProfilePageController {
	setData() {
		const promise = AuthAPI.getAuthUser();
		return promise.then((response) => {
			const data = JSON.parse(response.response)
			if (response.status === 200) {
				Store.set('userData', data)
			}
			
			console.log('ProfilePageController setData', Store.getState())
		});
	}
}

export default new ProfilePageController();
