import { someObject } from "../const/types";
import IBlock from "./Component/ComponentInterface";
import { validate } from "./validator";

export const HANDLERS = {
	handleFocusOut: (event: Event, self: IBlock, errorBlock?: IBlock) => {
		if (!self) return;

		const target = event.target as HTMLInputElement;
		const validateResult = validate(target.name, target.value);

		if (target) self.state[target.name] = target.value;

		if (errorBlock) {
			errorBlock.setProps({ value: target.value, error: validateResult.message });
		}

		console.log("handleFocusOut: " + target.name, validateResult);
	},
	handleSubmit: (event: Event, self: someObject) => {
		if (!self) return;

		event.preventDefault();

		console.log(self.state, validate("form", self.state));
	},
	handleInputWithError: () => {
		// return (block: IBlock) => {
		// if (block.props.error) {
		// 	block.setProps({ ...block.props, error: "" })
		// }
		// }
	}
}
