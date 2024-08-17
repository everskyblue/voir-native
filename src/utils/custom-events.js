import { Listeners } from "../support";

const events = new Map();

function getConstructor(ctx) {
    return ctx instanceof Object && ctx.constructor ? ctx.constructor : ctx;
}

function getEventManager(ctx) {
    return events.get(getConstructor(ctx));
}

customEvent.addListener = (ctx, name, handler) => {
    const { store } = getEventManager(ctx);
    if (!store.has(ctx)) {
        store.set(ctx, {event: {}, listeners: new WeakMap()});
    }
    store.get(ctx).event[name] = handler;
}

customEvent.listener = (ctx, ctx2) => {
    const { instanceOf, store } = getEventManager(ctx);
    for (let { listeners: nameEvents, element, invoke } of instanceOf) {
        if (!(ctx2 instanceof element)) continue;
        const realHandler = store.get(ctx);
        if (!realHandler) continue;
        if (realHandler.listeners.has(ctx2)) continue;
        realHandler.listeners.set(ctx2, nameEvents.map(nameEvent => {
            const event = new Listeners(ctx2, nameEvent);
            event.addListener((evt) => {
                for (let typeInvoke of invoke) {
                    realHandler.event[typeInvoke](evt.target, evt);
                }
            });
            return event;
        }))
    }
}

export function customEvent(construct, defEvent) {
    if (events.has(construct)) return;
    events.set(construct, {
        ...defEvent,
        store: new WeakMap()
    });
}