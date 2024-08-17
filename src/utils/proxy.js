export function createProxies(component) {
    const ProxiesCallback = new Proxy(
        component,
        {
            /*construct(target, argArray) {
                return new target(argArray[0] as Attributes<T>);
            },*/
            apply(target, __, argArray) {
                return Reflect.construct(target, argArray);
            },
        }
    );

    return ProxiesCallback;
}

export function factory(fac) {
    const handler = {
        get(target, p, receiver) {
            return Reflect.get(target, p, receiver);
        },
        apply(target, thisArg, argArray) {
            if (typeof target.name === 'string' && typeof target.constructor === 'function') {
                return Reflect.construct(target, argArray);
            }
            return Reflect.apply(null, target, argArray);
        }
    }
   return  new Proxy(fac, handler);
}