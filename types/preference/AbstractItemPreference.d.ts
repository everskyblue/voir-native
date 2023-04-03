import "string-tocapitalize";
import { Composite, Properties, WidgetTapEvent } from "tabris";
export interface PreferenceParams {
    key: string;
    value: string | number | boolean;
    title: string;
    summary: string;
}
type SelectEvent = (event: WidgetTapEvent<ItemPreference>) => any;
export default abstract class ItemPreference extends Composite implements PreferenceParams {
    title: string;
    summary: string;
    key: string;
    value: string | number | boolean;
    set onSelect(fn: (event: SelectEvent) => any);
    get onSelect(): (event: SelectEvent) => any;
    constructor(props: Properties<ItemPreference>);
}
export {};
