import {
    type EventObject,
    type AnyWidget,
    type WidgetCollection,
    NavigationView,
    drawer,
    Page,
    Action,
    Properties as PropertiesTabris,
    SearchAction,
    CompositeAddChildEvent,
    Widget,
    NativeObject,
    Properties,
    Listeners
} from "tabris";
import { createProxies } from "../utils/proxy";
import { createInstance } from "../utils/helpers";
import { customEvent } from "../utils/custom-events";
import { type MenuItemOption, type MenuItemOf, setMenuDrawer, setContentDrawer, MenuItem, MenuAction } from "./menu";

type FirstExecAction = {
    actions: Array<Action | SearchAction> | null;
    hidden: boolean;
    isDisposed: boolean;
};

type TypeChild = Action | SearchAction | Page;

type TypeWidget = any[] | Array<any[]>;

/**
 * guarda el contexto de pagina
 */
const ctxPages = new Map<Page, FirstExecAction>();

/**
 * @description
 * utilizar en JSX <CoordinatePageComponent></CoordinatePageComponent>
 * encapsula la lógica del menu de acciones del AppBar
 * cuando se añade un Page con Action o SearchAction
 * estas acciones desaparecerán si la no es visible
 * haciendo que la nueva pagina no tenga los menus anteriores
 */
export class CoordinatePageComponent extends NavigationView {
    private _dataMenuDrawer!: any;
    private _contentDrawer!: any;
    onActionSelected?: any;
    onDrawerItemSelected?: any;

    static readonly events = ['actionSelected', 'drawerItemSelected'];

    set contentDrawer(view: Widget) {
        this._contentDrawer = view;
    }

    get contentDrawer() {
        return this._contentDrawer;
    }

    set menuDrawer(menu: WidgetCollection<MenuItem>) {
        this._dataMenuDrawer = menu.toArray();
    }

    get menuDrawer(): WidgetCollection<MenuItem> {
        return this._dataMenuDrawer;
    }

    constructor(props: any) {
        super(props);
    }

    private readonly _renderWidgetInDrawer = (() => {
        let isAdd = false;
        return () => {
            if (isAdd) return;
            isAdd = true;
            const handler = () => {
                setMenuDrawer(this.menuDrawer);
                setContentDrawer(this.contentDrawer);
                this.menuDrawer.forEach(item => {
                    customEvent.listener(this, item.parent());
                });
            }
            if (this.drawerActionVisible) handler();
        }
    })();

    on(type: string, listener: (event: EventObject<NativeObject>) => any, context?: object): this;
    on(listeners: { [event: string]: (event: EventObject<NativeObject>) => void; }): this;
    on(type: any, listener?: any, context?: any): this {
        if (typeof type === 'string' && CoordinatePageComponent.events.includes(type)) {
            customEvent.addListener(this, type, listener);
        }
        return super.on(type, listener, context);
    }

    protected _addChild(child: Widget): void {
        customEvent.listener(this, child);
        if (child instanceof Page) {
            ctxPages.set(child, {
                hidden: false,
                actions: null,
                isDisposed: false,
            });

            child.on("appear", () => {
                this._renderWidgetInDrawer();
                const info = ctxPages.get(child);
                if (typeof info === "object" && info.hidden) {
                    if (info.actions !== null)
                        this.append(info.actions);
                    info.hidden = false;
                }
                if (ctxPages.size === 1) {
                    setChangeEnabledDrawer(true);
                }
            });

            child.on("disappear", () => {
                const info = ctxPages.get(child);
                setChangeEnabledDrawer(false);
                if (!info.hidden) {
                    info.hidden = true;
                    info.actions?.forEach((action) => action.detach());
                }

                if (info.isDisposed) ctxPages.delete(child);
            });

            child.on("dispose", () => {
                ctxPages.get(child).isDisposed = true;
            });
        }

        const setChangeEnabledDrawer = (enable: boolean) => {
            if (this?.drawerActionVisible) drawer.enabled = enable;
        }

        return super._addChild(child);
    }

    append(...widgets: TypeWidget) {
        const sup = super.append(...widgets);
        setTimeout(() => resolveParameter(widgets), 0);
        return sup;
    }
}

function fillExecAction(widgets: TypeWidget) {
    const page: Page = widgets.find(
        (widget: TypeChild) => widget instanceof Page
    );

    const actions = widgets.filter(
        (widget: TypeChild) => {
            if (widget instanceof Action || widget instanceof SearchAction) {
                return widget.data.voirInitializedEvent = true;
            }
            return false;
        }
    );

    const info = ctxPages.get(page);

    if (page && actions.length && info.actions === null) {
        info.actions = actions;
    }

    return info;
}

function resolveParameter($widgets: TypeWidget) {
    let widgets =
        $widgets.length > 1
            ? $widgets
            : Array.isArray($widgets[0])
                ? $widgets.shift()
                : $widgets;
    if (widgets.some((widget: TypeChild) => Array.isArray(widget)))
        throw new Error("error parameter");
    if (Array.isArray(widgets) && widgets.length > 0)
        return fillExecAction(widgets);
}

customEvent(CoordinatePageComponent, {
    instanceOf: [{
        element: Action,
        listeners: ['select'],
        invoke: ['actionSelected']
    }, {
        element: SearchAction,
        listeners: ['select'],
        invoke: ['actionSelected']
    }, {
        element: MenuAction,
        listeners: ['tap'],
        invoke: ['drawerItemSelected']
    }],
    nameEvents: ['actionSelected', 'drawerItemSelected']
})

/**
 * @description
 * encapsula en un proxy cuando se ejecute como funcion o instancia
 */
export const CoordinatePage = createProxies(
    CoordinatePageComponent
);