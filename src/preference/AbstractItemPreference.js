import "string-tocapitalize";
import { Composite, TextView } from "tabris";
import { setPreference, existsKeyPreference } from "./storage";
import defineProperty from "../utils/define-property";
import { layoutData } from "../support";

const adjustCompactText = {
    left: 0,
    right: "10%",
};

const addEvent = (component) => (event) =>
    component.on('tap', event);

/**
 * @property {string} title
 * @property {string} summary
 * @property {string} key
 * @property {any} value
 */
export default class ItemPreference
    extends Composite
{
    set onSelect(fn) {
        addEvent(this)(fn);
    }

    get onSelect() {
        return addEvent(this);
    }

    constructor(props) {
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
        const propTitle = {
            text: this.title.toCapitalize(),
        };

        if (centerY) {
            propTitle.centerY = layoutData.centerY;
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
