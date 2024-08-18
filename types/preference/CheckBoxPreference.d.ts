import { Properties } from "tabris";
import { Checked } from "./AbstractChecked";
export declare class CheckBoxPreferenceComponent extends Checked {
    constructor(props: Properties<CheckBoxPreferenceComponent>);
    _getButton(props: Properties<CheckBoxPreferenceComponent>): import("tabris").widgets.CheckBox;
}
export declare const CheckBoxPreference: import("tabris").Constructor<CheckBoxPreferenceComponent>;
