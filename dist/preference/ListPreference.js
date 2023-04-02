"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListPreference = exports.ListPreferenceComponent = void 0;
const tabris_1 = require("tabris");
const AbstractCheked_1 = require("./AbstractCheked");
const proxy_1 = require("../utils/proxy");
const define_property_1 = require("../utils/define-property");
const modal_1 = require("../modal");
const storage_1 = require("./storage");
function ProxyListPreference(props = {}) {
    return new ListPreferenceComponent(props);
}
class ListPreferenceComponent extends AbstractCheked_1.Checked {
    //textButtonCancel: string;
    _getButton() {
        return;
    }
    constructor(props) {
        const onSelect = props.onSelect;
        super(props);
        this.onSelect(() => {
            const modal = new modal_1.Modal({
                title: this.title.toCapitalize(),
            });
            if (this.entries && this.entries.length > 0) {
                modal.addView(...this.entries.map((entry, index) => {
                    var _a;
                    const radiobtn = (0, tabris_1.RadioButton)({
                        text: entry.text,
                        checked: (_a = entry.checked) !== null && _a !== void 0 ? _a : parseInt((0, storage_1.getValuePreference)(this.key)) ===
                            index,
                        layoutData: {
                            top: [tabris_1.LayoutData.prev, 5],
                            left: 0,
                            right: 0,
                        },
                    }).onSelect((e) => {
                        if (e.checked) {
                            (0, storage_1.setPreference)(this.key, index);
                            typeof onSelect === "function" &&
                                onSelect.call(this, e);
                        }
                    });
                    if (entry.id) {
                        radiobtn.id = entry.id;
                    }
                    return radiobtn;
                }));
            }
            modal
                .setButtonAccept(this.textButtonAccept.toUpperCase())
                .addListener(cancel.bind(modal));
            modal.show();
        });
        function cancel() {
            this.remove();
        }
    }
}
exports.ListPreferenceComponent = ListPreferenceComponent;
exports.ListPreference = (0, proxy_1.createProxies)(ProxyListPreference);
(0, define_property_1.default)(ListPreferenceComponent.prototype, "entries", {
    type: "any",
    default: [],
});
(0, define_property_1.default)(ListPreferenceComponent.prototype, "textButtonAccept", {
    type: "string",
    default: "accept",
});
/*
defineProperty(ListPreferenceComponent.prototype, "textButtonCancel", {
    type: "string",
    default: "cancel",
});*/
