import { validate } from "./validator";

const PHONES_TESTS = [
	[
		"89009008000",
		true,
		"comment: normal"
	],
	[
		"012345678901234",
		true,
		"comment: normal, length == 15"
	],
	[
		"0123456789",
		true,
		"comment: normal, length == 10"
	],


	[null, false, "comment: === null"],
	["", false, "comment: === \'\'"],
	["string", false, "comment: === \'string\'"],
	["012345678", false, "comment: short, length === 9"],
	["0123456789012345", false, "comment: long, length === 16"],
]
const LOGINS_TESTS = [
	[
		"Андрей",
		true,
		"comment: normal"
	],
	[
		"andrew",
		true,
		"comment: normal"
	],
	[
		"abc",
		true,
		"comment: normal, length == 3"
	],
	[
		"a1234567890123456789",
		true,
		"comment: normal, length == 20"
	],
	[
		"-___-",
		true,
		"comment: == \"-___-\""
	],


	[null, false, "comment: === null"],
	["", false, "comment: === \'\'"],
	["ab", false, "comment: short, length === 2"],
	[
		"01234567890123456789",
		false,
		"comment: only numbers"
	],
	["01234567890123456789a", false, "comment: long, length === 21"],
]
const NAMES_TESTS = [
	[
		"Андрей",
		true,
		"comment: normal"
	],
	[
		"Andrew",
		true,
		"comment: normal"
	],
	[
		"And-rew",
		true,
		"comment: normal"
	],

	[
		"-___-",
		false,
		"comment: == \"-___-\""
	],
	[null, false, "comment: === null"],
	["", false, "comment: === \'\'"],
	["a", false, "comment: short, length === 2"],
	[
		"01234567890123456789",
		false,
		"comment: only numbers"
	],
	["01234567890123456789a", false, "comment: long, length === 21"],
	[
		"andrew",
		false,
		"comment: start with small letter"
	],
	[
		"ab",
		false,
		"comment: start with small letter"
	],
	[
		"a1234567890123456789",
		false,
		"comment:  start with small letter + numbers"
	],
]
const PASSWORDS_TESTS = [
	[
		"Андрей13",
		true,
		"comment: normal"
	],
	[
		"Andrew12",
		true,
		"comment: normal"
	],

	[
		"Андрей",
		false,
		"comment: not number"
	],
	[
		"Andrew",
		false,
		"comment: not number"
	],
	[
		"And-rew",
		false,
		"comment: normal"
	],
	[
		"-___-",
		false,
		"comment: == \"-___-\""
	],
	[null, false, "comment: === null"],
	["", false, "comment: === \'\'"],
	["a", false, "comment: short, length === 2"],
	[
		"01234567890123456789",
		false,
		"comment: only numbers"
	],
	["01234567890123456789a", false, "comment: long, length === 21"],
	[
		"andrew",
		false,
		"comment: start with small letter"
	],
	[
		"ab",
		false,
		"comment: start with small letter"
	],
	[
		"a1234567890123456789",
		false,
		"comment:  start with small letter + numbers"
	],
]


function test(arr = PHONES_TESTS, type: string) {
	for (const test of arr) {
	
		const testValue = test[0];
		const testResult = test[1] === validate(type, testValue);
		const testComment = test[2];

		if (testResult) {
			console.log(testValue + '', testResult, testComment )
		} else {
			console.warn(testValue, testResult, testComment  )
		}
	}
}

export function testPhones() {
	test(PHONES_TESTS, "phone")
}

export function testLogins() {
	test(LOGINS_TESTS, "login")
}

export function testNames() {
	test(NAMES_TESTS, "name")
}

export function testPasswords() {
	test(PASSWORDS_TESTS, "password")
}
