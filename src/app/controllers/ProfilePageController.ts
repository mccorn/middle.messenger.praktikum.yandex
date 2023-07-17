import Store from "../../utils/Store";
import AuthAPI from "../api/AuthAPI";
import ChatAPI from "../api/ChatAPI";

class ProfilePageController {
	async setData() {
		const promise = AuthAPI.getAuthUser();
		const response = await promise;
		const data = JSON.parse(response.response);
		if (response.status === 200) {
			Store.set('userData', data);
		}
		console.log('ProfilePageController setData', Store.getState());
	}
}

export default new ProfilePageController();
