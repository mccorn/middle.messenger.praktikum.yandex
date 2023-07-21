import AuthAPI from "../../app/api/AuthorizationAPI";
import { Response, someObject } from "../../const/types";
import Block from "../Block";
import Route from "./Route";

class Router {
	static __instance: Router;
	private _rootQuery: unknown;
	private _requiredAuth!: someObject;

	routes: Route[] = [];
	history: History | undefined;
	private _currentRoute: null | Route = null;

	constructor() {
		if (Router.__instance) {
			return Router.__instance;
		}

		this.history = window.history;
		Router.__instance = this;
		this._requiredAuth = {};
	}

	use(pathname: string, block: typeof Block, needAuth?: boolean) {
		const route = new Route(pathname, block, { rootQuery: this._rootQuery });
		this.routes.push(route);
		this._requiredAuth[pathname] = !!needAuth;

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
		// const hasAuth = this.hasAuth();
		const authPromise = this.hasAuth();

		authPromise.then((response: Response | unknown) => {
			const route = this.getRoute(pathname);
			if (!route) {
				this.go('/error404');
				return;
			}

			if (this._requiredAuth[pathname] && (response as Response)?.status !== 200) {
				this.go('/');
				return;
			}
	
			if (this._currentRoute) {
				this._currentRoute.leave();
			}
	
			this._currentRoute = route;
			route.render();
		}).catch(console.warn)
	}

	go(pathname: string) {
		if (this.history) {

			this.history.pushState({ pathname }, '', pathname);
			this._onRoute(pathname);
		}
	}

	getRoute(pathname: string) {
		return this.routes.find(route => route.match(pathname));
	}

	hasAuth() {
		return AuthAPI.getAuthUser();
	}
}

export default Router;
