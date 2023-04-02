"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitchPreference = exports.SwitchPreferenceComponent = void 0;
const tabris_1 = require("tabris");
const proxy_1 = require("../utils/proxy");
const AbstractCheked_1 = require("./AbstractCheked");
function ProxySwitchPreference(props = {}) {
    return new SwitchPreferenceComponent(props);
}
class SwitchPreferenceComponent extends AbstractCheked_1.Checked {
    constructor(props) {
        super(props);
    }
    _getButton(props) {
        return new tabris_1.Switch(props);
    }
}
exports.SwitchPreferenceComponent = SwitchPreferenceComponent;
exports.SwitchPreference = (0, proxy_1.createProxies)(ProxySwitchPreference);
