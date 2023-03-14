"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoordinatePage = exports.CoordinatePageComponent = void 0;
const tabris_1 = require("tabris");
const proxy_1 = require("../utils/proxy");
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
                        if (info.actions !== null)
                            this.append(info.actions);
                        info.hidden = false;
                    }
                    if (ctxPages.size === 1) {
                        setChangeEnabledDrawer(true);
                    }
                });
                child.on("disappear", () => {
                    var _a;
                    const info = ctxPages.get(child);
                    setChangeEnabledDrawer(false);
                    if (!info.hidden) {
                        info.hidden = true;
                        (_a = info.actions) === null || _a === void 0 ? void 0 : _a.forEach((action) => action.detach());
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
exports.CoordinatePage = (0, proxy_1.createProxies)(ProxyCoordinatePage, resolveParameter);
