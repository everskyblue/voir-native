import {
    type AnyWidget,
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

/**
 * @version 0.4
 * no posee hijos y su padre es DrawerMenu
 */
export const DrawerMenuItem = (props: IMenuItemOption) => {
    return ()=> props;
}

/**
 * @version 0.4
 * contenedor para DrawerMenuItem
 */
export const DrawerMenu = ({children}: {children: ReturnType<typeof DrawerMenuItem>[]}) => {
    return ()=> {
        const props: IMenuItemOption[] = [];
        for (const child of children) {
            if (typeof child === 'function') props.push(child());
        }
        return props;
    };
}

export type { MenuItemOf };

/**
 * @deprecated 
 * emite un warning desde la version 0.4
 */
export const menuDrawer = (
    menus: IMenuItemOption[],
    eventSelectMenu: (menu: MenuItem) => void
) => {
    console.warn('deprecated function [menuDrawer] use setMenuDrawer');
    setMenuDrawer(menus, eventSelectMenu);
}

function getScrollLayoutDrawer() {
    const scrollLayout = drawer.find('#scrollableLayoutMenuDrawer');
    
    const layoutMenu = (scrollLayout.length !== 0 ? scrollLayout.only() as ScrollView : ScrollView({
        id: "scrollableLayoutMenuDrawer",
        top: Constraint.prev,
        left: 0,
        right: 0,
        bottom: 0,
    }));

    if (scrollLayout.length === 0) drawer.append(layoutMenu);
    
    return layoutMenu;
}

/**
 * @version 0.4
 */
export function setMenuDrawer(
    menus: IMenuItemOption[],
    eventSelectMenu: (menu: MenuItem) => void
) {
    const scrollLayout = getScrollLayoutDrawer().append(
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
}

/**
 * @version 0.4
 */
export function setContentDrawer(view: AnyWidget) {
    const scrollLayout = getScrollLayoutDrawer();
    const findContent = drawer.find('#voirContentDrawer');
    const content = findContent.length === 0 ? Composite({
            top: [Constraint.prev, 15],
            left: 0,
            right: 0,
            id: 'voirContentDrawer',
            padding: 8
        }).append(view)
        : findContent.only().append(view);
    if (findContent.length === 0) scrollLayout.append(content);
 }