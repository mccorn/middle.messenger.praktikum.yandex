const template = `
<div class='page'>
  <div class="wrapper wrapper_theme_default wrapper_crop_bottom shadowed" >
    <div class="box" >
        <h1 class="text_center">Register form</h1>

        <form>
          <div class="column withGap" >
            {{>inputTextWithLabel label="Login" value="" name="login" placeholder="login"}}
            {{>inputTextWithLabel label="Password" value="" name="password" placeholder="password"}}
            {{>inputTextWithLabel label="First_name" value="" name="first_name" placeholder="first_name"}}
            {{>inputTextWithLabel label="Second_name" value="" name="second_name" placeholder="second_name"}}
            {{>inputTextWithLabel label="Email" value="" name="email" placeholder="email"}}
            {{>inputTextWithLabel label="Phone" value="" name="phone" placeholder="phone"}}

            <div class="column column_align_center">
              {{>button label="Register"}}
            </div>
          </div>
        </form>
    </div>
  </div>
</div>
`

export default template;