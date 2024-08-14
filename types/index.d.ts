import { NavigationView } from "tabris";
import type { Page, Action, SearchAction, Widget, Constructor } from "tabris";
export * from "./modal";
export * from "./navigation";
export * from "./preference";
export declare function addView(...widgets: (Page | Action | SearchAction)[]): NavigationView;
/**
 * @Version 0.4
 */
declare abstract class VoirRender {
    abstract renderAction(): Action[];
    abstract render(): Page;
    constructor();
}
export interface Render {
    renderAction(): (Action | SearchAction)[];
    render(): Widget;
}
export declare const Voir: Readonly<{
    Render: typeof VoirRender;
    factory(Class: Constructor<Render>): (new () => Render) & (() => Render);
}>;
