import { Page, Properties } from "tabris";
import { createProxies } from "../utils/proxy";
import { createInstance } from "../utils/helpers";

export class PreferenceScreenComponent extends Page {
    constructor(props?: Properties<PreferenceScreenComponent>) {
        super({
            ...props,
            layoutData: "stretch"
        });
    }
}


export const PreferenceScreen = createProxies(PreferenceScreenComponent);
