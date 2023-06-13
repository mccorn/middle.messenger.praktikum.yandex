import { SampleInput } from "../types";

const template = (props: SampleInput): string => `
	<input value=${props.value} placeholder=${props.placeholder} blur=${props.onBlur}/>
`

export default template;
