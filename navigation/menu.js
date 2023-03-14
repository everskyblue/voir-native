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
exports.menuDrawer = void 0;
var tabris_1 = require("tabris");
var MenuItem = (function (_super) {
    __extends(MenuItem, _super);
    function MenuItem(id) {
        return _super.call(this, {
            id: id,
            top: tabris_1.Constraint.prev,
            right: 0,
            left: 0,
            height: 56,
            highlightOnTouch: true,
        }) || this;
    }
    return MenuItem;
}(tabris_1.Composite));
function menuDrawer(menu, eventSelectMenu) {
    var layoutMenu = (0, tabris_1.ScrollView)({
        id: "scrollableLayoutMenuDrawer",
        top: tabris_1.Constraint.prev,
        left: 0,
        right: 0,
        bottom: 0,
    }).append(Object.keys(menu).map(function (key) {
        var data = menu[key];
        var row = (0, tabris_1.Row)({
            layoutData: "stretch",
            alignment: "centerY",
        });
        if (!!data.image)
            row.append((0, tabris_1.ImageView)({
                image: data.image,
                width: 24,
                left: 28,
            }));
        var separatorLeft = !data.image ? 28 + 24 + 12 : 12;
        row.append((0, tabris_1.TextView)({
            text: data.text,
            font: "20px sans-serif",
            left: separatorLeft,
        }));
        return new MenuItem(data.id).append(row).onTap(function () {
            eventSelectMenu(this);
            setTimeout(function () { return tabris_1.drawer.close(); }, 100);
        });
    }));
    tabris_1.drawer.append(layoutMenu);
}
exports.menuDrawer = menuDrawer;
