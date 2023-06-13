import Input from "../Input";
import { SampleInputWithLabel } from "../types";

const template = (props: SampleInputWithLabel): string => `
	<div class='inputWrapper'>
		<label>
		<div class="label">${props.label}</div>
		${(new Input({value: props.value, placeholder: props.placeholder, onBlur: props.onBlur})).render()}
		</label>
	</div>
`

export default template;
