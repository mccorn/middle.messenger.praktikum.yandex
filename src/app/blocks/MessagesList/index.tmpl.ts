const template = `
<div class="messages__title">
	<span>
		{{currentChatData.title}}
	</span>
</div>
{{#each data.messages}}
	{{>message data=this }}
{{/each}}
`

export default template;
