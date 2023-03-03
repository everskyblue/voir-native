import { NavigationView, drawer, Page, Action, SearchAction } from "tabris";
import type { Properties, CompositeAddChildEvent } from "tabris";

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
class CoordinatePageComponent extends NavigationView {
    constructor(props: Properties<NavigationView> = {}) {
        super(props);
        this.on(
            "addChild",
            ({ child }: CompositeAddChildEvent<CoordinatePageComponent>) => {
                if (child instanceof Page) {
                    ctxPages.set(child, {
                        hidden: false,
                        actions: null,
                        isDisposed: false,
                    });

                    child.on("appear", () => {
                        const info = ctxPages.get(child);
                        if (typeof info === "object" && info.hidden) {
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
                            info.actions.forEach((action) => action.detach());
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
            if (props.drawerActionVisible) drawer.enabled = enable;
        }
    }

    append(...widgets: TypeWidget) {
        const sup = super.append(...widgets);
        setTimeout(() => resolveParameter(widgets), 0);
        return sup;
    }

    navigationController(widgets: TypeWidget) {
        const page: Page = widgets.find(
            (widget: TypeChild) => widget instanceof Page
        );

        const actions = widgets.filter(
            (widget: TypeChild) =>
                widget instanceof Action || widget instanceof SearchAction
        );

        const info = ctxPages.get(page);

        if (page && actions.length && info.actions === null) {
            info.actions = actions;
        }
    }

    resolveParameter($widgets: TypeWidget) {
        let widgets =
            $widgets.length > 1
                ? $widgets
                : Array.isArray($widgets[0])
                ? $widgets.shift()
                : $widgets;
        if (widgets.some((widget: TypeChild) => Array.isArray(widget)))
            throw new Error("error parameter");
        if (Array.isArray(widgets) && widgets.length > 0)
            this.navigationController(widgets);
    }
}

function navigationController(widgets: TypeWidget) {
    const page: Page = widgets.find(
        (widget: TypeChild) => widget instanceof Page
    );

    const actions = widgets.filter(
        (widget: TypeChild) =>
            widget instanceof Action || widget instanceof SearchAction
    );

    const info = ctxPages.get(page);

    if (page && actions.length && info.actions === null) {
        info.actions = actions;
    }
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
        navigationController(widgets);
}

function ProxyCoordinatePage(
    props: Properties<NavigationView>
): CoordinatePageComponent {
    return new CoordinatePageComponent(props);
}

/**
 * @description
 * encapsula en un proxy cuando se ejecute como funcion o instancia
 */
const CoordinatePage: typeof ProxyCoordinatePage = new Proxy(
    ProxyCoordinatePage,
    {
        construct(
            $ProxyCoordinatePage: typeof ProxyCoordinatePage,
            args: any[]
        ): CoordinatePageComponent {
            return new Proxy($ProxyCoordinatePage(args[0]), {
                get(coordinatePage, prop: keyof CoordinatePageComponent) {
                    if (prop === "append") {
                        return (...widgets: any[]) => (
                            coordinatePage.append(...widgets),
                            resolveParameter(widgets),
                            coordinatePage
                        );
                    }
                    return typeof coordinatePage[prop] === "function"
                        ? coordinatePage[prop].bind(coordinatePage)
                        : coordinatePage[prop];
                },
                set(coordinatePage, prop: string, value: any) {
                    //@ts-ignore
                    coordinatePage[prop] = value;
                    return true;
                },
            });
        },
        apply() {
            //@ts-ignore
            return new CoordinatePage(
                arguments[2][1] as Properties<NavigationView>
            );
        },
    }
);

export { CoordinatePage, CoordinatePageComponent };
