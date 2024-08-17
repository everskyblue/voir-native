import { Page } from "tabris";
import { createProxies } from "../utils/proxy";
import { createInstance } from "../utils/helpers";
import { layoutData } from "../support";

export class PreferenceScreenComponent extends Page {
    constructor(props = {}) {
        super({
            ...props,
            layoutData: layoutData.stretch
        });
    }
}


export const PreferenceScreen = createProxies(PreferenceScreenComponent);
