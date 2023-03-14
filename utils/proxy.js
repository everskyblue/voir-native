"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProxies = void 0;
function createProxies(funReceivedProxy, funAppend) {
    const ProxiesCallback = new Proxy(funReceivedProxy, {
        construct(target, argArray) {
            return new Proxy(target(argArray[0]), {
                get(instance, prop) {
                    if (prop === "append") {
                        return (...widgets) => (instance.append(...widgets),
                            typeof funAppend === 'function' ? funAppend(widgets) : void 0,
                            instance);
                    }
                    return typeof instance[prop] === "function"
                        ? instance[prop].bind(instance)
                        : instance[prop];
                },
                set(instance, prop, value) {
                    instance[prop] = value;
                    return true;
                },
            });
        },
        apply(_, __, argArray) {
            return new ProxiesCallback(argArray[0]);
        },
    });
    return ProxiesCallback;
}
exports.createProxies = createProxies;
