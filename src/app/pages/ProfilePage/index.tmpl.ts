import Button from "../../components/Button";
import InputWithLabel from "../../components/InputWithLabel";

type ProfilePropsData = {
	data: {
		display_name: string,
		avatar: string,
		login: string,
		first_name: string,
		second_name: string,
		email: string,
		phone: string,
	}
}

const template = `
<div class='page'>
	<div class="wrapper wrapper_theme_default shadowed" >
		<main class="box" >
			<form>
				<div class="row article">
					<div class="col8">
						<h2>Profile Page</h2>
						<h5>{data.display_name}</h5>
					</div>
					<div class="col4">
					
					</div>
				</div>

				<div class="column withGap article" >
			
				</div>

				<div class="column withGap article" >
					<h2>Password</h2>

			
				</div>

				<div class="column column_align_center">
				
				</div>
			</form>
		</main>
	</div>
</div>
`

const __template = (props: ProfilePropsData): string => {
	const {data} = props;
	return (
		`
		<div class='page'>
			<div class="wrapper wrapper_theme_default shadowed" >
				<main class="box" >
					<form>
						<div class="row article">
							<div class="col8">
								<h2>Profile Page</h2>
								<h5>${data.display_name}</h5>
							</div>
							<div class="col4">
								${(new InputWithLabel({ value: data.avatar, placeholder: "avatar", label: "avatar" })).render()}
							</div>
						</div>

						<div class="column withGap article" >
							${(new InputWithLabel({ value: data.login, placeholder: "login", label: "login" })).render()}
							${(new InputWithLabel({ value: data.display_name, placeholder: "display_name", label: "display_name" })).render()}
							${(new InputWithLabel({ value: data.first_name, placeholder: "first_name", label: "first_name" })).render()}
							${(new InputWithLabel({ value: data.second_name, placeholder: "second_name", label: "second_name" })).render()}
							${(new InputWithLabel({ value: data.email, placeholder: "email", label: "email" })).render()}
							${(new InputWithLabel({ value: data.phone, placeholder: "phone", label: "phone" })).render()}
						</div>

						<div class="column withGap article" >
							<h2>Password</h2>

							${(new InputWithLabel({ value: "", placeholder: "newPassword", label: "newPassword" })).render()}
							${(new InputWithLabel({ value: "", placeholder: "oldPassword", label: "oldPassword" })).render()}
						</div>

						<div class="column column_align_center">
							${(new Button({ label: "Save" })).render()}
						</div>
					</form>
				</main>
			</div>
		</div>
		`
	)
}

export default template;
