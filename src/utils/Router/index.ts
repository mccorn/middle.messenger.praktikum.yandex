import { someObject } from "../../const/types";
import Block from "../Block";
import Route from "./Route";

class Router {
	static __instance: Router;
	private _rootQuery: unknown;

	routes: Route[] = [];
	history: History | undefined;
	private _currentRoute: null | Route = null;

	constructor() {
		if (Router.__instance) {
			return Router.__instance;
		}

		this.history = window.history;
		Router.__instance = this;
	}

	use(pathname: string, block: typeof Block) {
		const route = new Route(pathname, block, { rootQuery: this._rootQuery });
		this.routes.push(route);
		
		return this;
	}

	start() {
		// Реагируем на изменения в адресной строке и вызываем перерисовку
		window.onpopstate = (event: someObject) => {
			this._onRoute(event.currentTarget.location.pathname);
		};

		this._onRoute(window.location.pathname);
	}

	_onRoute(pathname: string) {
		const route = this.getRoute(pathname);
		if (!route) {
			this.go('/')
			return;
		}

		if (this._currentRoute) {
			this._currentRoute.leave();
		}

		// route.render(route, pathname);
		route.render();
	}

	go(pathname: string) {
		if (this.history) {
			this.history.pushState({}, "", pathname);
			this._onRoute(pathname);
		}
	}

	getRoute(pathname: string) {
		return this.routes.find(route => route.match(pathname));
	}
}

export default Router;
