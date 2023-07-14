import { BASE_URL } from ".";
import { HTTPTransport } from "../../utils/fetch";

const url = BASE_URL + '/user'
const http = new HTTPTransport();
const options = {};
const headersJSON = {
	'content-type': 'application/json',
}
const headersFormData = {
	'content-type': 'multipart/form-data',
}

class UserAPI {
	update(data: object = {}) {
		const reqOptions = Object.assign(options,
			{
				headers: headersJSON,
				data: JSON.stringify(data)
			}
		)

		return http.put(url + '/profile', reqOptions);
	}

	updateAvatar(data: any) {
		const form = new FormData();
		form.set('file', data);

		const reqOptions = Object.assign(options,
			{
				headers: headersFormData,
				data: form,
			}
		)

		return http.put(url + '/profile/avatar', reqOptions);
	}

	updatePassword(data: object = {}) {
		const reqOptions = Object.assign(options,
			{
				headers: headersFormData,
				data: JSON.stringify(data)
			}
		)

		return http.put(url + '/password', reqOptions);
	}

	getUserById(id: string | number) {
		const reqOptions = Object.assign(options, {})

		return http.get(url + '/user/' + id, reqOptions);
	}

	search(data: {login: string} = {login: ""}) {
		const reqOptions = Object.assign(options,
			{
				headers: headersFormData,
				data: JSON.stringify(data)
			}
		)

		return http.post(url + '/search', reqOptions);
	}
}

export default new UserAPI();
