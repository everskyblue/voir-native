import { Constructor } from "tabris";
type Callback<T> = Constructor<T> | (() => T);
type Handler<T> = (new () => T) & (() => T);
export declare function createProxies<T>(component: Constructor<T>): Constructor<T>;
export declare function factory<T>(fac: Callback<T>): Handler<T>;
export {};
