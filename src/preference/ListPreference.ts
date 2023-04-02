import { LayoutData, RadioButton, Properties, RadioButtonSelectEvent } from "tabris";
import { Checked } from "./AbstractCheked";
import { createProxies } from "../utils/proxy";
import defineProperty from "../utils/define-property";
import { Modal } from "../modal";
import { getValuePreference, setPreference } from "./storage";

export interface IEntry {
    id?: string;
    text: string;
    checked?: boolean;
}

function ProxyListPreference(props: Properties<ListPreferenceComponent> = {}) {
    return new ListPreferenceComponent(props);
}

export class ListPreferenceComponent extends Checked {
    entries: IEntry[];
    textButtonAccept: string;
    //textButtonCancel: string;

    _getButton(): RadioButton {
        return;
    }

    constructor(
        props: Properties<ListPreferenceComponent> & { onSelect?: any }
    ) {
        super(props);

        this.onSelect(() => {
            const modal = new Modal({
                title: this.title.toCapitalize(),
            });

            if (this.entries && this.entries.length > 0) {
                modal.addView(
                    ...this.entries.map((entry, index) => {
                        const radiobtn = RadioButton({
                            text: entry.text,
                            checked:
                                entry.checked ??
                                parseInt(getValuePreference(this.key)) ===
                                    index,
                            layoutData: {
                                top: [LayoutData.prev, 5],
                                left: 0,
                                right: 0,
                            },
                        }).onSelect((e: RadioButtonSelectEvent) => {
                            if (e.checked) {
                                setPreference(this.key, index);
                                typeof props.onSelect === "function" &&
                                    props.onSelect.call(this, e);
                            }
                        });

                        if (entry.id) {
                            radiobtn.id = entry.id;
                        }

                        return radiobtn;
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

export const ListPreference = createProxies(ProxyListPreference);

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
