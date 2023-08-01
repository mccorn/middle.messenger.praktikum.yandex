import "./styles.less";

export default `
<div class="chatInfo flex{{#if_eq data-idx cur-idx}} active{{/if_eq}}" data-id="{{data.id}}">
	{{#with data}}
		<div class="chatInfo__avatar">
			{{#if avatar}}
				<img src={{avatar}} />
				
			{{else}}
				<span>{{cutTitle}}</span>
			{{/if}}
		</div>
		
		<div class="chatInfo__main stretch">
			<div class="chatInfo__title">
				<b>{{title}}</b>
			</div>
			<div class="chatInfo__body">
				{{last_message.content}}
			</div>
		</div>

		<div class="chatInfo__aside">
			<div class="chatInfo__date">
				{{#formattedTime last_message.time }}
				{{/formattedTime}}
			</div>
			<div class="chatInfo__tip">
				{{#if unread_count}} 
					{{unread_count}}
				{{/if}}
			</div>
		</div>
	{{/with}}
</div>
`
