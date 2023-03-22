import type { Widget } from "tabris";

export function animateShow(
    element: Widget<any>,
    delay: number,
    duration: number
) {
    return element.animate(
        {
            opacity: 1,
        },
        {
            delay: delay ?? 0,
            duration,
            easing: "ease-in",
        }
    );
}

export function animateHidden(
    element: Widget<any>,
    delay: number,
    duration: number
) {
    return element.animate(
        {
            opacity: 0,
        },
        {
            delay,
            duration,
            easing: "ease-in-out",
        }
    );
}

export function animate(element: Widget<any>, delay: number, duration: number) {
    return Promise.all([
        animateShow(element, delay, duration),
        animateHidden(element, delay, duration),
    ]);
}
