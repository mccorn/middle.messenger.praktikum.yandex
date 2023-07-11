export type someObject = { [key: string]: any };
export type someFunction = (...args: any) => any;

export type eventsObject = {[key: string]: someFunction};

export type Indexed<T = unknown> = {
	[key in string | symbol | number]: T;
};
