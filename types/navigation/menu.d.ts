import { type Widget, Composite } from "tabris";
type MenuItemOf = MenuItem;
export interface IMenuItemOption {
    id: string;
    text: string;
    image?: string;
}
declare class MenuItem extends Composite {
    constructor(id: string);
}
/**
 * @version 0.4
 * no posee hijos y su padre es DrawerMenu
 */
export declare const DrawerMenuItem: (props: IMenuItemOption) => () => IMenuItemOption;
/**
 * @version 0.4
 * contenedor para DrawerMenuItem
 */
export declare const DrawerMenu: ({ children }: {
    children: ReturnType<typeof DrawerMenuItem>[];
}) => () => IMenuItemOption[];
export type { MenuItemOf };
/**
 * @deprecated
 * emite un warning desde la version 0.4
 */
export declare const menuDrawer: (menus: IMenuItemOption[], eventSelectMenu: (menu: MenuItem) => void) => void;
/**
 * @version 0.4
 */
export declare function setMenuDrawer(menus: IMenuItemOption[], eventSelectMenu: (menu: MenuItem) => void): void;
/**
 * @version 0.4
 */
export declare function setContentDrawer(view: Widget): void;
