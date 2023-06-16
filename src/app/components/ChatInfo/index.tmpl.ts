import "./styles.less";

export default `
<div class="chatInfo flex" data-id="{{data.id}}">
	{{#with data}}
		<div class="chatInfo__avatar">
			<img src={{avatarUrl}} />
		</div>
		<div class="chatInfo__main stretch">
			<div class="chatInfo__title">
				{{name}}
			</div>
			<div class="chatInfo__body">
				{{lastMessage.text}}
			</div>
		</div>
		<div class="chatInfo__aside">
			<div class="chatInfo__date">
				{{lastMessage.date}}
			</div>
			<div class="chatInfo__tip">
				{{noreadMessagesCounter}}
			</div>
		</div>
	{{/with}}
</div>
`
