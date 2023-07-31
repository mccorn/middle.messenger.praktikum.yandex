import { expect } from "chai";
import Router from ".";
import Route from "./Route";
import Component from "../Component";

describe("Router tests", () => {
	let instance: Router;
	const defaultPath = '/';

	beforeEach(() => {
		instance = new Router();
		instance.use(defaultPath, Component);
	})

	it("getRoute correct", () => {
		const result = instance.getRoute(defaultPath);

		expect(result instanceof Route).to.be.equal(true)
  });

	it("getRoute incorrect", () => {
		const result = instance.getRoute('/defaultPath');

		expect(result).to.be.equal(undefined)
  });

	it('Переход на новую страницу должен менять состояние сущности history', () => {
    window.history.pushState({page: 'login'}, 'Login', '/login');
    window.history.pushState({page: 'register'}, 'Register', '/register');

    expect(window.history.length).to.eq(3);
  });

	it('Метод go должен менять состояние сущности history', () => {
    instance.go(defaultPath);

    expect(window.history.length).to.eq(14);
  });
});
