"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoordinatePageComponent = exports.CoordinatePage = void 0;
const tabris_1 = require("tabris");
const ctxPages = new Map();
class CoordinatePageComponent extends tabris_1.NavigationView {
    constructor(props = {}) {
        super(props);
        this.on("addChild", ({ child }) => {
            if (child instanceof tabris_1.Page) {
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
                    if (info.isDisposed)
                        ctxPages.delete(child);
                });
                child.on("dispose", () => {
                    ctxPages.get(child).isDisposed = true;
                });
            }
        });
        function setChangeEnabledDrawer(enable) {
            if (props.drawerActionVisible)
                tabris_1.drawer.enabled = enable;
        }
    }
    append(...widgets) {
        const sup = super.append(...widgets);
        setTimeout(() => resolveParameter(widgets), 0);
        return sup;
    }
}
exports.CoordinatePageComponent = CoordinatePageComponent;
function navigationController(widgets) {
    const page = widgets.find((widget) => widget instanceof tabris_1.Page);
    const actions = widgets.filter((widget) => widget instanceof tabris_1.Action || widget instanceof tabris_1.SearchAction);
    const info = ctxPages.get(page);
    if (page && actions.length && info.actions === null) {
        info.actions = actions;
    }
}
function resolveParameter($widgets) {
    let widgets = $widgets.length > 1
        ? $widgets
        : Array.isArray($widgets[0])
            ? $widgets.shift()
            : $widgets;
    if (widgets.some((widget) => Array.isArray(widget)))
        throw new Error("error parameter");
    if (Array.isArray(widgets) && widgets.length > 0)
        navigationController(widgets);
}
function ProxyCoordinatePage(props = {}) {
    return new CoordinatePageComponent(props);
}
const CoordinatePage = new Proxy(ProxyCoordinatePage, {
    construct($ProxyCoordinatePage, args) {
        return new Proxy($ProxyCoordinatePage(args[0]), {
            get(coordinatePage, prop) {
                if (prop === "append") {
                    return (...widgets) => (coordinatePage.append(...widgets),
                        resolveParameter(widgets),
                        coordinatePage);
                }
                return typeof coordinatePage[prop] === "function"
                    ? coordinatePage[prop].bind(coordinatePage)
                    : coordinatePage[prop];
            },
            set(coordinatePage, prop, value) {
                coordinatePage[prop] = value;
                return true;
            },
        });
    },
    apply() {
        return new CoordinatePage(arguments[2][1]);
    },
});
exports.CoordinatePage = CoordinatePage;
