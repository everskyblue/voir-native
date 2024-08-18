import { TextView } from "tabris";
import ItemPreference from "./AbstractItemPreference";
import { createProxies } from "../utils/proxy";

export class TextPreferenceComponent extends ItemPreference {
    constructor(props) {
        super(props)
    }
}

export const TextPreference = createProxies(TextPreferenceComponent);
