export function animateShow(
    element,
    delay,
    duration
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
    element,
    delay,
    duration
) {
    return element.animate(
        {
            opacity: 0,
        },
        {
            delay,
            duration,
            easing: "ease-out",
        }
    );
}

export function animate(
    element,
    delay,
    duration
) {
    return Promise.resolve(animateShow(element, delay, 300)).then(()=> {
        return Promise.resolve(animateHidden(element, duration, duration));
    })
}
