import { PreferenceParams } from "../preference/AbstractItemPreference";
import { CoordinatePageComponent } from "../navigation";
import {
    IEntry,
    ListPreferenceComponent,
    PreferenceScreenComponent,
} from "../preference";
import type {
    AnyWidget,
    ApplyAttributes,
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

export function createProxies<T extends Composite>(component: Callback<T>) {
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

type Args<C> = C extends Composite ? Attributes<C>[] : any[];
interface Constructor<T> extends Function {
    new(...args: Args<T>): T;
    (...iargs: Args<T>): T;
}

export function factory<
    T extends Function,
>(fac: T) {
    type Caller = Constructor<T>;
    const handler: ProxyHandler<Constructor<T>> = {
        get(target, p, receiver) {
            return Reflect.get(target, p, receiver);
        },
        apply(target, thisArg, argArray) {
            if (typeof target.name === 'string' && typeof target.constructor === 'function') {
                return Reflect.construct(target, thisArg);
            }
            return Reflect.apply(null, target, thisArg);
        }
    }
   return  new Proxy(fac as unknown as Caller, handler);
}