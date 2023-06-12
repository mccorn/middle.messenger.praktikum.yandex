import "./style.less";

export default `<div class="messageWrapper">
	{{#with data}}
		<div class="message {{../className}}" >
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
