export type someObject = { [key: string]: any };
export type someFunction = (...args: any) => any;

export type eventsObject = {[key: string]: someFunction};
