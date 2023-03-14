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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("string-tocapitalize");
var tabris_1 = require("tabris");
var storage_1 = require("./storage");
var define_property_1 = require("../utils/define-property");
var adjustCompactText = {
    left: 0,
    right: "10%",
};
var addEvent = function (component) { return function (event) {
    return component.onTap(event);
}; };
var ItemPreference = (function (_super) {
    __extends(ItemPreference, _super);
    function ItemPreference(props) {
        var _this = _super.call(this, __assign({ left: 0, right: 0, padding: 10, top: "prev()", highlightOnTouch: true }, props)) || this;
        if (!(0, storage_1.existsKeyPreference)(_this.key)) {
            (0, storage_1.setPreference)(_this.key, _this.value);
        }
        var centerY = _this.summary.length === 0 ? true : 0;
        var propTitle = {
            text: _this.title.toCapitalize(),
        };
        if (centerY) {
            propTitle.centerY = true;
        }
        else {
            propTitle.top = "prev()";
        }
        _this.append(new tabris_1.TextView(propTitle));
        if (_this.summary.length > 0) {
            _this.append(new tabris_1.TextView(__assign({ text: _this.summary, top: ["prev()", 0] }, adjustCompactText)));
        }
        return _this;
    }
    Object.defineProperty(ItemPreference.prototype, "onSelect", {
        get: function () {
            return addEvent(this);
        },
        set: function (fn) {
            addEvent(this)(fn);
        },
        enumerable: false,
        configurable: true
    });
    return ItemPreference;
}(tabris_1.Composite));
exports.default = ItemPreference;
(0, define_property_1.default)(ItemPreference.prototype, "title", {
    type: "string",
    default: "",
});
(0, define_property_1.default)(ItemPreference.prototype, "summary", {
    type: "string",
    default: "",
});
(0, define_property_1.default)(ItemPreference.prototype, "key", {
    type: "string",
    default: "",
});
(0, define_property_1.default)(ItemPreference.prototype, "value", {
    type: "string",
    default: "",
});
