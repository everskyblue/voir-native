import {
    type Widget,
    WidgetCollection,
    drawer,
    Constraint,
    TextView,
    ImageView,
    Row,
    Composite,
    ScrollView,
} from "tabris";

export type MenuItemOf = MenuItem;

export type MenuOption = {
    [key: string]: MenuItemOption;
};

export interface MenuItemOption {
    id: string;
    text: string;
    image?: string;
}

export class MenuAction extends Composite {
    constructor(id?: string) {
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

export class MenuItem extends Row {
    constructor(props: any) {
        super({
            layoutData: "stretch",
            alignment: "centerY",
        });
        this.id = props.id;
        this._setElements(props.image, props.text);
    }

    _setElements(img: any, text: string) {
        const refImage = 'voir-img-ref-' + this.id;
        const refText = 'voir-text-ref-' + this.id;
        
        if (img) this.append(ImageView({
            image: img,
            width: 24,
            left: 28,
            id: refImage
        }))
        
        const separatorLeft = !img ? 28 + 24 + 12 : 12;
        
        this.append(TextView({
            text: text,
            font: "20px sans-serif",
            left: separatorLeft,
            id: refText
        }))
    }

    text: string
    image: any
}

/**
 * @version 0.4
 */
export const DrawerMenuItem = MenuItem;

/**
 * @version 0.4
 * contenedor para DrawerMenuItem
 */
export const DrawerMenu = ({ children }: { children: Widget<typeof DrawerMenuItem>[] }) => {
    return new WidgetCollection(children);
}

/**
 * @deprecated 
 * emite un warning desde la version 0.4
 */
export const menuDrawer = (
    menus: MenuItemOption[] | WidgetCollection<MenuItem>,
    eventSelectMenu: (menu: MenuAction) => void
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
    menus: MenuItemOption[] | WidgetCollection<MenuItem>,
    eventSelectMenu?: (menu: MenuAction) => void
) {
    getScrollLayoutDrawer().append(
        menus.map(data => {
            const isObject = data instanceof MenuItem;
            const id = data.id;
            if (isObject) data.id = '';
            return new MenuAction(id).append(
                isObject ? data : new MenuItem({
                    image: data.image,
                    text: data.text
                })
            ).onTap(function () {
                if (typeof eventSelectMenu === 'function') eventSelectMenu(this);
                const id = setTimeout(() => (drawer.close(), clearTimeout(id)), 100);
            });
        })
    );
}

/**
 * @version 0.4
 */
export function setContentDrawer(view: Widget) {
    const scrollLayout = getScrollLayoutDrawer();
    const findContent: WidgetCollection<Composite> = drawer.find('#voirContentDrawer');
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