import { Composite } from "tabris";
type MenuItemOf = MenuItem;
interface IMenuItemOption {
    id: string;
    text: string;
    image?: string;
}
declare class MenuItem extends Composite {
    constructor(id: string);
}
export type { MenuItemOf };
export declare function menuDrawer(menus: IMenuItemOption[], eventSelectMenu: (menu: MenuItem) => void): void;
