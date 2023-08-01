const template = `
<div class="page" >
	<div class="wrapper wrapper_theme_default wrapper_crop_bottom shadowed" >
		<main class="box" >
			<h1 class="text_center" >Login Page</h1>

			<form>
				<div class="column withGap" >
				
					{{{ inputLogin }}}
					{{{ inputLoginError }}}

					{{{ inputPassword }}}
					{{{ inputPasswordError }}}
					
					<div class="column column_align_center">
						<div class="line">
							{{{ button }}}
						</div>
						
						<div>
							<a href="/sign-up">Нет профиля?</a>
						</div>
					</div>
				</div>
			</form>
		</main>
	</div>
</div>
`

export default template;
