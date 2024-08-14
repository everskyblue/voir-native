import { TextView, Properties } from "tabris";
import ItemPreference from "./AbstractItemPreference";
import { createProxies } from "../utils/proxy";

export class TextPreferenceComponent extends ItemPreference {
    constructor(props: Properties<TextView>) {
        super(props)
    }

}

export const TextPreference = createProxies(TextPreferenceComponent);
