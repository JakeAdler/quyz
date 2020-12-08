import Configurer from "./configurer";
import Collector from "./collector";
import Runner from "./runner";
import Dev, { devLogStore } from "./dev";
import { formatTitle } from "./utils";
import { AnyVoidCB, Configuration, Title, TestCB, AnyCB } from "./types";

class Quyz {
	private runner: Runner;
	private configurer: Configurer;
	public collector: Collector;
	public dev: Dev;

	constructor(configuration?: Partial<Configuration>) {
		this.configurer = new Configurer(configuration);
		this.runner = new Runner(this.configurer);
		this.collector = new Collector(this.runner, this.configurer);
		if (this.configurer.config.dev) {
			this.dev = new Dev(this.runner, this.collector);
		}
	}

	public beforeEach = (cb: AnyVoidCB) => {
		this.runner.pushHookAction("beforeEach", cb);
	};

	public afterEach = (cb: AnyVoidCB) => {
		this.runner.pushHookAction("afterEach", cb);
	};

	public beforeAll = (cb: AnyVoidCB) => {
		this.runner.pushHookAction("beforeAll", cb);
	};

	public afterAll = (cb: AnyVoidCB) => {
		this.runner.pushHookAction("afterAll", cb);
	};

	public doOnce = (cb: AnyCB) => {
		this.runner.pushAction({
			type: "doOnce",
			cb,
		});
	};

	public it = <T extends any[]>(
		title: Title<T>,
		cb: TestCB<T>,
		...args: T
	): void => {
		this.runner.pushAction({
			type: "it",
			title: formatTitle(title, ...args),
			cb,
			args,
		});
	};

	public describe = <T extends any[]>(
		title: Title<T>,
		cb: (...args: T) => void,
		...args: T
	): void => {
		this.runner.pushAction({
			type: "describe-start",
			title: formatTitle(title, ...args),
			hooks: [],
		});

		cb(...args);

		this.runner.pushAction({
			type: "describe-end",
		});
	};
}

const quyz = new Quyz();

const {
	it,
	describe,
	beforeAll,
	beforeEach,
	afterAll,
	afterEach,
	doOnce,
	collector,
} = quyz;

export {
	it,
	describe,
	beforeAll,
	beforeEach,
	afterAll,
	afterEach,
	doOnce,
	collector,
	Quyz,
};