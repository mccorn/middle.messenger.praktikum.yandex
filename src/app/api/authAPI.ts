import { BASE_URL } from ".";
import { HTTPTransport } from "../../utils/fetch";

const url = BASE_URL + '/auth';
const http = new HTTPTransport();
const options = {};
const headersJSON = {
	'content-type': 'application/json', // Данные отправляем в формате JSON
}

class AuthAPI {
	signin(data: object = {}) {
		const reqOptions = Object.assign(options,
			{
				headers: headersJSON,
				data: JSON.stringify(data)
			}
		)

		return http.post(url + '/signin', reqOptions);
	}

	signup(data: object = {}) {
		const reqOptions = Object.assign(options,
			{
				headers: headersJSON,
				data: JSON.stringify(data)
			}
		)

		return http.post(url + '/signup', reqOptions);
	}

	getAuthUser() {
		const reqOptions = Object.assign(options, {})

		return http.get(url + '/user', reqOptions);
	}

	logout() {
		return http.post(url + '/logout', {});
	}
}

export default new AuthAPI();
