import type {
    CheckBox,
    CheckBoxSelectEvent,
    Properties,
    Switch,
    Widget,
} from "tabris";
import ItemPreference from "./AbstractItemPreference";
import { getValuePreference, setPreference } from "./storage";

export abstract class Checked extends ItemPreference {
    constructor(props: Properties<Switch | CheckBox>) {
        let checkButton: CheckBox | Switch;
        //@ts-ignore
        const onSelect = props.onSelect;
        //@ts-ignore
        props.onSelect = () => (checkButton.checked = !checkButton.checked);

        super(props);

        checkButton = this._getButton({
            right: 0,
            centerY: true,
            checked: getValuePreference(this.key) ?? this.value,
        });

        checkButton.on("checkedChanged", () => {
            setPreference(this.key, checkButton.checked);
            typeof onSelect === "function" && onSelect.call(this);
        });

        this.append(checkButton as Widget<typeof checkButton>);
    }

    abstract _getButton(
        props: Properties<CheckBox | Switch>
    ): CheckBox | Switch;
}
