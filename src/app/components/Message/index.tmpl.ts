const template = `<div class="messageWrapper">
{{#with data}}
	<div class="message {{../classNames}}" >
		<div class="message__body">
			{{content}}
		</div>
		
		<div class="message__info">
			{{#formattedTime time}}
			{{/formattedTime}}

			{{#if isEdited}}
				VV
			{{/if}}
		</div>
		
	</div>
{{/with}}
</div>`

export default template;
