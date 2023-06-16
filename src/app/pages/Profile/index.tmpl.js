const template = `
<div class='page'>
	<div class="wrapper wrapper_theme_default shadowed" >
		<main class="box" >
			<div class="row article">
				<div class="col8">
					<h2>Profile Page</h2>
					<h5>Display Name</h5>
				</div>
				<div class="col4">
					{{>inputTextWithLabel label="Password" value="" name="login" placeholder="password"}}
				</div>
			</div>

			<div class="column withGap article" >

				{{>inputTextWithLabel label="Login" value="" name="login" placeholder="login"}}
				{{>inputTextWithLabel label="Display_name" value="" name="display_name" placeholder="display_name"}}
				{{>inputTextWithLabel label="First_name" value="" name="first_name" placeholder="first_name"}}
				{{>inputTextWithLabel label="Second_name" value="" name="second_name" placeholder="second_name"}}
				{{>inputTextWithLabel label="Email" value="" name="email" placeholder="email"}}
				{{>inputTextWithLabel label="Phone" value="" name="phone" placeholder="phone"}}

			</div>

			
			<div class="column withGap article" >
				<h2>Password</h2>

				{{>inputTextWithLabel label="Old Password" value="" name="oldPassword" placeholder="oldPassword"}}
				{{>inputTextWithLabel label="New Password" value="" name="newPassword" placeholder="newPassword"}}

				
			</div>

			<div class="column">
				{{>button label="Sign in"}}
			</div>
		</main>
	</div>
</div>
`

export default template;
