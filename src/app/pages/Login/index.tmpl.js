const template = `
<div class="page" >
	<div class="wrapper wrapper_theme_default wrapper_crop_bottom shadowed" >
		<div class="box" >
			<h1 class="text_center" >Login Page</h1>

			<form>
				<div class="column withGap" >
					{{>inputTextWithLabel label="Login" placeholder="login" className="" }}
					{{>inputTextWithLabel label="Password" placeholder="password" className="" }}

					<div class="column column_align_center">
						{{>button label="Sign in"}}
						<div>
							<a href="/register">Нет профиля?</a>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
`

export default template;