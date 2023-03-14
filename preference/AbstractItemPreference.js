"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("string-tocapitalize");
const tabris_1 = require("tabris");
const storage_1 = require("./storage");
const define_property_1 = require("../utils/define-property");
const adjustCompactText = {
    left: 0,
    right: "10%",
};
const addEvent = (component) => (event) => component.onTap(event);
class ItemPreference extends tabris_1.Composite {
    set onSelect(fn) {
        addEvent(this)(fn);
    }
    get onSelect() {
        return addEvent(this);
    }
    constructor(props) {
        super(Object.assign({ left: 0, right: 0, padding: 10, top: "prev()", highlightOnTouch: true }, props));
        if (!(0, storage_1.existsKeyPreference)(this.key)) {
            (0, storage_1.setPreference)(this.key, this.value);
        }
        const centerY = this.summary.length === 0 ? true : 0;
        const propTitle = {
            text: this.title.toCapitalize(),
        };
        if (centerY) {
            propTitle.centerY = true;
        }
        else {
            propTitle.top = "prev()";
        }
        this.append(new tabris_1.TextView(propTitle));
        if (this.summary.length > 0) {
            this.append(new tabris_1.TextView(Object.assign({ text: this.summary, top: ["prev()", 0] }, adjustCompactText)));
        }
    }
}
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
