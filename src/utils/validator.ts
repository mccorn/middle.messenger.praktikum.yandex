import { someObject } from "../const/types";

type statusObject = {
	success: boolean,
	message?: string,
}

const ERROR_MESSAGES = {
	empty: 'is empty',
	incorrect: 'incorrect data',
	length: 'error length',
	onlyNumbers: 'only numbers',
	invalid: 'invalid symbols',
	notNumbers: 'not numbers',
	notCapitalLetters: 'not capital letters',
}

export const VALIDATORS_TYPES = {
	login: 'login',
	name: 'name',

	password: 'password',
	newPassword: 'password',
	oldPassword: 'password',

	email: 'email',
	phone: 'phone',
	message: 'message',
	default: 'name',
}

export function validate(type: string, value: unknown) {
	const validator = VALIDATORS[type] || VALIDATORS.default;

	return validator(value)
}

function validateLogin(value: any): statusObject {
	if (!value)
		return { success: false, message: ERROR_MESSAGES.empty };

	if (typeof value !== "string")
		return { success: false, message: ERROR_MESSAGES.incorrect };

	if (value.length < 3 || value.length > 20)
		return { success: false, message: ERROR_MESSAGES.length };

	if (!value.match(REGEXPS.login))
		return { success: false, message: ERROR_MESSAGES.invalid };

	if (value.match(REGEXPS.login) && value.toString().replace(/[0-9]/g, "") === "")
		return { success: false, message: ERROR_MESSAGES.onlyNumbers };

	return { success: true };
}

function validateName(value: any): statusObject {
	if (!value)
		return { success: false, message: ERROR_MESSAGES.empty };

	if (!value.match(REGEXPS.name))
		return { success: false, message: ERROR_MESSAGES.invalid };

	return { success: true };
}

function validatePassword(value: any): statusObject {
	if (!value)
		return { success: false, message: ERROR_MESSAGES.empty };

	const hasNumber = value.toString().match(/[0-9]/g);
	const hasCapitalLetter = value.toString().match(/[A-ZА-ЯЁ]/g);

	if (typeof value !== "string")
		return { success: false, message: ERROR_MESSAGES.incorrect };

	if (!hasNumber)
		return { success: false, message: ERROR_MESSAGES.notNumbers };

	if (!hasCapitalLetter)
		return { success: false, message: ERROR_MESSAGES.notCapitalLetters };

	if (!value.match(REGEXPS.password))
		return { success: false, message: ERROR_MESSAGES.invalid };

	return { success: true };
}

function validateEmail(value: any): statusObject {
	if (!value)
		return { success: false, message: ERROR_MESSAGES.empty };

	if (typeof value !== "string")
		return { success: false, message: ERROR_MESSAGES.incorrect };

	if (!value.match(REGEXPS.email))
		return { success: false, message: ERROR_MESSAGES.invalid };

	return { success: true };
}

function validatePhone(value: any): statusObject {
	if (!value)
		return { success: false, message: ERROR_MESSAGES.empty };

	if (typeof value !== "string")
		return { success: false, message: ERROR_MESSAGES.incorrect };

	if (!value.match(REGEXPS.phone))
		return { success: false, message: ERROR_MESSAGES.invalid };

	return { success: true };
}

function validateMessage(value: any): statusObject {
	if (typeof value !== "string")
		return { success: false, message: ERROR_MESSAGES.incorrect };

	if (value.length <= 0)
		return { success: false, message: ERROR_MESSAGES.empty };

	return { success: true };
}

function validateForm(formData: someObject): someObject {
	let result = true;

	for (const key in formData) {
		result = result && validate(key, formData[key]).success
	}
	return { success: result };
}

const REGEXPS = {
	phone: /^(([+0-9]){10,15})$/g,
	login: /^(([0-9a-zA-Za-яA-Я-]){3,20})$/g,
	name: /^^([А-Я]{1}[а-яё-]{1,19}|[A-Z]{1}[a-z-]{1,19})$/g,
	password: /^(([0-9a-zA-Za-яёA-ЯЁ-]){8,40})$/g,
	email: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/g,
}

const VALIDATORS: someObject = {
	login: validateLogin,
	name: validateName,

	password: validatePassword,
	newPassword: validatePassword,
	oldPassword: validatePassword,

	email: validateEmail,
	phone: validatePhone,
	message: validateMessage,
	form: validateForm,

	default: validateName,
}
