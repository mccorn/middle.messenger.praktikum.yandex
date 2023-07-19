import { someObject } from "../const/types";

const METHODS = {
	GET: "GET",
	PUT: "PUT",
	POST: "POST",
	DELETE: "DELETE",
};

function queryStringify(data: someObject) {
	let result = "";

	for (const key in data) {
		result += `${result ? "&" : "?"}${key}=${data[key]}`
	}

	return result;
}

type HTTPMethod = (url: string, options?: someObject) => Promise<unknown>

export class HTTPTransport {
	get: HTTPMethod = (url, options = {}) => {
		return this.request(url + queryStringify(options.data), { ...options, method: METHODS.GET }, options.timeout);
	};

	put: HTTPMethod = (url, options = {}) => {
		return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
	};

	post: HTTPMethod = (url, options = {}) => {
		return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
	};

	delete: HTTPMethod = (url, options = {}) => {
		return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
	};

	request = (url: string, options: someObject = { method: METHODS.GET }, timeout = 5000) => {
		const { method, data } = options;

		setTimeout(() => null, timeout);

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open(method, url);

			xhr.onload = function () { resolve(xhr); }

			xhr.onabort = reject;
			xhr.onerror = reject;
			xhr.ontimeout = reject;

			if (method === METHODS.GET || !data) {
				xhr.send();
			} else {
				xhr.send(data);
			}
		})
	};
}

export function fetchWithRetry(url: string, options: someObject) {
	let { retries = 1 } = options;

	let response = null;
	const xhr = new HTTPTransport();

	while (retries > 0 && !response) {
		retries -= 1;
		response = xhr.request(url, options)
	}

	return response
}
