import { Switch } from "tabris";
import type { Properties } from "tabris";
import { createProxies } from "../utils/proxy";
import { Checked } from "./AbstractCheked";

function ProxySwitchPreference(
    props: Properties<SwitchPreferenceComponent> = {}
) {
    return new SwitchPreferenceComponent(props);
}

export class SwitchPreferenceComponent extends Checked {
    onChange: any;

    constructor(props: Properties<SwitchPreferenceComponent>) {
        super(props);
    }

    _getButton(props: Properties<SwitchPreferenceComponent>) {
        return new Switch(props);
    }
}

export const SwitchPreference = createProxies(ProxySwitchPreference);
