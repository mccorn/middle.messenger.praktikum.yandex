const template = `
<div class="page">
	<div class="HomePage flex">
		<aside class="col4 bg_light">
			{{#each chats}}
				{{>chatInfo data=this}}
			{{/each}}
		</aside>
		<main class="col8 column">
			<div class="stretch bg_default HomePage__body">
				{{#each messages}}
					{{#if this.me}}
						{{>message data=this className="me" }}
					{{else}}
						{{>message data=this }}
					{{/if}}
					
				{{/each}}
			</div>
			<div>
				{{>inputArea value="" placeholder="Type message..." name="message" className="active" }}
			</div>
		</main>
	</div>
</div>
`

export default template;
