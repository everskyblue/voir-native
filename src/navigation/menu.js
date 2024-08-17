import {
    TextView,
    ImageView,
    Composite,
    ScrollView,
    WidgetCollection
} from "tabris";
import { drawer, Row, isVersion2 } from "../support";

export class MenuAction extends Composite {
    constructor(id) {
        super({
            id,
            top: 'prev()',
            right: 0,
            left: 0,
            height: 56,
            highlightOnTouch: true,
        });
    }
}

export class MenuItem extends Row {
    constructor(props) {
        
        super({//@ts-ignore
            layoutData: "stretch",
            alignment: "centerY",
        });
        
        this.id = props.id;
        this._setElements(props.image, props.text);
    }

    _setElements(img, text) {
        const refImage = 'voir-img-ref-' + this.id;
        const refText = 'voir-text-ref-' + this.id;
        
        if (img) this.append(new ImageView({
            image: img,
            width: 24,
            left: 28,
            id: refImage
        }))
        
        const separatorLeft = !img ? 28 + 24 + 12 : 12;
        
        this.append(new TextView({
            text: text,
            font: "20px sans-serif",
            left: separatorLeft,
            id: refText
        }))
    }

    text
    image
}

/**
 * @version 0.4
 */
export const DrawerMenuItem = MenuItem;

/**
 * @version 0.4
 * contenedor para DrawerMenuItem
 */
export const DrawerMenu = ({ children }, _children) => {
    return new WidgetCollection(children??_children);
}

/**
 * @deprecated 
 * emite un warning desde la version 0.4
 */
export const menuDrawer = (menus, eventSelectMenu) => {
    console.warn('deprecated function [menuDrawer] use setMenuDrawer');
    setMenuDrawer(menus, eventSelectMenu);
}

function getScrollLayoutDrawer() {
    const scrollLayout = drawer.find('#scrollableLayoutMenuDrawer');

    const layoutMenu = (scrollLayout.length !== 0 ? scrollLayout.first() : new ScrollView({
        id: "scrollableLayoutMenuDrawer",
        top: 'prev()',
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
export function setMenuDrawer(menus, eventSelectMenu) {
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
            ).on('tap', function () {
                if (typeof eventSelectMenu === 'function') eventSelectMenu(this);
                const id = setTimeout(() => (drawer.close(), clearTimeout(id)), 100);
            });
        })
    );
}

/**
 * @version 0.4
 */
export function setContentDrawer(view) {
    const scrollLayout = getScrollLayoutDrawer();
    const findContent = drawer.find('#voirContentDrawer');
    const content = findContent.length === 0 ? new Composite({
        top: 'prev() 15',
        left: 0,
        right: 0,
        id: 'voirContentDrawer',
        padding: 8
    }).append(view)
        : findContent.first().append(view);
    if (findContent.length === 0) scrollLayout.append(content);
}