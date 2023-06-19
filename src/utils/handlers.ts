import { someObject } from "../const/types";
import IBlock from "./BlockInterface";
import { validate } from "./validator";

export const HANDLERS = {
	handleFocusOut: (event: Event, self: someObject, errorBlock: someObject) => {
		if (!self) return;

		const target = event.target as HTMLInputElement;
		const validateResult = validate(target.name, target.value);

		if (target) self.state[target.name] = target.value;

		if (errorBlock && !validateResult.success) {
			errorBlock.setProps({message: validateResult.message});
		}

		console.log("handleFocusOut: " + target.name, validateResult);
	},
	handleSubmit: (event: Event, self: someObject) => {
		if (!self) return;

		event.preventDefault();

		console.log(self.state, validate("form", self.state));
	},
	handleInputWithError: (block: IBlock) => {
		if (block.props.message) {
			block.setProps({message: ""})
		}
	}
}
