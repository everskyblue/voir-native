import "string-tocapitalize";
import { Composite, TextView } from "tabris";
import type { Properties, WidgetTapEvent } from "tabris";
import { setPreference, existsKeyPreference } from "./storage";
import defineProperty from "../utils/define-property";

const adjustCompactText = {
    left: 0,
    right: "10%",
};

interface PreferenceParams {
    key: string;
    value: string | number | boolean;
    title: string;
    summary: string;
}

type SelectEvent = (event: WidgetTapEvent<ItemPreference>) => any;

const addEvent = (component: ItemPreference) => (event: SelectEvent) =>
    component.onTap(event);

export default abstract class ItemPreference
    extends Composite
    implements PreferenceParams
{
    public title: string;
    public summary: string;
    public key: string;
    public value: string | number | boolean;

    public set onSelect(fn: (event: SelectEvent) => any) {
        //@ts-ignore
        addEvent(this)(fn);
    }

    public get onSelect(): (event: SelectEvent) => any {
        return addEvent(this);
    }

    constructor(props: Properties<ItemPreference>) {
        super({
            left: 0,
            right: 0,
            padding: 10,
            top: "prev()",
            highlightOnTouch: true,
            ...props,
        });

        if (!existsKeyPreference(this.key)) {
            setPreference(this.key, this.value);
        }

        const centerY = this.summary.length === 0 ? true : 0;
        const propTitle: Properties<TextView> = {
            text: this.title.toCapitalize(),
        };

        if (centerY) {
            propTitle.centerY = true;
        } else {
            propTitle.top = "prev()";
        }

        this.append(new TextView(propTitle));

        if (this.summary.length > 0) {
            this.append(
                new TextView({
                    //font: this.fontSummary,
                    text: this.summary,
                    top: ["prev()", 0],
                    ...adjustCompactText,
                })
            );
        }
    }
}

defineProperty(ItemPreference.prototype, "title", {
    type: "string",
    default: "",
});

defineProperty(ItemPreference.prototype, "summary", {
    type: "string",
    default: "",
});

defineProperty(ItemPreference.prototype, "key", {
    type: "string",
    default: "",
});

defineProperty(ItemPreference.prototype, "value", {
    type: "string",
    default: "",
});
