import {
    type EventObject,
    type AnyWidget,
    NavigationView,
    drawer,
    Page,
    Action,
    Properties as PropertiesTabris,
    SearchAction,
    CompositeAddChildEvent
} from "tabris";
import { createProxies } from "../utils/proxy";
import { createInstance } from "../utils/helpers";
import { type IMenuItemOption, type Widget, setMenuDrawer, setContentDrawer } from "./menu";

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
 * encapsula la logica del menu de acciones del AppBar
 * cuando se añade un Page con Action o SearchAction
 * estas acciones desapareceran si la no es visible
 * haciendo que la nueva pagina no tenga los menus anteriores
 */
export class CoordinatePageComponent extends NavigationView {
    private _onActionSelect!: any;
    private _onDrawerItemSelected!: any;
    private _dataMenuDrawer!: any;
    private _contentDrawer!: any;
    
    set contentDrawer(view: AnyWidget) {
        this._contentDrawer = view;
    }
    
    get contentDrawer() {
       return this._contentDrawer;
    }

    set onActionSelect(event: (id: string, itemAction: Action) => void) {
        this._onActionSelect = event;
    }

    get onActionSelect() {
        return this._onActionSelect;
    }

    set menuDrawer(menu: ()=> IMenuItemOption[]) {
        this._dataMenuDrawer = menu();
    }

    get menuDrawer() {
        return this._dataMenuDrawer;
    }

    set onDrawerItemSelected(event: (id: string, itemAction: Action) => void) {
        this._onDrawerItemSelected = event;
    }

    get onDrawerItemSelected() {
        return this._onDrawerItemSelected;
    }
    
    private _render() {
        if (this.menuDrawer.length > 0) setMenuDrawer(this.menuDrawer, this.onDrawerItemSelected);
        if (this._contentDrawer) setContentDrawer(this._contentDrawer);
    }

    constructor(props: PropertiesTabris<CoordinatePageComponent>) {
        super(props);
        
        if (props.drawerActionVisible) {
            this._render();
        }
        
        /**
         * @INFO
         * ARREGLAR UN ERROR QUE SE GENERA CUANDO addView
         * SE LLAMA VARIAS VECES AL AÑADIR ELEMENTOS
         * EJEMPLO: addView(<Page />) addView(<Action />)
         * ESTO PROVOCA NO OBTENER CORRECTAMENTE EL Action y SearchAction
         */
        this.on(
            "addChild",
            ({ child }: CompositeAddChildEvent<CoordinatePageComponent>) => {
                if (child instanceof Action && this._onActionSelect && !child.data.voirInitalizedEvent) {
                    child.onSelect(({ target }: EventObject<Action>) => this._onActionSelect(target));
                }
                
                if (child instanceof Page) {
                    ctxPages.set(child, {
                        hidden: false,
                        actions: null,
                        isDisposed: false,
                    });
                    
                    child.on("appear", () => {
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
            }
        );

        function setChangeEnabledDrawer(enable: boolean) {
            if (props?.drawerActionVisible) drawer.enabled = enable;
        }
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
                return widget.data.voirInitalizedEvent = true;
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

function ProxyCoordinatePage(
    props: PropertiesTabris<CoordinatePageComponent>
): CoordinatePageComponent {
    return createInstance<CoordinatePageComponent>(
        props,
        CoordinatePageComponent
    );
}

/**
 * @description
 * encapsula en un proxy cuando se ejecute como funcion o instancia
 */
export const CoordinatePage = createProxies<CoordinatePageComponent>(
    ProxyCoordinatePage,
    resolveParameter
);