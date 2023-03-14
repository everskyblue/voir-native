"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProxies = void 0;
function createProxies(funReceivedProxy, funAppend) {
    var ProxiesCallback = new Proxy(funReceivedProxy, {
        construct: function (target, argArray) {
            return new Proxy(target(argArray[0]), {
                get: function (instance, prop) {
                    if (prop === "append") {
                        return function () {
                            var widgets = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                widgets[_i] = arguments[_i];
                            }
                            return (instance.append.apply(instance, widgets),
                                typeof funAppend === 'function' ? funAppend(widgets) : void 0,
                                instance);
                        };
                    }
                    return typeof instance[prop] === "function"
                        ? instance[prop].bind(instance)
                        : instance[prop];
                },
                set: function (instance, prop, value) {
                    instance[prop] = value;
                    return true;
                },
            });
        },
        apply: function (_, __, argArray) {
            return new ProxiesCallback(argArray[0]);
        },
    });
    return ProxiesCallback;
}
exports.createProxies = createProxies;
