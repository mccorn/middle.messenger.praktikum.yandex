import { someObject } from "../const/types";

export function validate(type: string, value: any) {
	const validator = VALIDATORS[type] || VALIDATORS.default;

	return validator(value)
}

function validateLogin(value: any): boolean {
	return !!value && typeof value === "string" && !!value.match(REGEXPS.login) && value.toString().replace(/[0-9]/g, "") !== "";
}

function validateName(value: any): boolean {
	return !!value && !!value.match(REGEXPS.name);
}

function validatePassword(value: any): boolean {
	if (!value) return false;

	const hasNumber = value.toString().match(/[0-9]/g);
	const hasMajorLetter = value.toString().match(/[A-ZА-ЯЁ]/g);

	const result = typeof value === "string" && !!value.match(REGEXPS.password) && !!hasNumber && !!hasMajorLetter;

	return result;
}

function validateEmail(value: any): boolean {
	return typeof value === "string" && !!value.match(REGEXPS.email);
}

function validatePhone(value: any): boolean {
	return !!value && !!value.match(REGEXPS.phone);
}

function validateMessage(value: any): boolean {
	return typeof value === "string" && value.length > 0;
}

function validateForm(formData: someObject): boolean {
	let result = true;

	for (const key in formData) {
		result = result && validate(key, formData[key])
	}
	return result;
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
	email: validateEmail,
	phone: validatePhone,
	message: validateMessage,
	form: validateForm,

	default: validateName,
}
