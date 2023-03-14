"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoordinatePage = exports.CoordinatePageComponent = void 0;
var tabris_1 = require("tabris");
var proxy_1 = require("../utils/proxy");
var ctxPages = new Map();
var CoordinatePageComponent = (function (_super) {
    __extends(CoordinatePageComponent, _super);
    function CoordinatePageComponent(props) {
        if (props === void 0) { props = {}; }
        var _this = _super.call(this, props) || this;
        _this.on("addChild", function (_a) {
            var child = _a.child;
            if (child instanceof tabris_1.Page) {
                ctxPages.set(child, {
                    hidden: false,
                    actions: null,
                    isDisposed: false,
                });
                child.on("appear", function () {
                    var info = ctxPages.get(child);
                    if (typeof info === "object" && info.hidden) {
                        if (info.actions !== null)
                            _this.append(info.actions);
                        info.hidden = false;
                    }
                    if (ctxPages.size === 1) {
                        setChangeEnabledDrawer(true);
                    }
                });
                child.on("disappear", function () {
                    var _a;
                    var info = ctxPages.get(child);
                    setChangeEnabledDrawer(false);
                    if (!info.hidden) {
                        info.hidden = true;
                        (_a = info.actions) === null || _a === void 0 ? void 0 : _a.forEach(function (action) { return action.detach(); });
                    }
                    if (info.isDisposed)
                        ctxPages.delete(child);
                });
                child.on("dispose", function () {
                    ctxPages.get(child).isDisposed = true;
                });
            }
        });
        function setChangeEnabledDrawer(enable) {
            if (props.drawerActionVisible)
                tabris_1.drawer.enabled = enable;
        }
        return _this;
    }
    CoordinatePageComponent.prototype.append = function () {
        var widgets = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            widgets[_i] = arguments[_i];
        }
        var sup = _super.prototype.append.apply(this, widgets);
        setTimeout(function () { return resolveParameter(widgets); }, 0);
        return sup;
    };
    return CoordinatePageComponent;
}(tabris_1.NavigationView));
exports.CoordinatePageComponent = CoordinatePageComponent;
function navigationController(widgets) {
    var page = widgets.find(function (widget) { return widget instanceof tabris_1.Page; });
    var actions = widgets.filter(function (widget) {
        return widget instanceof tabris_1.Action || widget instanceof tabris_1.SearchAction;
    });
    var info = ctxPages.get(page);
    if (page && actions.length && info.actions === null) {
        info.actions = actions;
    }
}
function resolveParameter($widgets) {
    var widgets = $widgets.length > 1
        ? $widgets
        : Array.isArray($widgets[0])
            ? $widgets.shift()
            : $widgets;
    if (widgets.some(function (widget) { return Array.isArray(widget); }))
        throw new Error("error parameter");
    if (Array.isArray(widgets) && widgets.length > 0)
        navigationController(widgets);
}
function ProxyCoordinatePage(props) {
    if (props === void 0) { props = {}; }
    return new CoordinatePageComponent(props);
}
exports.CoordinatePage = (0, proxy_1.createProxies)(ProxyCoordinatePage, resolveParameter);
