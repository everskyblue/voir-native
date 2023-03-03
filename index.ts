import { NavigationView, contentView } from "tabris";
import type {
    Page,
    Action,
    SearchAction,
    CompositeAddChildEvent,
} from "tabris";

let navigation: NavigationView;

contentView.on(
    "addChild",
    ({ child }: CompositeAddChildEvent<typeof contentView>) => {
        if (child instanceof NavigationView && !navigation) {
            navigation = child;
        }
    }
);

function addView(...widgets: (Page | Action | SearchAction)[]) {
    return navigation.append(...widgets);
}

export default addView;
export { menuDrawer } from "./navigation/menu";
export type { MenuItemOf } from "./navigation/menu";
export {
    CoordinatePage,
    CoordinatePageComponent,
} from "./navigation/coordinate-page";
