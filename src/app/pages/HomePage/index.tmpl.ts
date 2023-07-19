const template = `
<div class="page">
	<div class="HomePage flex">
		<aside class="col4 bg_light">
			{{{ logout }}}
			<br/>
			{{{ getChatsButton }}}
			<br/>
			{{{createChatButton}}}
			<br/>
			{{{getUsersButton}}}
			<br/>
			{{{addUsersButton}}}
			<br/>
			{{{deleteUsersButton}}}
			<br/>

			{{{ chatsList }}}
		</aside>
		<main class="col8 column">
			<div id="messages" class="stretch bg_default HomePage__body">
				{{{ messagesList }}}
			</div>
			<form class="flex">
				<div class="stretch">
					{{{ input }}}
				</div>
				<div>
					{{{ button }}}
					
				</div>
			</form>
		</main>
	</div>
</div>
`
// {{>message data=this}}
// 	<div data-id={{@key}}> {{this.text}} </div>

// {{>inputArea value="" placeholder="Type message..." name="message" className="active" }}

export default template;
