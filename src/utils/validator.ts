import { someObject } from "../const/types";

export function validate(type: string, value: any) {
	const validator = VALIDATORS[type] || VALIDATORS.default;

	return validator(value)
}

function validateLogin(value: any): boolean {
	return !!value && typeof value === 'string' && !!value.match(REGEXPS.login) && value.toString().replace(/[0-9]/g, "") !== "";
}

function validateName(value: any): boolean {
	return !!value && !!value.match(REGEXPS.name);
}

function validatePassword(value: any): boolean {
	return typeof value === 'string';
}

function validateEmail(value: any): boolean {
	return typeof value === 'string';
}

function validatePhone(value: any): boolean {
	return !!value && !!value.match(REGEXPS.phone);
}

function validateMessage(value: any): boolean {
	return typeof value === 'string' && value.length > 0;
}

const REGEXPS = {
	phone: /^(([+0-9]){10,15})$/gi,
	login: /^(([0-9a-zA-Za-яA-Я\-]){3,20})$/gi,
	name: /^^([А-Я]{1}[а-яё\-]{1,19}|[A-Z]{1}[a-z\-]{1,19})$/gm,
}

const VALIDATORS: someObject = {
	login: validateLogin,
	name: validateName,
	password: validatePassword,
	email: validateEmail,
	phone: validatePhone,
	message: validateMessage,

	default: validateName,
}
