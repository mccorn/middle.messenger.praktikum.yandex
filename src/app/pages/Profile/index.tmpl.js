const template = `
<div class='page'>
	<div class="wrapper wrapper_theme_default shadowed" >
		<div class="box" >
			<div class="row article">
				<div class="col8">
					<h2>Profile Page</h2>
					<h5>Display Name</h5>
				</div>
				<div class="col4">
					{Avatar edit}
				</div>
			</div>

			<div class="column withGap article" >

				{{>inputTextWithLabel label="Login" value="1" placeholder="login"}}
				{{>inputTextWithLabel label="Password" placeholder="password"}}
				{{>inputTextWithLabel label="Password" placeholder="password"}}
				{{>inputTextWithLabel label="Password" placeholder="password"}}
				{{>inputTextWithLabel label="Password" placeholder="password"}}
				{{>inputTextWithLabel label="Password" placeholder="password"}}

			</div>

			
			<div class="column withGap article" >
				<h2>Password</h2>

				{{>inputTextWithLabel label="Password" placeholder="password"}}
				{{>inputTextWithLabel label="Password" placeholder="password"}}

				
			</div>

			<div class="column">
				{{>button label="Sign in"}}
			</div>
		</div>
	</div>
</div>
`

export default template;