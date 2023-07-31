import { TResponse } from "../../const/types";
import { utils } from "../../utils";
import Store from "../../utils/Store";
import AuthAPI from "../api/AuthorizationAPI";

class ProfilePageController {
	setData() {
		const promise = AuthAPI.getAuthUser();

		return promise.then((response: Response | unknown) => {
			const data = utils.safeGetData(response);
			if ((response as TResponse).status === 200) {
				Store.set('userData', data)
			}

			console.log('ProfilePageController setData', Store.getState())
		}).catch(console.warn);
	}
}

export default new ProfilePageController();
