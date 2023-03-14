"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextPreference = exports.TextPreferenceComponent = void 0;
const AbstractItemPreference_1 = require("./AbstractItemPreference");
const proxy_1 = require("../utils/proxy");
function ProxyTextPreference(props) {
    return new TextPreferenceComponent(props);
}
class TextPreferenceComponent extends AbstractItemPreference_1.default {
    constructor(props) {
        super(props);
    }
}
exports.TextPreferenceComponent = TextPreferenceComponent;
exports.TextPreference = (0, proxy_1.createProxies)(ProxyTextPreference);
