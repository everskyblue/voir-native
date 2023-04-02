import type { AnyWidget, Composite, JSXAttributes } from "tabris";

type CallbackAppend = (widgets: any[]) => any;
export type CallbackInstance<View extends AnyWidget> = new (
    propsr: JSXAttributes<View>
) => View;
export type Callable<View extends AnyWidget> = (
    propr?: JSXAttributes<View> & any
) => View;
export type Callback<View extends AnyWidget> =
    | CallbackInstance<View>
    | Callable<View>;

export function createProxies<T extends Composite>(
    funReceivedProxy: Callback<T>,
    funAppend?: CallbackAppend
) {
    const ProxiesCallback: typeof funReceivedProxy = new Proxy(
        funReceivedProxy,
        {
            construct(
                target: Callable<T>,
                argArray
            ): InstanceType<CallbackInstance<T>> {
                return new Proxy<InstanceType<CallbackInstance<T>>>(
                    target(argArray[0]),
                    {
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
                                    typeof funAppend === "function"
                                        ? funAppend(widgets)
                                        : void 0,
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
                    }
                ) as T;
            },
            apply(_, __, argArray): InstanceType<CallbackInstance<T>> {
                return new (ProxiesCallback as CallbackInstance<T>)(
                    argArray[0]
                );
            },
        }
    );

    return ProxiesCallback;
}
