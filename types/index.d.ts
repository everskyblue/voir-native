import { NavigationView, Page, Action, SearchAction/*, Widget, Constructor, WidgetCollection, Properties*/ } from "tabris";
export * from "./modal";
export * from "./navigation";
export * from "./preference";
export declare function addView(...widgets: (Page | Action | SearchAction)[]): NavigationView;
/**
 * @Version 0.4
 */
declare abstract class VoirRender implements Render {
    abstract renderAction(): (Action | SearchAction)[];
    abstract render(): Widget<any>;
    constructor();
}
export interface Render {
    renderAction?: () => (Action | SearchAction)[];
    render(): any;
}
export declare const Voir: Readonly<{
    Render: typeof VoirRender;
    factory(Class: Constructor<Render>): (new () => Render) & (() => Render);
}>;
export * from "./support";

declare global {
    var $: tabris.$ | {
        (selector?: string | Widget | any): WidgetCollection<Widget<any>>;
    }
}