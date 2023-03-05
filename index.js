"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoordinatePageComponent = exports.CoordinatePage = exports.menuDrawer = void 0;
const tabris_1 = require("tabris");
let navigation;
tabris_1.contentView.on("addChild", ({ child }) => {
    if (child instanceof tabris_1.NavigationView && !navigation) {
        navigation = child;
    }
});
function addView(...widgets) {
    return navigation.append(...widgets);
}
exports.default = addView;
var menu_1 = require("./navigation/menu");
Object.defineProperty(exports, "menuDrawer", { enumerable: true, get: function () { return menu_1.menuDrawer; } });
var coordinate_page_1 = require("./navigation/coordinate-page");
Object.defineProperty(exports, "CoordinatePage", { enumerable: true, get: function () { return coordinate_page_1.CoordinatePage; } });
Object.defineProperty(exports, "CoordinatePageComponent", { enumerable: true, get: function () { return coordinate_page_1.CoordinatePageComponent; } });
