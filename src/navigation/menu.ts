import {
    drawer,
    Constraint,
    TextView,
    ImageView,
    Row,
    Composite,
    ScrollView,
} from "tabris";

type MenuItemOf = MenuItem;

type MenuOption = {
    [key: string]: IMenuItemOption;
};

interface IMenuItemOption {
    id: string;
    text: string;
    image?: string;
}

class MenuItem extends Composite {
    constructor(id: string) {
        super({
            id,
            top: Constraint.prev,
            right: 0,
            left: 0,
            height: 56,
            highlightOnTouch: true,
        });
    }
}


export type { MenuItemOf };

export function menuDrawer(
    menu: MenuOption,
    eventSelectMenu: (menu: MenuItem) => void
) {
    const layoutMenu = ScrollView({
        id: "scrollableLayoutMenuDrawer",
        top: Constraint.prev,
        left: 0,
        right: 0,
        bottom: 0,
    }).append(
        (Object.keys(menu) as string[]).map((key: string) => {
            const data = menu[key];
            const row = Row({
                layoutData: "stretch",
                alignment: "centerY",
            });
            if (!!data.image)
                row.append(
                    ImageView({
                        image: data.image,
                        width: 24,
                        left: 28,
                    })
                );
            
            const separatorLeft = !data.image ? 28 + 24 + 12 : 12;
            
            row.append(
                TextView({
                    text: data.text,
                    font: "20px sans-serif",
                    left: separatorLeft,
                })
            );

            return new MenuItem(data.id).append(row).onTap(function () {
                eventSelectMenu(this as MenuItem);
                setTimeout(() => drawer.close(), 100);
            });
        })
    );

    drawer.append(layoutMenu);
}
