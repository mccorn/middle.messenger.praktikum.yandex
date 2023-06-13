import Button from "../../components/Button";
import InputWithLabel from "../../components/InputWithLabel";

const template = ({data}) => `
<div class='page'>
  <div class="wrapper wrapper_theme_default wrapper_crop_bottom shadowed" >
    <main class="box" >
        <h1 class="text_center">Register form</h1>
				<form>
					<div class="column withGap" >	
						${(new InputWithLabel({value: data.login, placeholder: "login", label: "login"})).render()}
						${(new InputWithLabel({value: data.password, placeholder: "password", label: "password"})).render()}
						${(new InputWithLabel({value: data.first_name, placeholder: "first_name", label: "first_name"})).render()}
						${(new InputWithLabel({value: data.second_name, placeholder: "second_name", label: "second_name"})).render()}
						${(new InputWithLabel({value: data.email, placeholder: "email", label: "email"})).render()}
						${(new InputWithLabel({value: data.phone, placeholder: "phone", label: "phone"})).render()}

						<div class="column column_align_center">
							<div class="line">
								${(new Button({label: "Register"})).render()}
							</div>
						</div>
					</div>
				</form>
    </main>
  </div>
</div>
`

export default template;
