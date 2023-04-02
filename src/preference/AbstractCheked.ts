import type { PropertyChangedEvent, CheckBox, Properties, RadioButton, Switch, Widget } from "tabris";
import ItemPreference from "./AbstractItemPreference";
import { getValuePreference, setPreference } from "./storage";

export abstract class Checked extends ItemPreference {
    constructor(props: Pick<any, any>) {
        let checkButton: CheckBox | Switch;
        const originalOnSelect = props.onSelect;

        props.onSelect = () =>
            checkButton && (checkButton.checked = !checkButton.checked);

        super(props);

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

    addListener(
        checkButton: RadioButton | Switch | CheckBox,
        originalOnSelect: Function
    ) {
        checkButton.on(
            "checkedChanged",
            (
                e: PropertyChangedEvent<
                    RadioButton | Switch | CheckBox,
                    boolean
                >
            ) => {
                setPreference(this.key, checkButton.checked);
                typeof originalOnSelect === "function" &&
                    originalOnSelect.call(this, e);
            }
        );
    }

    abstract _getButton(
        props: Properties<CheckBox | Switch | RadioButton>
    ): CheckBox | Switch | RadioButton;
}
