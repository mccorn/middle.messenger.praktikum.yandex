const __template = (props): string => `
	<button class="${`button shadowed ${props.className}`}" onclick=${props.onClick}>${props.label}</button>
`

const template = `
	<button class="button shadowed {{className}}" >{{label}}</button>
`

export default template;
