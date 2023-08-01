export type someObject = { [key: string]: any };
export type someFunction = (...args: any) => unknown;

export type eventsObject = { [key: string]: someFunction };

export type Indexed<T = unknown> = {
	[key in string | symbol | number]: T;
};

export type ChatData = {
	id: string | number,
	avatar: string,
	title: string,
	last_message: string,
	date: string,

	unread_count?: number,
	cutTitle?: string | number,
	restructuring?: boolean;
}

export type UserDataType = {
	id: string | number,
	avatar?: string,
}

export type TResponse = {
	response: unknown | string,
	status: number,
	readyState: number,
}

export enum XHR_METHODS_TYPES {
	GET = "GET",
	PUT = "PUT",
	POST = "POST",
	DELETE = "DELETE",
}
