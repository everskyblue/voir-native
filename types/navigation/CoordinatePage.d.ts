import { type AnyWidget, NavigationView, Action, Properties as PropertiesTabris } from "tabris";
import { type IMenuItemOption, type MenuItemOf } from "./menu";
type TypeWidget = any[] | Array<any[]>;
/**
 * @description
 * utilizar en JSX <CoordinatePageComponent></CoordinatePageComponent>
 * encapsula la logica del menu de acciones del AppBar
 * cuando se añade un Page con Action o SearchAction
 * estas acciones desapareceran si la no es visible
 * haciendo que la nueva pagina no tenga los menus anteriores
 */
export declare class CoordinatePageComponent extends NavigationView {
    private _onActionSelect;
    private _onDrawerItemSelected;
    private _dataMenuDrawer;
    private _contentDrawer;
    set contentDrawer(view: AnyWidget);
    get contentDrawer(): AnyWidget;
    set onActionSelect(event: (itemAction: Action) => void);
    get onActionSelect(): (itemAction: Action) => void;
    set menuDrawer(menu: () => IMenuItemOption[]);
    get menuDrawer(): IMenuItemOption[];
    set onDrawerItemSelected(event: (item: MenuItemOf) => void);
    get onDrawerItemSelected(): (item: MenuItemOf) => void;
    private _render;
    constructor(props: PropertiesTabris<CoordinatePageComponent>);
    append(...widgets: TypeWidget): this;
}
/**
 * @description
 * encapsula en un proxy cuando se ejecute como funcion o instancia
 */
export declare const CoordinatePage: import("../utils/proxy").Callback<CoordinatePageComponent>;
export {};
