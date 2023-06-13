import Login from "../../pages/Login";

const ___template = (props = {}) => `
<div class="page" >
	app: ${props.text} : {{{props.test}}}

	{{>button }}
</div>
`

const _template = (props = {}) => `
	${props.component}
	${props.pathname}
`

const __template = `
	app {{props.text}}  {{>button}}
`

const template = (props = {}) => `
	${!!props.login && (new Login({data: props.login})).render()}
`

export default template;
