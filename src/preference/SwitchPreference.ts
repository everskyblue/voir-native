import { Switch, Properties } from "tabris";
import { createProxies } from "../utils/proxy";
import { Checked } from "./AbstractCheked";

export class SwitchPreferenceComponent extends Checked {
    onChange: any;

    constructor(props: Properties<SwitchPreferenceComponent>) {
        super(props);
    }

    _getButton(props: Properties<SwitchPreferenceComponent>) {
        return new Switch(props);
    }
}

export const SwitchPreference = createProxies(SwitchPreferenceComponent);
