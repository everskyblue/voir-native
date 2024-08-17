import { RadioButton } from "tabris";
import { LayoutData } from "../support";
import { Checked } from "./AbstractCheked";
import { createProxies } from "../utils/proxy";
import defineProperty from "../utils/define-property";
import { Modal } from "../modal";
import { getValuePreference, setPreference } from "./storage";

export class ListPreferenceComponent extends Checked {
    /*entries;
    textButtonAccept;
    //textButtonCancel: string;
    */

    _getButton() {
        return;
    }

    constructor(props) {
        const onSelect = props.onSelect;

        super(props);

        this.onSelect(() => {
            const modal = new Modal({
                title: this.title.toCapitalize(),
            });

            if (this.entries && this.entries.length > 0) {
                modal.addView(
                    ...this.entries.map((entry, index) => {
                        const radio = new RadioButton({
                            text: entry.text,
                            checked:
                                entry.checked ??
                                parseInt(getValuePreference(this.key)) ===
                                    index,
                            top: 'prev() 5',
                            left: 0,
                            right: 0,
                        }).onSelect((e) => {
                            if (e.checked) {
                                setPreference(this.key, index);
                                typeof onSelect === "function" &&
                                    onSelect.call(this, e);
                            }
                        });

                        if (entry.id) {
                            radio.id = entry.id;
                        }

                        return radio;
                    })
                );
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

export const ListPreference = createProxies(ListPreferenceComponent);

defineProperty(ListPreferenceComponent.prototype, "entries", {
    type: "any",
    default: [],
});

defineProperty(ListPreferenceComponent.prototype, "textButtonAccept", {
    type: "string",
    default: "accept",
});
/*
defineProperty(ListPreferenceComponent.prototype, "textButtonCancel", {
    type: "string",
    default: "cancel",
});*/
