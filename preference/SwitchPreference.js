"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitchPreference = exports.SwitchPreferenceComponent = void 0;
var tabris_1 = require("tabris");
var proxy_1 = require("../utils/proxy");
var AbstractCheked_1 = require("./AbstractCheked");
function ProxySwitchPreference(props) {
    if (props === void 0) { props = {}; }
    return new SwitchPreferenceComponent(props);
}
var SwitchPreferenceComponent = (function (_super) {
    __extends(SwitchPreferenceComponent, _super);
    function SwitchPreferenceComponent(props) {
        return _super.call(this, props) || this;
    }
    SwitchPreferenceComponent.prototype._getButton = function (props) {
        return new tabris_1.Switch(props);
    };
    return SwitchPreferenceComponent;
}(AbstractCheked_1.Checked));
exports.SwitchPreferenceComponent = SwitchPreferenceComponent;
exports.SwitchPreference = (0, proxy_1.createProxies)(ProxySwitchPreference);
