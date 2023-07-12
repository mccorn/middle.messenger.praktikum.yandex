import { BASE_URL, BaseAPI } from ".";
import { HTTPTransport } from "../../utils/fetch";

const http = new HTTPTransport();

class AuthAPI extends BaseAPI {
	request() {
			return http.get(BASE_URL);
	}
}
