"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
const animation_time_1 = require("./animation-time");
const animation_1 = require("./animation");
class Toast extends animation_time_1.default {
    constructor(message, duration) {
        super();
        const size = tabris_1.sizeMeasurement.measureTextsSync([
            { text: message, font: "12px" },
        ]);
        const isMax = size[0].width > tabris_1.contentView.bounds.width - 20;
        const props = {};
        if (isMax) {
            props.left = 20;
            props.right = 20;
        }
        else {
            props.centerX = true;
        }
        const textview = (0, tabris_1.TextView)({
            text: message,
            font: "12px",
            textColor: "white",
            left: 0,
            right: 0,
        });
        const modal = (0, tabris_1.Composite)(Object.assign({ background: "black", padding: 10, cornerRadius: 10, bottom: 30, opacity: 0 }, props)).append(textview);
        Object.defineProperty(this, "show", {
            configurable: false,
            value: () => __awaiter(this, void 0, void 0, function* () {
                tabris_1.contentView.append(modal);
                yield (0, animation_1.animate)(modal, 0, duration);
                modal.dispose();
            }),
        });
    }
    static makeText(msg, duration = Toast.SHORT) {
        return new Toast(msg, duration);
    }
}
exports.default = Toast;
