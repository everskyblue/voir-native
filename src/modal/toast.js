import {
    sizeMeasurement,
    TextView,
    Composite
} from "tabris";
import { contentView, isVersion2 } from "../support";
import AnimationTime from "./animation-time";
import { animate } from "./animation";

let stackToast = [];

export default class Toast extends AnimationTime {
    show;

    _message = new TextView({
        textColor: "white",
        left: 0,
        right: 0,
    });

    _modal = new Composite({
        background: "black",
        padding: 10,
        cornerRadius: 10,
        bottom: 30,
        opacity: 0
    }).append(this._message);

    constructor(message, duration) {
        super();

        const font = "12px";
        const left = 20;
        const right = 20;

        const size = sizeMeasurement?.measureTextsSync([
            { text: message, font },
        ]) ?? [{ width: -1, height: -1}];
        
        if (isVersion2) {
            this._modal.once('boundsChanged', ({target, value: { width }}) => {
                if (width > contentView.bounds.width) {
                    target.set({
                        left, 
                        right, 
                        centerX: undefined
                    })
                }
            })
        }
        
        const isMax = size[0].width > contentView.bounds.width - 20;
        const props = {};

        if (isMax) {
            this._modal.left = left;
            this._modal.right = right;
        } else {
            this._modal.centerX = isVersion2 ? 0 : true;
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
            const { promise, element } = stackToast[0];
            promise().then(() => {
                stackToast.shift();
                element.dispose();
                flush();
            }).catch(console.log);
        }

        function appendToast(modal) {
            contentView.append(modal);
            return animate(modal, 0, duration);
        }
    }

    static makeText(msg, duration = Toast.SHORT) {
        return new Toast(msg, duration);
    }
}
