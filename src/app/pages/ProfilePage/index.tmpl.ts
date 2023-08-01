const template = `
<div class='page profilePage'>
	<div class="wrapper wrapper_theme_default shadowed" >
		<main class="box" >
			<form>
				
				<div class="row article">
					
					<div class="col8">
						<h2>Profile Page</h2>
						<h5>{{userData.display_name}}</h5>
					</div>
					<div class="col4">
						<div class="avatar {{#not userData.avatar}}empty{{/not}}">
							{{#if userData.avatar}} 
								<img src="https://ya-praktikum.tech/api/v2/resources{{userData.avatar}}">
							{{/if}}
							{{{ inputAvatar }}}
						</div>
						
					
					</div>
				</div>

				<div class="column withGap article" >
					{{{ inputLogin }}}
					{{{ inputDisplayName }}}
					{{{ inputFirstName }}}
					{{{ inputSecondName }}}
					{{{ inputEmail }}}
					{{{ inputPhone }}}
				</div>

				<div class="column column_align_center section">
					<div class="line">
						{{{ button }}}
					</div>
					<a class="link" href="/messenger"><< К чатам </a>
				</div>
				
				<div class="column withGap article" >
					<h2>Password</h2>

					{{{ inputNewPassword }}}
					{{{ inputOldPassword }}}
				</div>

				<div class="column column_align_center">
					{{{ buttonChangePassword }}}
				</div>
			</form>
		</main>
	</div>
</div>
`

export default template;
