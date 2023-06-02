import Handlebars, {compile} from "handlebars"
import buttonTmpl from "./partials/button.tmpl";
import greetingTmpl from "./templates/greeting.tmpl";

Handlebars.registerPartial('button', buttonTmpl)

// function App() {
//     const data = {title: 'a1a'};
//     const template = compile(document.querySelector("#template-app").innerHTML);
//     // const template = compile(`{{>button label="Click"}}`);

//     document.querySelector("#app").innerHTML = template(data);
// }

// App();

const renderApp = () => {
    const data = {
        username: 'Andrew',
    };
    const root = document.querySelector("#app");
    // const template = compile(document.querySelector("#template-app").innerHTML);
    const template = compile(greetingTmpl);
    const result = template(data);

    root.innerHTML = result;
}

document.addEventListener('DOMContentLoaded', renderApp)