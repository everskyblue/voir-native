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
exports.CheckBoxPreference = exports.CheckBoxPreferenceComponent = void 0;
var tabris_1 = require("tabris");
var proxy_1 = require("../utils/proxy");
var AbstractCheked_1 = require("./AbstractCheked");
function ProxyCheckBoxPreference(props) {
    if (props === void 0) { props = {}; }
    return new CheckBoxPreferenceComponent(props);
}
var CheckBoxPreferenceComponent = (function (_super) {
    __extends(CheckBoxPreferenceComponent, _super);
    function CheckBoxPreferenceComponent(props) {
        return _super.call(this, props) || this;
    }
    CheckBoxPreferenceComponent.prototype._getButton = function (props) {
        return new tabris_1.CheckBox(props);
    };
    return CheckBoxPreferenceComponent;
}(AbstractCheked_1.Checked));
exports.CheckBoxPreferenceComponent = CheckBoxPreferenceComponent;
exports.CheckBoxPreference = (0, proxy_1.createProxies)(ProxyCheckBoxPreference);
