import { PreferenceParams } from "../preference/AbstractItemPreference";
import { CoordinatePageComponent } from "../navigation";
import { IEntry, ListPreferenceComponent, PreferenceScreenComponent } from "../preference";
import type { AnyWidget, CheckBox, Composite, JSXAttributes, PropertyChangedEvent, RadioButton, RadioButtonSelectEvent, Switch } from "tabris";
type CallbackAppend = (widgets: any[]) => any;
type OptionalAtrributes<T> = {
    [K in keyof T]?: T[K];
};
type Attributes<View> = View extends PreferenceScreenComponent | CoordinatePageComponent ? JSXAttributes<View> & {
    children?: AnyWidget[];
} : OptionalAtrributes<PreferenceParams> & {
    onSelect?: (event: View extends RadioButton ? RadioButtonSelectEvent : PropertyChangedEvent<RadioButton | Switch | CheckBox, boolean>) => any;
} & (View extends ListPreferenceComponent ? {
    entries: IEntry[];
} : {});
export type CallbackInstance<View extends AnyWidget> = new (props: Attributes<View>) => View;
export type Callable<View extends AnyWidget> = (props?: Attributes<View>) => View;
export type Callback<View extends AnyWidget> = CallbackInstance<View> | Callable<View>;
export declare function createProxies<T extends Composite>(funReceivedProxy: Callback<T>, funAppend?: CallbackAppend): Callback<T>;
export declare function factory<T = any>(fac: T): void;
export {};
