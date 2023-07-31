import { assert, expect } from "chai";
import Component from ".";
import {SinonSpy, createSandbox, spy} from "sinon";
import { connect } from "..";
import Store from "../Store";
import { Indexed } from "../../const/types";

describe("Component tests", () => {
	let instance: Component;
	let spyMethod: SinonSpy;

	const sandbox = createSandbox();

	// constructor
	// compile
	// init
	// componentDidMount
	// dispatchComponentDidMount
	// componentDidUpdate
	// setProps
	// setState
	// element
	// render
	// getContent
	// emit

	beforeEach(() => {
		// class TestComponent extends Component {}
		// instance = new Component('span', {});

		// instance = connect(TestComponent, () => ({}))
		const mapStateToProps = (state: Indexed) => ({
			userId: state.userId,
		})

		const TestComponentWithStore = connect(Component, mapStateToProps)

		instance = new TestComponentWithStore('span', {});
		// console.log(instanceWithStore)
	})

	afterEach(() => {
		sandbox.restore();
	})

	it("Метод setProps корректно устанавливает значение в свойство", () => {
		const userId = 123;
		instance.setProps({ userId });

		assert.equal(instance.props.userId, userId)
	});

	it("Метод setState корректно устанавливает значение state в props", () => {
		const userId = 123;
		instance.setState({ userId });

		assert.equal(instance.props.state.userId, userId)
	});
	
	it("Метод render возвращает объект типа DocumentFragment", () => {
		const result = instance.render();

		expect(result as any instanceof DocumentFragment).equal(true)
	});

	it("Метод setProps вызывает componentDidUpdate", () => {
		spyMethod = spy(instance, "componentDidUpdate");
    instance.setProps({userId: 123});

    assert(spyMethod.called);
	});

	it("Метод setProps вызывает componentDidUpdate единажды", () => {
		spyMethod = spy(instance, "componentDidUpdate");
    instance.setProps({userId: 123});

    assert(spyMethod.calledOnce);
	});

	it("Метод setState вызывает componentDidUpdate", () => {
		spyMethod = spy(instance, "componentDidUpdate");
    instance.setState({userId: 123});

    assert(spyMethod.called);
	});

	it("Метод Store.set вызывает componentDidUpdate", () => {
		spyMethod = spy(instance, "componentDidUpdate");
    Store.set('userId', 123);

    assert(spyMethod.called);
	});

	it.skip("Метод Store.set не вызывает componentDidUpdate (нет подписки)", () => {
		spyMethod = spy(instance, "componentDidUpdate");
    Store.set('otherId', 123);

    assert(spyMethod.notCalled);
	});
});

