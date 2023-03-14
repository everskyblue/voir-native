import { Page } from "tabris";
import { createProxies } from "../utils/proxy";
import type { Properties } from "tabris";

class PreferenceScreenComponent extends Page {
    constructor(props?: Properties<PreferenceScreenComponent>) {
        super(props);
    }
}

function preferenceScreen(props: Properties<PreferenceScreenComponent> = {}) {
    return new PreferenceScreenComponent({
        layoutData: "stretch",
        ...props,
    });
}

export default createProxies<PreferenceScreenComponent>(preferenceScreen);
