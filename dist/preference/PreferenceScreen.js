"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreferenceScreen = exports.PreferenceScreenComponent = void 0;
const tabris_1 = require("tabris");
const proxy_1 = require("../utils/proxy");
const helpers_1 = require("../utils/helpers");
class PreferenceScreenComponent extends tabris_1.Page {
    constructor(props) {
        super(props);
    }
}
exports.PreferenceScreenComponent = PreferenceScreenComponent;
function preferenceScreen(props) {
    return (0, helpers_1.createInstance)(Object.assign({ layoutData: "stretch" }, props), PreferenceScreenComponent);
}
exports.PreferenceScreen = (0, proxy_1.createProxies)(preferenceScreen);
