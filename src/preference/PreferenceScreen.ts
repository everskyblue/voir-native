import { Page, Properties } from "tabris";
import { createProxies } from "../utils/proxy";
import { createInstance } from "../utils/helpers";

export class PreferenceScreenComponent extends Page {
    constructor(props?: Properties<PreferenceScreenComponent>) {
        super(props);
    }
}

function preferenceScreen(props: Properties<PreferenceScreenComponent>) {
    return createInstance<PreferenceScreenComponent>(
        {
            layoutData: "stretch",
            ...props,
        },
        PreferenceScreenComponent
    );
}

export const PreferenceScreen =
    createProxies<PreferenceScreenComponent>(preferenceScreen);
