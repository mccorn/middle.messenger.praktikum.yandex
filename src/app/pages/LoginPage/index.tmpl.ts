import Button from "../../components/Button";
import InputWithLabel from "../../components/InputWithLabel";

const __template = ({data = {password: String, login: String}}) => `
<div class="page" >
	<div class="wrapper wrapper_theme_default wrapper_crop_bottom shadowed" >
		<main class="box" >
			<h1 class="text_center" >Login Page</h1>

			<form>
				<div class="column withGap" >	
					${(new InputWithLabel({value: data.login, placeholder: "login", label: "login"})).render()}
					${(new InputWithLabel({value: data.password, placeholder: "password", label: "password"})).render()}

					<div class="column column_align_center">
						<div class="line">
							${(new Button({label: "Sign in"})).render()}
						</div>
						
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
// onsubmit="return false;"
const template = `
<div class="page" >
	<div class="wrapper wrapper_theme_default wrapper_crop_bottom shadowed" >
		<main class="box" >
			<h1 class="text_center" >Login Page</h1>

			<form>
				<div class="column withGap" >
				
					{{{ inputLogin }}}
					{{{ inputPassword }}}

					<div class="column column_align_center">
						<div class="line">
							{{{ button }}}
						</div>
						
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

// {{>inputTextWithLabel value=login label="Login" placeholder="login" name="login" className="" }}
// {{>inputTextWithLabel value=password label="Password" placeholder="password" name="password" className="" }}

export default template;
