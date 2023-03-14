"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
const proxy_1 = require("../utils/proxy");
class PreferenceScreenComponent extends tabris_1.Page {
    constructor(props) {
        super(props);
    }
}
function preferenceScreen(props = {}) {
    return new PreferenceScreenComponent(Object.assign({ layoutData: "stretch" }, props));
}
exports.default = (0, proxy_1.createProxies)(preferenceScreen);
