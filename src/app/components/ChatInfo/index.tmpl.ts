import "./styles.less";

export default `
<div class="chatInfo flex" data-id="{{data.id}}">
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
				{{title}}
			</div>
			<div class="chatInfo__body">
				{{last_message}}
			</div>
		</div>
		<div class="chatInfo__aside">
			<div class="chatInfo__date">
				{{lastMessage.date}}
			</div>
			<div class="chatInfo__tip">
				{{unread_count}}
			</div>
		</div>
	{{/with}}
</div>
`
