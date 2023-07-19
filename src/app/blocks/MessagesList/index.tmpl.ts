const template = `
{{#each data.messages}}
	{{>message data=this }}
{{/each}}
`

export default template;
