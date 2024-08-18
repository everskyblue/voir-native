import type { CheckBox, Properties, RadioButton, Switch } from "tabris";
import ItemPreference from "./AbstractItemPreference";
export declare abstract class Checked extends ItemPreference {
    onSelect: any;
    constructor(props: Pick<any, any>);
    addListener(checkButton: RadioButton | Switch | CheckBox, originalOnSelect: Function): void;
    abstract _getButton(props: Properties<CheckBox | Switch | RadioButton>): CheckBox | Switch | RadioButton;
}
