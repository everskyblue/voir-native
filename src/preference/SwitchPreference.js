import { Switch } from "tabris";
import { createProxies } from "../utils/proxy";
import { Checked } from "./AbstractCheked";

export class SwitchPreferenceComponent extends Checked {
    //onChange;

    constructor(props) {
        super(props);
    }

    _getButton(props) {
        return new Switch(props);
    }
}

export const SwitchPreference = createProxies(SwitchPreferenceComponent);
