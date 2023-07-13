import { HTTPTransport } from "../../utils/fetch";

const url = 'https://ya-praktikum.tech/api/v2/auth'
const http = new HTTPTransport();
const options = {
	// mode: 'cors', // Работаем с CORS
}
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
