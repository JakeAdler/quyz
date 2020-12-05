import Collector from "./collector";
declare type AnyVoid = Promise<void> | void;
export declare type AnyVoidCB = () => AnyVoid;
export declare type AnyCB = () => Promise<any> | any;
export declare type TestCB<T extends any[]> = (...macroArgs: T) => AnyVoid;
export declare type LogFn = (...args: any[]) => void;
export declare type Title<T extends any[]> = string | ((...args: Partial<T>) => string);
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
export interface DevConfiguration {
    logger: Pick<Console, "log">;
}
export interface Configuration {
    collector?: CollectorConfiguration;
    require?: string[];
    colors?: boolean;
    bubbleHooks?: boolean;
    volume?: number;
    dev?: false | DevConfiguration;
}
export interface CollectorConfiguration {
    use: keyof Collector;
    [key: string]: any;
}
export interface SequencerConfiguration extends CollectorConfiguration {
    use: "sequencer";
    sequence: string[];
    ignore?: string[];
}
export interface MatchExtensionsConfiguration extends CollectorConfiguration {
    use: "matchExtensions";
    match: string[];
    root: string;
}
export interface EntryPointConfiguration extends CollectorConfiguration {
    use: "entryPoint";
    root?: string;
}
export interface Action {
    type: "it" | "describe-start" | "describe-end" | "doOnce" | "hook" | "configure";
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
export declare class ConfigError extends Error {
    constructor(optionName: string, message: string);
}
export declare const isHookAction: (action: Action) => action is HookAction;
export declare const isItAction: <T extends any[]>(action: Action) => action is ItAction<T>;
export declare const isDescribeStartAction: (action: Action) => action is DescribeStartAction;
export declare const isDescribeEndAction: (action: Action) => action is DescribeEndAction;
export declare const isConfigurationAction: (action: Action) => action is ConfigureAction;
export declare const isDoOnceAction: (action: Action) => action is DoOnceAction;
export declare const isEntryPointConfig: (config: CollectorConfiguration) => config is EntryPointConfiguration;
export declare const isMatchExtensionsConfig: (config: CollectorConfiguration) => config is MatchExtensionsConfiguration;
export declare const isSequencerConfig: (config: CollectorConfiguration) => config is SequencerConfiguration;
export {};
