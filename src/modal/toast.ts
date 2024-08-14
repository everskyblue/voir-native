import {
    sizeMeasurement,
    TextView,
    Composite,
    contentView,
    Properties,
} from "tabris";
import AnimationTime from "./animation-time";
import { animate } from "./animation";

let stackToast: ({element: Composite, promise: ()=> Promise<any>})[] = [];

export default class Toast extends AnimationTime {
    show: () => any;

    readonly _message = TextView({
        textColor: "white",
        left: 0,
        right: 0,
    });

    readonly _modal = Composite({
        background: "black",
        padding: 10,
        cornerRadius: 10,
        bottom: 30,
        opacity: 0
    }).append(this._message);

    constructor(message: string, duration: number) {
        super();

        const font = "12px";

        const size = sizeMeasurement.measureTextsSync([
            { text: message, font },
        ]);

        const isMax: boolean = size[0].width > contentView.bounds.width - 20;
        const props: Properties<Composite> = {};

        if (isMax) {
            this._modal.left = 20;
            this._modal.right = 20;
        } else {
            this._modal.centerX = true;
        }
        
        this._message.text = message;
        this._message.font = font;

        Object.defineProperty(this, "show", {
            configurable: false,
            value: () => {
                if (stackToast.length === 1) {
                    flush();
                }
                if (stackToast.length > 0) {
                    stackToast.push({
                        element: this._modal,
                        promise: () => new Promise((resolve)=> {
                            resolve(appendToast(this._modal))
                        })
                    })
                } else {
                    const ani = appendToast(this._modal);
                    stackToast.push({
                        promise: ()=> ani,
                        element: this._modal
                    });
                }
            },
        });

        const flush = () => {
            if (stackToast.length === 0) return;
            const { promise, element } = stackToast.at(0);
            promise().then(() => {
                stackToast.shift();
                element.dispose();
                flush();
            }).catch(console.log);
        }

        function appendToast(modal: Composite) {
            contentView.append(modal);
            return animate(modal, 0, duration);
        }
    }

    static makeText(msg: string, duration: number = Toast.SHORT) {
        return new Toast(msg, duration);
    }
}
