import { HTTPTransport } from "../../utils/fetch";

const url = 'https://ya-praktikum.tech/api/v2/auth'
const http = new HTTPTransport();
const options = {
	credentials: 'include', // Нужно подставлять куки
	mode: 'cors', // Работаем с CORS
}
const headersJSON = {
	'content-type': 'application/json', // Данные отправляем в формате JSON
}

let state = { id: null }

export default class UserController {
	signin(data: object = {}) {
		const reqOptions = Object.assign(options,
			{
				headers: headersJSON,
				data: JSON.stringify(data)
			}
		)

		http.post(url + '/signin', reqOptions).then(response => {
			console.log('signin', response)
		})
	}

	signup(data: object = {}) {
		const reqOptions = Object.assign(options,
			{
				headers: headersJSON,
				data: JSON.stringify(data)
			}
		)

		http.post(url + '/signup', reqOptions).then((response: unknown) => {
			console.log('signup', response)

			if (response.status === 200) {
				return JSON.parse(response.response);
			}
		}).then(data => {
			state = Object.assign({}, data);
			console.log('state', state)
		})
	}

	getAuthUser() {
		const reqOptions = Object.assign(options, {})

		http.get(url + '/user', reqOptions).then(response => {
			console.log('user', response)
		})
	}

	logout() {
		http.post(url + '/logout', {}).then(response => {
			console.log('logout', response)
		})
	}
}
