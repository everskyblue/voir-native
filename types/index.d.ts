import { NavigationView } from "tabris";
import type { Page, Action, SearchAction } from "tabris";
declare function addView(...widgets: (Page | Action | SearchAction)[]): NavigationView<import("tabris").widgets.Page, import("tabris").widgets.Action>;
export default addView;
export * from "./modal";
export * from "./navigation";
export * from "./preference";
