import AnimationTime from "./animation-time";
export default class Toast extends AnimationTime {
    show: (time: number) => any;
    constructor(message: string, duration: number);
    static makeText(msg: string, duration?: number): Toast;
}
