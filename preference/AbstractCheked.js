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
exports.Checked = void 0;
var AbstractItemPreference_1 = require("./AbstractItemPreference");
var storage_1 = require("./storage");
var Checked = (function (_super) {
    __extends(Checked, _super);
    function Checked(props) {
        var _this = this;
        var _a;
        var checkButton;
        var onSelect = props.onSelect;
        props.onSelect = function () { return (checkButton.checked = !checkButton.checked); };
        _this = _super.call(this, props) || this;
        checkButton = _this._getButton({
            right: 0,
            centerY: true,
            checked: (_a = (0, storage_1.getValuePreference)(_this.key)) !== null && _a !== void 0 ? _a : _this.value,
        });
        checkButton.on("checkedChanged", function () {
            (0, storage_1.setPreference)(_this.key, checkButton.checked);
            typeof onSelect === "function" && onSelect.call(_this);
        });
        _this.append(checkButton);
        return _this;
    }
    return Checked;
}(AbstractItemPreference_1.default));
exports.Checked = Checked;
