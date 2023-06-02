const _template = `Hello app {{username}} {{> button label="Click me!" }}`
const template = `
    <div class='page'>
        HomePage, username: {{username}}
    </div>
`

export default template;