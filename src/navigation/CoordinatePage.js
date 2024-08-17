import {
    NavigationView,
    Page,
    SearchAction,
    NativeObject,
    WidgetCollection,
    Action
} from "tabris";
import { drawer, Listeners } from "../support";
import { createProxies } from "../utils/proxy";
import { createInstance } from "../utils/helpers";
import { customEvent } from "../utils/custom-events";
import { setMenuDrawer, setContentDrawer, MenuItem, MenuAction } from "./menu";


/**
 * guarda el contexto de pagina
 */
const ctxPages = new Map();

/**
 * @description
 * utilizar en JSX <CoordinatePageComponent></CoordinatePageComponent>
 * encapsula la lógica del menu de acciones del AppBar
 * cuando se añade un Page con Action o SearchAction
 * estas acciones desaparecerán si la no es visible
 * haciendo que la nueva pagina no tenga los menus anteriores
 */
export class CoordinatePageComponent extends NavigationView {
    onActionSelected;
    onDrawerItemSelected;

    static events = ['actionSelected', 'drawerItemSelected'];

    set contentDrawer(view) {
        this._contentDrawer = view;
    }

    get contentDrawer() {
        return this._contentDrawer ?? new WidgetCollection();
    }

    set menuDrawer(menu) {
        this._dataMenuDrawer = menu.toArray();
    }

    get menuDrawer() {
        return this._dataMenuDrawer ?? [];
    }

    constructor(props) {
        super(props);
        this.$actions = [];
    }

    _renderWidgetInDrawer = (() => {
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

    on(type, listener, context) {
        if (typeof type === 'string' && CoordinatePageComponent.events.includes(type)) {
            customEvent.addListener(this, type, listener);
        }
        return super.on(type, listener, context);
    }

    _addChild(child) {
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
                //console.log(this.children(Action).toArray().length)
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

        const setChangeEnabledDrawer = (enable) => {
            if (this?.drawerActionVisible) drawer.enabled = enable;
        }

        //@ts-ignore
        return typeof super._addChild==='function' ?  super._addChild(child) : this;
    }

    append(...widgets) {
        const sup = super.append(...widgets);
        setTimeout(() => resolveParameter(widgets), 0);
        return sup;
    }
}

function fillExecAction(widgets) {
    const page = widgets.find(
        (widget) => widget instanceof Page
    );

    const actions = widgets.filter(
        (widget) => {
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

function resolveParameter($widgets) {
    let widgets =
        $widgets.length > 1
            ? $widgets
            : Array.isArray($widgets[0])
                ? $widgets.shift()
                : $widgets;
    if (widgets.some((widget) => Array.isArray(widget)))
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