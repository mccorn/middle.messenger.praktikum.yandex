import "./styles.less";

export default `

	<div class="profileInfo flex">
		{{#with data}}
			<div class="profileInfo__avatar {{#not ../avatarUrl}}empty{{/not}}">
				{{#if ../avatarUrl}}
					<img src={{../avatarUrl}} />
				{{/if}}
			</div>
			
			<div class="profileInfo__main stretch">
				<div class="profileInfo__title">
					{{#if display_name}} 
						<b>{{first_name}}</b>
					{{else}}
						<b>{{first_name}} {{second_name}}</b>
					{{/if}}
				</div>
				<div class="profileInfo__body">
					{{login}}
				</div>
			</div>

		

			<div class="profileInfo__aside">
				<a href="/settings">
					<span class="profileInfo__link link">
						К профилю >>
					</span>
				</a>

				{{{ ../logoutIcon }}}
			</div>
		{{/with}}

		
	</div>

`
