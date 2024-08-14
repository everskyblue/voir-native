import { NavigationView, contentView } from "tabris";
import type {
    Page,
    Action,
    SearchAction,
    CompositeAddChildEvent,
    Widget,
    Constructor,
} from "tabris";
import { factory } from "./utils/proxy";

let navigation: NavigationView;

contentView.on(
    "addChild",
    ({ child }: CompositeAddChildEvent<typeof contentView>) => {
        if (child instanceof NavigationView && !navigation) {
            navigation = child;
        }
    }
);

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

export interface Render {
    renderAction(): (Action | SearchAction)[];
    render(): Widget;
}

//@ts-ignore
export const Voir = Object.freeze({
    Render: VoirRender,
    factory(Class: Constructor<Render>) {
        return factory(Class);
    }
}) 
