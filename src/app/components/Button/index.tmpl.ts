const template = (props): string => `
	<button class="${`button shadowed ${props.className}`}" onclick=${props.onClick}>${props.label}</button>
`

export default template;
