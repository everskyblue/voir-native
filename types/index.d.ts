import { NavigationView } from "tabris";
import type { Page, Action, SearchAction } from "tabris";
export default addView;
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
export declare const Voir: {
    Render: typeof VoirRender;
    factory(Class: VoirRender): VoirRender;
};
