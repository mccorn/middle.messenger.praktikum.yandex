export type someObject = { [key: string]: any };
export type someFunction = (...args: any) => any;

export type eventsObject = { [key: string]: someFunction };

export type Indexed<T = unknown> = {
	[key in string | symbol | number]: T;
};

export type ChatData = {
	id: string | number,
	avatarUrl: string,
	title: string,
	last_message: string,
	date: string,

	unread_count?: number,
	cutTitle?: string | number,
}

export type UserDataType = {
	id: string | number,
}

export type Response = {
	response: any,
	status: number,
	readyState: number,
}
