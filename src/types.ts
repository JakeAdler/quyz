import Runner from "./runner";

type AnyVoid = Promise<void> | void;

export type AnyVoidCB = () => AnyVoid;

export type AnyCB = () => Promise<any> | any;

export type TestCB<T extends any[]> = (...macroArgs: T) => AnyVoid;

export type LogFn = (...args: any[]) => void;
export type ColorFn = (...args: any[]) => string;

export type Title<T extends any[]> = string | ((...args: Partial<T>) => string);

export interface Colors {
	underline: ColorFn;
	red: ColorFn;
	green: ColorFn;
	blue: ColorFn;
	bold: ColorFn;
	magenta: ColorFn;
	grey: ColorFn;
}

export interface DevConfiguration {
	logger?: Pick<Console, "log">;
	format?: boolean;
	symbols?: boolean;
}

export interface RunnerConfiguration {
	use: keyof Runner;
}

export interface SequencerConfiguration extends RunnerConfiguration {
	use: "sequencer";
	include: string[];
	exclude?: string[];
}

export interface MatchExtensionsConfiguration extends RunnerConfiguration {
	use: "matchExtensions";
	match: string[];
	root: string;
}

export interface EntryPointConfiguration extends RunnerConfiguration {
	use: "entryPoint";
}

export interface Configuration {
	runner?: RunnerConfiguration;
	colors?: boolean;
	bubbleHooks?: boolean;
	volume?: number;
	dev?: false | DevConfiguration;
}

export interface Action {
	type:
		| "it"
		| "describe-start"
		| "describe-end"
		| "doOnce"
		| "hook"
		| "configure";
}

export interface HookAction extends Action {
	type: "hook";
	cb: AnyVoidCB;
}

export interface ItAction<T extends any[]> extends Action {
	type: "it";
	title: string;
	cb: TestCB<T>;
	args: T;
}

export interface DescribeStartAction extends Action {
	type: "describe-start";
	title: string;
}

export interface DescribeEndAction extends Action {
	type: "describe-end";
}

export interface ConfigureAction extends Action {
	type: "configure";
	configuration: Partial<Configuration>;
}

export interface DoOnceAction extends Action {
	type: "doOnce";
	cb: AnyCB;
}

export interface Hooks {
	beforeEach: AnyVoidCB;
	afterEach: AnyVoidCB;
}

export interface Context {
	passed: number;
	failed: number;
	testRuntime: number;
	errors: any[];
}
// Errors

export class ConfigError extends Error {
	constructor(optionName: string, message: string) {
		super(`Option '${optionName}': ${message}`);
		this.name = "Config Error";
	}
}

// Guards

export const isHookAction = (action: Action): action is HookAction => {
	return action.type === "hook";
};

export const isItAction = <T extends any[]>(
	action: Action
): action is ItAction<T> => {
	return action.type === "it";
};

export const isDescribeStartAction = (
	action: Action
): action is DescribeStartAction => {
	return action.type === "describe-start";
};

export const isDescribeEndAction = (
	action: Action
): action is DescribeEndAction => {
	return action.type === "describe-end";
};

export const isConfigurationAction = (
	action: Action
): action is ConfigureAction => {
	return action.type === "configure";
};

export const isDoOnceAction = (action: Action): action is DoOnceAction => {
	return action.type === "doOnce";
};

export const isEntryPointConfig = (
	config: RunnerConfiguration
): config is EntryPointConfiguration => {
	return config.use === "entryPoint";
};

export const isMatchExtensionsConfig = (
	config: RunnerConfiguration
): config is MatchExtensionsConfiguration => {
	return config.use === "matchExtensions";
};

export const isSequencerConfig = (
	config: RunnerConfiguration
): config is SequencerConfiguration => {
	return config.use === "sequencer";
};
