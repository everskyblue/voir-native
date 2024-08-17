import { NavigationView } from "tabris";
import { factory } from "./utils/proxy";
import { contentView } from "./support";

let navigation;

contentView.on(
    "addChild",
    ({ child }) => {
        if (child instanceof NavigationView && !navigation) {
            navigation = child;
        }
    }
);

export * from "./modal";
export * from "./navigation";
export * from "./preference";
export function addView(...widgets) {
    return navigation.append(...widgets);
}

/**
 * @Version 0.4
 */
class VoirRender {
    constructor() {
        const elms = [];
        
        if (typeof this.renderAction === 'function') {
            const actions = this.renderAction();
            if (actions) elms.push(...Array.from(actions));
        }
        //@ts-ignore
        addView(...elms, this.render());
    }
}

/*
export interface Render {
    renderAction(): (typeof Action | SearchAction)[];
    render(): Widget;
}*/

export const Voir = Object.freeze({
    Render: VoirRender,
    factory(Class) {
        return factory(Class);
    }
}) 

export * from "./support"