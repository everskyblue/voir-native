import { RadioButton, Properties } from "tabris";
import { Checked } from "./AbstractCheked";
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
export declare const ListPreference: import("../utils/proxy").Callback<ListPreferenceComponent>;
