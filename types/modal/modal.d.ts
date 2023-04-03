import { Button, Listeners, Widget } from "tabris";
export default class Modal {
    [k: string]: any;
    remove: () => any;
    show: () => any;
    setButtonAccept: (text: string) => Listeners<{
        target: Button;
    }>;
    setButtonCancel: (text: string) => Listeners<{
        target: Button;
    }>;
    addView: (...view: Widget<any>[]) => any;
    removeView: () => any;
    removeButtons: () => any;
    constructor(attrs?: any);
}
