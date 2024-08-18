import { RadioButton, Properties } from "tabris";
import { Checked } from "./AbstractChecked";
export interface IEntry {
    id?: string;
    text: string;
    checked?: boolean;
}
export declare class ListPreferenceComponent extends Checked {
    entries: IEntry[];
    textButtonAccept: string;
    _getButton(): RadioButton;
    constructor(props: Properties<ListPreferenceComponent> & {
        onSelect?: any;
    });
}
export declare const ListPreference: import("tabris").Constructor<ListPreferenceComponent>;
