import { type EventObject, type WidgetCollection, NavigationView, Widget, NativeObject } from "tabris";
import { MenuItem } from "./menu";
type TypeWidget = any[] | Array<any[]>;
/**
 * @description
 * utilizar en JSX <CoordinatePageComponent></CoordinatePageComponent>
 * encapsula la lógica del menu de acciones del AppBar
 * cuando se añade un Page con Action o SearchAction
 * estas acciones desaparecerán si la no es visible
 * haciendo que la nueva pagina no tenga los menus anteriores
 */
export declare class CoordinatePageComponent extends NavigationView {
    private _dataMenuDrawer;
    private _contentDrawer;
    onActionSelected?: any;
    onDrawerItemSelected?: any;
    static readonly events: string[];
    set contentDrawer(view: Widget);
    get contentDrawer(): Widget;
    set menuDrawer(menu: WidgetCollection<MenuItem>);
    get menuDrawer(): WidgetCollection<MenuItem>;
    constructor(props: any);
    private readonly _renderWidgetInDrawer;
    on(type: string, listener: (event: EventObject<NativeObject>) => any, context?: object): this;
    on(listeners: {
        [event: string]: (event: EventObject<NativeObject>) => void;
    }): this;
    protected _addChild(child: Widget): void;
    append(...widgets: TypeWidget): this;
}
/**
 * @description
 * encapsula en un proxy cuando se ejecute como funcion o instancia
 */
export declare const CoordinatePage: import("tabris").Constructor<CoordinatePageComponent>;
export {};
