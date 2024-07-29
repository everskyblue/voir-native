import { PreferenceParams } from "../preference/AbstractItemPreference";
import { CoordinatePageComponent } from "../navigation";
import {
    IEntry,
    ListPreferenceComponent,
    PreferenceScreenComponent,
} from "../preference";
import type {
    AnyWidget,
    CheckBox,
    Composite,
    JSXAttributes,
    PropertyChangedEvent,
    RadioButton,
    RadioButtonSelectEvent,
    Switch,
} from "tabris";

type CallbackAppend = (widgets: any[]) => any;

type OptionalAtrributes<T> = {
    [K in keyof T]?: T[K];
};

type Attributes<View> = View extends
    | PreferenceScreenComponent
    | CoordinatePageComponent
    ? JSXAttributes<View> & {
          children?: AnyWidget[];
      }
    : OptionalAtrributes<PreferenceParams> & {
          onSelect?: (
              event: View extends RadioButton
                  ? RadioButtonSelectEvent
                  : PropertyChangedEvent<
                        RadioButton | Switch | CheckBox,
                        boolean
                    >
          ) => any;
      } & (View extends ListPreferenceComponent ? { entries: IEntry[] } : {});

export type CallbackInstance<View extends AnyWidget> = new (
    props: Attributes<View>
) => View;
export type Callable<View extends AnyWidget> = (
    props?: Attributes<View>
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
                target: CallbackInstance<T>,
                argArray
            ) {
                return new target(argArray[0]);
                /*return new Proxy<InstanceType<CallbackInstance<T>>>(
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
                ) as T;*/
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

export function factory<T = any>(fac: T) {
    if (true) {
        
    }
}