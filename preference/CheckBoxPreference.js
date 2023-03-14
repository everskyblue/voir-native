"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckBoxPreference = exports.CheckBoxPreferenceComponent = void 0;
const tabris_1 = require("tabris");
const proxy_1 = require("../utils/proxy");
const AbstractCheked_1 = require("./AbstractCheked");
function ProxyCheckBoxPreference(props = {}) {
    return new CheckBoxPreferenceComponent(props);
}
class CheckBoxPreferenceComponent extends AbstractCheked_1.Checked {
    constructor(props) {
        super(props);
    }
    _getButton(props) {
        return new tabris_1.CheckBox(props);
    }
}
exports.CheckBoxPreferenceComponent = CheckBoxPreferenceComponent;
exports.CheckBoxPreference = (0, proxy_1.createProxies)(ProxyCheckBoxPreference);
