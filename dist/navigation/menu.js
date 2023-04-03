"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuDrawer = void 0;
const tabris_1 = require("tabris");
class MenuItem extends tabris_1.Composite {
    constructor(id) {
        super({
            id,
            top: tabris_1.Constraint.prev,
            right: 0,
            left: 0,
            height: 56,
            highlightOnTouch: true,
        });
    }
}
function menuDrawer(menus, eventSelectMenu) {
    const layoutMenu = (0, tabris_1.ScrollView)({
        id: "scrollableLayoutMenuDrawer",
        top: tabris_1.Constraint.prev,
        left: 0,
        right: 0,
        bottom: 0,
    }).append(menus.map((data) => {
        const row = (0, tabris_1.Row)({
            layoutData: "stretch",
            alignment: "centerY",
        });
        if (!!data.image)
            row.append((0, tabris_1.ImageView)({
                image: data.image,
                width: 24,
                left: 28,
            }));
        const separatorLeft = !data.image ? 28 + 24 + 12 : 12;
        row.append((0, tabris_1.TextView)({
            text: data.text,
            font: "20px sans-serif",
            left: separatorLeft,
        }));
        return new MenuItem(data.id).append(row).onTap(function () {
            eventSelectMenu(this);
            setTimeout(() => tabris_1.drawer.close(), 100);
        });
    }));
    tabris_1.drawer.append(layoutMenu);
}
exports.menuDrawer = menuDrawer;
