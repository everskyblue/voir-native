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

export interface IMenuItemOption {
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

export const DrawerMenuItem = (props: IMenuItemOption) => {
    return ()=> props;
}

export const DrawerMenu = ({children}: any) => {
    return ()=> {
        const props: IMenuItemOption[] = [];
        for (const child of children) {
            if (typeof child === 'function') props.push(child());
        }
        return props;
    };
}

export type { MenuItemOf };

export const menuDrawer = (
    menus: IMenuItemOption[],
    eventSelectMenu: (menu: MenuItem) => void
) => {
    console.warn('deprecated function [menuDrawer] use setMenuDrawer');
    setMenuDrawer(menus, eventSelectMenu);
}

export function setMenuDrawer(
    menus: IMenuItemOption[],
    eventSelectMenu: (menu: MenuItem) => void
) {
    const scrollLayout = drawer.find('#scrollableLayoutMenuDrawer');
    const layoutMenu = (scrollLayout.length !== 0 ? scrollLayout.only() as ScrollView : ScrollView({
        id: "scrollableLayoutMenuDrawer",
        top: Constraint.prev,
        left: 0,
        right: 0,
        bottom: 0,
    })).append(
        menus.map((data: IMenuItemOption) => {
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
    
    if (scrollLayout.length === 0) drawer.append(layoutMenu);
}
