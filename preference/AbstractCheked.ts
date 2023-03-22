import type {
    CheckBox,
    CheckBoxSelectEvent,
    Properties,
    RadioButton,
    Switch,
    Widget,
} from "tabris";
import ItemPreference from "./AbstractItemPreference";
import { getValuePreference, setPreference } from "./storage";

export abstract class Checked extends ItemPreference {
    originalOnSelect: Function;

    constructor(props: Pick<any, any>) {
        let checkButton: CheckBox | Switch;
        const originalOnSelect = props.onSelect;

        props.onSelect = () =>
            checkButton && (checkButton.checked = !checkButton.checked);

        super(props);

        this.originalOnSelect = originalOnSelect;

        checkButton = this._getButton({
            right: 0,
            centerY: true,
            checked: getValuePreference(this.key) ?? this.value,
        });

        if (typeof checkButton !== "undefined") {
            this.addListener(checkButton, originalOnSelect);
            this.append(checkButton as Widget<typeof checkButton>);
        }
    }

    addListener(checkButton: any, originalOnSelect: Function) {
        checkButton.on("checkedChanged", () => {
            setPreference(this.key, checkButton.checked);
            typeof originalOnSelect === "function" &&
                originalOnSelect.call(this);
        });
    }

    abstract _getButton(
        props: Properties<CheckBox | Switch | RadioButton>
    ): CheckBox | Switch | RadioButton;
}
