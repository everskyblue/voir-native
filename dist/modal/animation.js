"use strict";
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
        easing: "ease-in-out",
    });
}
exports.animateHidden = animateHidden;
function animate(element, delay, duration) {
    return Promise.all([
        animateShow(element, delay, duration),
        animateHidden(element, delay, duration),
    ]);
}
exports.animate = animate;
