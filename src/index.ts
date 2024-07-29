import { NavigationView, contentView, asFactory} from "tabris";
import type {
    Page,
    Action,
    SearchAction,
    CompositeAddChildEvent,
} from "tabris";
import { createProxies } from "./utils/proxy";

let navigation: NavigationView;

contentView.on(
    "addChild",
    ({ child }: CompositeAddChildEvent<typeof contentView>) => {
        if (child instanceof NavigationView && !navigation) {
            navigation = child;
        }
    }
);

export default addView;
export * from "./modal";
export * from "./navigation";
export * from "./preference";
export function addView(...widgets: (Page | Action | SearchAction)[]) {
    return navigation.append(...widgets);
}

/**
 * @Version 0.4
 */
abstract class VoirRender {
    abstract renderAction(): Action[];
    abstract render(): Page;
    
    constructor() {
        const elms = [];
        
        if (typeof this.renderAction === 'function') {
            const actions = this.renderAction();
            if (actions) elms.push(...Array.from(actions));
        }
        
        addView(...elms, this.render());
    }
}

export const Voir = Object.freeze({
    Render: VoirRender,
    factory(Class: VoirRender) {
        //@ts-ignore
        return createProxies(Class) as VoirRender;
    }
})