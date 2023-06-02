import {compile} from "handlebars"

function App() {
    const data = {title: 'a1a'};
    const template = compile(document.querySelector("#template-app").innerHTML);

    document.querySelector("#app").innerHTML = template(data);
}

App();