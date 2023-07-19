import { Response } from "../../const/types";
import Store from "../../utils/Store";
import AuthAPI from "../api/AuthAPI";

class ProfilePageController {
	setData() {
		const promise = AuthAPI.getAuthUser();
		return promise.then((response: Response | unknown) => {
			const data = JSON.parse((response as Response).response)
			if ((response as Response).status === 200) {
				Store.set('userData', data)
			}
			
			console.log('ProfilePageController setData', Store.getState())
		});
	}
}

export default new ProfilePageController();
