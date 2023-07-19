const template = `
{{#each chats}}
	{{>chatInfo data=this }}
{{/each}}
`

export default template;
