const template = `
<div class='page'>
	<div class="wrapper wrapper_theme_default shadowed" >
		<main class="box" >
			<form>
				<div class="row article">
					<div class="col8">
						<h2>Profile Page</h2>
						<h5>{{userData.display_name}}</h5>
					</div>
					<div class="col4">
						{{{ inputAvatar }}}
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
					{{{ button }}}
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
