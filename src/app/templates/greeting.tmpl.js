const template = `Hello app {{username}} {{> button label="Click me!" }}`
const _template = `
<ul>
    <li>
        <a href="/login">Auth Page</a>
    </li>
    <li>
        <a href="/register">Register Page</a>
    </li>
    <li>
        <a href="/profile">Profile Page</a>
    </li>
    <li>
        <a href="./home">Home Page</a>
    </li>
    <li>
        <a href="/error404">error404 Page</a>
    </li>
    <li>
        <a href="/error500">error500 Page</a>
    </li>
</ul>
`

export default _template