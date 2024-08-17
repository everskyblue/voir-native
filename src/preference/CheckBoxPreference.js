import { CheckBox } from "tabris";
import { createProxies } from "../utils/proxy";
import { Checked } from "./AbstractCheked";

export class CheckBoxPreferenceComponent extends Checked {
    constructor(props) {
        super(props);
    }

    _getButton(props) {
        return new CheckBox(props);
    }
}

export const CheckBoxPreference = createProxies(CheckBoxPreferenceComponent);
