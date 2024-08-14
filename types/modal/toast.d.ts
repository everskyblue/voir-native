import AnimationTime from "./animation-time";
export default class Toast extends AnimationTime {
    show: (time: number) => any;
    readonly _message: import("tabris").widgets.TextView;
    readonly _modal: import("tabris").widgets.Composite<import("tabris").Widget<any>>;
    constructor(message: string, duration: number);
    static makeText(msg: string, duration?: number): Toast;
}
