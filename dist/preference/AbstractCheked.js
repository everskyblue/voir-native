"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checked = void 0;
const AbstractItemPreference_1 = require("./AbstractItemPreference");
const storage_1 = require("./storage");
class Checked extends AbstractItemPreference_1.default {
    constructor(props) {
        var _a;
        let checkButton;
        const originalOnSelect = props.onSelect;
        props.onSelect = () => checkButton && (checkButton.checked = !checkButton.checked);
        super(props);
        checkButton = this._getButton({
            right: 0,
            centerY: true,
            checked: (_a = (0, storage_1.getValuePreference)(this.key)) !== null && _a !== void 0 ? _a : this.value,
        });
        if (typeof checkButton !== "undefined") {
            this.addListener(checkButton, originalOnSelect);
            this.append(checkButton);
        }
    }
    addListener(checkButton, originalOnSelect) {
        checkButton.on("checkedChanged", (e) => {
            (0, storage_1.setPreference)(this.key, checkButton.checked);
            typeof originalOnSelect === "function" &&
                originalOnSelect.call(this, e);
        });
    }
}
exports.Checked = Checked;
