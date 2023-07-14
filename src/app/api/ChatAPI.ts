import { BASE_URL } from ".";
import { HTTPTransport } from "../../utils/fetch";

const url = BASE_URL + '/chats'
const http = new HTTPTransport();
const options = {};
const headersJSON = {
	'content-type': 'application/json', // Данные отправляем в формате JSON
}
const headersFormData = {
	'content-type': 'multipart/form-data',
}

type chatIdData = {
	chatId: number | string,
}

type titleData = {
	title: string,
}

type getUsersData = {
	chatId: number | string,
	offset?: number,
	limit?: number,
	name?: string,
	email?: string,
}

type updateAvatarData = {
	chatId: number | string,
	avatar: File,
}

type addUsersData = {
	chatId: number | string,
	users: number[] | string[],
}

type deleteUsersData = addUsersData;

class AuthAPI {
	request() {
		return http.get(url);
	}

	create(data: titleData) {
		const reqOptions = Object.assign(options,
			{
				headers: headersJSON,
				data: JSON.stringify(data)
			}
		)

		return http.post(url, reqOptions);
	}

	delete(data: chatIdData) {
		const reqOptions = Object.assign(options,
			{
				headers: headersJSON,
				data: JSON.stringify(data)
			}
		)

		return http.post(url, reqOptions);
	}

	getUsers(data: getUsersData) {
		const reqOptions = Object.assign(options,
			{
				headers: headersJSON,
				data: JSON.stringify(data)
			}
		)

		return http.get(url + `/${data.chatId}/users`, reqOptions);
	}

	getNewMessagesCount(data: chatIdData) {
		const reqOptions = Object.assign(options,
			{
				headers: headersJSON,
				data: JSON.stringify(data)
			}
		)

		return http.get(url + `/new/${data.chatId}`, reqOptions);
	}

	updateAvatar(data: updateAvatarData) {
		const reqOptions = Object.assign(options, {
			headers: headersFormData,
			data: JSON.stringify(data)
		})

		return http.put(url + '/avatar', reqOptions);
	}

	addUsers(data: addUsersData) {
		const reqOptions = Object.assign(options,
			{
				headers: headersJSON,
				data: JSON.stringify(data)
			}
		)

		return http.put(url + '/users', reqOptions);
	}

	deleteUsers(data: deleteUsersData) {
		const reqOptions = Object.assign(options,
			{
				headers: headersJSON,
				data: JSON.stringify(data)
			}
		)
		return http.delete(url + '/users', reqOptions);
	}
}

export default new AuthAPI();
