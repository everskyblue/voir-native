import {
    sizeMeasurement,
    device,
    TextView,
    Composite,
    contentView,
} from "tabris";
import type { Properties } from "tabris";
import AnimationTime from "./animation-time";
import { animate } from "./animation";

export default class Toast extends AnimationTime {
    show: (time: number) => any;

    constructor(message: string) {
        super();

        const size = sizeMeasurement.measureTextsSync([
            { text: message, font: "12px" },
        ]);

        const isMax: boolean = size[0].width > contentView.bounds.width - 20;
        const props: Properties<Composite> = {};

        if (isMax) {
            props.left = 20;
            props.right = 20;
        } else {
            props.centerX = true;
        }

        const textview = TextView({
            text: message,
            font: "12px",
            textColor: "white",
            left: 0,
            right: 0,
        });

        const modal = Composite({
            background: "black",
            padding: 10,
            cornerRadius: 10,
            bottom: 30,
            opacity: 0,
            ...props,
        }).append(textview);

        Object.defineProperty(this, "show", {
            configurable: false,
            value: async (time: number) => {
                contentView.append(modal as any);
                await animate(modal, time, Toast.SHORT);
                modal.dispose();
            },
        });
    }
}
