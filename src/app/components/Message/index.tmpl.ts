const template = `<div class="messageWrapper">
{{#with data}}
	<div class="message {{classNames}}" >
		<div class="message__body">
			{{user_id}}: {{content}}
		</div>
		
		<div class="message__info">
			{{#formattedTime time}}
			{{/formattedTime}}

			<div class="message__is-read">
				{{#if is_read}}
					VV
				{{/if}}
			</div>
		</div>
		
	</div>
{{/with}}
</div>`

export default template;
