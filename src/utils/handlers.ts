import { someObject } from "../const/types";
import { validate } from "./validator";

export const HANDLERS = {
	handleFocusOut: (event: Event, self: someObject) => {
		if (!self) return;

		const target = event.target as HTMLInputElement;

		if (target) self.state[target.name] = target.value;

		console.log("handleFocusOut: " + target.name, "validate success = " + validate(target.name, target.value));
	},
	handleSubmit: (event: Event, self: someObject) => {
		if (!self) return;

		event.preventDefault();

		console.log(self.state, "validate success = " + validate("form", self.state));
	}
}
