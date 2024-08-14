import { type Widget, WidgetCollection, Row, Composite } from "tabris";
export type MenuItemOf = MenuItem;
export type MenuOption = {
    [key: string]: MenuItemOption;
};
export interface MenuItemOption {
    id: string;
    text: string;
    image?: string;
}
export declare class MenuAction extends Composite {
    constructor(id?: string);
}
export declare class MenuItem extends Row {
    constructor(props: any);
    _setElements(img: any, text: string): void;
    text: string;
    image: any;
}
/**
 * @version 0.4
 */
export declare const DrawerMenuItem: typeof MenuItem;
/**
 * @version 0.4
 * contenedor para DrawerMenuItem
 */
export declare const DrawerMenu: ({ children }: {
    children: Widget<typeof DrawerMenuItem>[];
}) => WidgetCollection<Widget<any>>;
/**
 * @deprecated
 * emite un warning desde la version 0.4
 */
export declare const menuDrawer: (menus: MenuItemOption[] | WidgetCollection<MenuItem>, eventSelectMenu: (menu: MenuAction) => void) => void;
/**
 * @version 0.4
 */
export declare function setMenuDrawer(menus: MenuItemOption[] | WidgetCollection<MenuItem>, eventSelectMenu?: (menu: MenuAction) => void): void;
/**
 * @version 0.4
 */
export declare function setContentDrawer(view: Widget): void;
