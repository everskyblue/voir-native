import { Constructor, Properties, Switch, WidgetTapEvent } from "tabris";
import { Checked } from "./AbstractChecked";
export declare class SwitchPreferenceComponent extends Checked {
    constructor(props: Properties<SwitchPreferenceComponent>);
    _getButton(props: Properties<SwitchPreferenceComponent>): Switch;
}
export declare const SwitchPreference: Constructor<SwitchPreferenceComponent>;
