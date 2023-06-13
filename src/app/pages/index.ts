import Login from "./LoginPage";

const PAGES = {
	"login": Login,
}

export function getPage(pageName, props) {
	const pageConstructor  = new PAGES[pageName];
	return pageConstructor ? pageConstructor.render(props) : null
}
