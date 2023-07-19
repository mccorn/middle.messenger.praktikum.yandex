const template = `<div class="messageWrapper">
{{#with data}}
	<div class="message {{../classNames}}" >
		<div class="message__body">
			{{text}}
		</div>
		
		<div class="message__info">
			{{date}}
			{{#if isEdited}}
				VV
			{{/if}}
		</div>
		
	</div>
{{/with}}
</div>`

export default template;
