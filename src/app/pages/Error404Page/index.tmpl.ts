import Button from "../../components/Button";

const template = `
<div class='page'>
  <main class="error404">
    <div class="buttonContainer">
      <a href="/home">
				<div class="column column_align_center">
					${(new Button({ label: "To home" })).render()}
				</div>
      </a>
    </div>
  </main>
</div>
`

export default template;
