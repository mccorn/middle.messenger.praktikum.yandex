const template = `
{{#if chats.length}}

	
	{{#each chats}}
		{{>chatInfo data=this cur-idx=@index data-idx=../currentChatIdx  }}
	{{/each}}
{{else}}
	<div class="text_center">
		No chats
	<div>
{{/if}}
`

export default template;
