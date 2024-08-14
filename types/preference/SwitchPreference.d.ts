import { Properties } from "tabris";
import { Checked } from "./AbstractCheked";
export declare class SwitchPreferenceComponent extends Checked {
    onChange: any;
    constructor(props: Properties<SwitchPreferenceComponent>);
    _getButton(props: Properties<SwitchPreferenceComponent>): import("tabris").widgets.Switch;
}
export declare const SwitchPreference: import("tabris").Constructor<SwitchPreferenceComponent>;
