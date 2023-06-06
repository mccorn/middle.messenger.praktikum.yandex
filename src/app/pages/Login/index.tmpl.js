const template = `
<div class="page" >
	<div class="wrapper wrapper_theme_default wrapper_crop_bottom shadowed" >
		<main class="box" >
			<h1 class="text_center" >Login Page</h1>

			<form>
				<div class="column withGap" >
					{{>inputTextWithLabel label="Login" placeholder="login" name="login" className="" }}
					{{>inputTextWithLabel label="Password" placeholder="password" name="password" className="" }}

					<div class="column column_align_center">
						{{>button label="Sign in"}}
						<div>
							<a href="/register">Нет профиля?</a>
						</div>
					</div>
				</div>
			</form>
		</main>
	</div>
</div>
`

export default template;