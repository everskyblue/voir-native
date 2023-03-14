import type { Composite, Properties } from "tabris";

type CallbackAppend = (widgets: any[]) => any;

interface Callback<View extends object> {
    (prop?: Properties<View> | any): View;
}

interface CallbackConstructor<View extends object> extends Callback<View> {
    new (props: Properties<View>): ProxyHandler<View>;
}

export function createProxies<T extends Composite>(
    funReceivedProxy: Callback<T>,
    funAppend?: CallbackAppend
) {
    const ProxiesCallback: CallbackConstructor<T> = new Proxy(
        funReceivedProxy,
        {
            construct(target, argArray) {
                return new Proxy(target(argArray[0]), {
                    get(
                        instance,
                        prop: Extract<
                            keyof Omit<Callback<T>, symbol>,
                            Callback<T>
                        >
                    ) {
                        if (prop === "append") {
                            return (...widgets: any[]) => (
                                instance.append(...widgets),
                                typeof funAppend === 'function' ? funAppend(widgets) : void 0,
                                instance
                            );
                        }
                        return typeof instance[prop] === "function"
                            ? (instance[prop] as Function).bind(instance)
                            : instance[prop];
                    },
                    set(instance, prop: string, value: any) {
                        //@ts-ignore
                        instance[prop] = value;
                        return true;
                    },
                }) as T;
            },
            apply(_, __, argArray) {
                return new ProxiesCallback(argArray[0]);
            },
        }
    ) as CallbackConstructor<T>;

    return ProxiesCallback;
}
