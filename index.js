"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoordinatePageComponent = exports.CoordinatePage = exports.menuDrawer = void 0;
var tabris_1 = require("tabris");
var navigation;
tabris_1.contentView.on("addChild", function (_a) {
    var child = _a.child;
    if (child instanceof tabris_1.NavigationView && !navigation) {
        navigation = child;
    }
});
function addView() {
    var widgets = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        widgets[_i] = arguments[_i];
    }
    return navigation.append.apply(navigation, widgets);
}
exports.default = addView;
var menu_1 = require("./navigation/menu");
Object.defineProperty(exports, "menuDrawer", { enumerable: true, get: function () { return menu_1.menuDrawer; } });
var CoordinatePage_1 = require("./navigation/CoordinatePage");
Object.defineProperty(exports, "CoordinatePage", { enumerable: true, get: function () { return CoordinatePage_1.CoordinatePage; } });
Object.defineProperty(exports, "CoordinatePageComponent", { enumerable: true, get: function () { return CoordinatePage_1.CoordinatePageComponent; } });
