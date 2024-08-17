import ItemPreference from "./AbstractItemPreference";
import { getValuePreference, setPreference } from "./storage";
import { layoutData } from "../support"

export class Checked extends ItemPreference {
    constructor(props) {
        let checkButton;
        const originalOnSelect = props.onSelect;

        props.onSelect = () =>
            checkButton && (checkButton.checked = !checkButton.checked);

        super(props);

        checkButton = this._getButton({
            right: 0,
            centerY: layoutData.centerY,
            checked: getValuePreference(this.key) ?? this.value,
        });

        if (typeof checkButton !== "undefined") {
            this.addListener(checkButton, originalOnSelect);
            this.append(checkButton);
        }
    }

    addListener(checkButton, originalOnSelect) {
        checkButton.on(
            "checkedChanged",
            e => {
                setPreference(this.key, checkButton.checked);
                typeof originalOnSelect === "function" &&
                    originalOnSelect.call(this, e);
            }
        );
    }

    _getButton(props) {
        throw new Error('implements method');
    }
}
