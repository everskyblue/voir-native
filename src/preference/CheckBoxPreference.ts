import { CheckBox, Properties } from "tabris";
import { createProxies } from "../utils/proxy";
import { Checked } from "./AbstractCheked";

function ProxyCheckBoxPreference(props: Properties<CheckBoxPreferenceComponent> = {}) {
    return new CheckBoxPreferenceComponent(props);
}

export class CheckBoxPreferenceComponent extends Checked {
    constructor(props: Properties<CheckBoxPreferenceComponent>) {
        super(props);
    }

    _getButton(props: Properties<CheckBoxPreferenceComponent>) {
        return new CheckBox(props);
    }
}

export const CheckBoxPreference = createProxies(ProxyCheckBoxPreference);
