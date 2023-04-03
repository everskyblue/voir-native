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
exports.animate = exports.animateHidden = exports.animateShow = void 0;
function animateShow(element, delay, duration) {
    return element.animate({
        opacity: 1,
    }, {
        delay: delay !== null && delay !== void 0 ? delay : 0,
        duration,
        easing: "ease-in",
    });
}
exports.animateShow = animateShow;
function animateHidden(element, delay, duration) {
    return element.animate({
        opacity: 0,
    }, {
        delay,
        duration,
        easing: "ease-out",
    });
}
exports.animateHidden = animateHidden;
function animate(element, delay, duration) {
    return __awaiter(this, void 0, void 0, function* () {
        yield animateShow(element, delay, 300);
        yield animateHidden(element, duration, duration);
    });
}
exports.animate = animate;
