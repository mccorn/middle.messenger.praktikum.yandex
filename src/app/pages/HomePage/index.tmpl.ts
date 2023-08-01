const template = `
<div class="page">
	<div class="HomePage flex">
		<aside class="col4 column bg_light">
			<div class="stretch">
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
			</div>

			<div>
				{{{ profileInfo }}}
			</div>
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

export default template;
