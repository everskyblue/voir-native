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
exports.TextPreference = exports.TextPreferenceComponent = void 0;
var AbstractItemPreference_1 = require("./AbstractItemPreference");
var proxy_1 = require("../utils/proxy");
function ProxyTextPreference(props) {
    return new TextPreferenceComponent(props);
}
var TextPreferenceComponent = (function (_super) {
    __extends(TextPreferenceComponent, _super);
    function TextPreferenceComponent(props) {
        return _super.call(this, props) || this;
    }
    return TextPreferenceComponent;
}(AbstractItemPreference_1.default));
exports.TextPreferenceComponent = TextPreferenceComponent;
exports.TextPreference = (0, proxy_1.createProxies)(ProxyTextPreference);
