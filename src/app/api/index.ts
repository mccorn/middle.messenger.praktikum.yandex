export const BASE_URL = "ya-praktikum.tech/api/v2";

export class BaseAPI {
	// На случай, если забудете переопределить метод и используете его, — выстрелит ошибка
	create() { throw new Error('Not implemented'); }

	request() { throw new Error('Not implemented'); }

	update() { throw new Error('Not implemented'); }

	delete() { throw new Error('Not implemented'); }
}
