import tabris from "tabris";
import defineProperty from "../utils/define-property";

const version = tabris.version.toString();
export const isVersion2 = /(2\.9)\.*/.test(version);
const isVersion3 = Number(version[0]) >= 3;

if (!isVersion3 || !isVersion2) {
    //throw new Error(`tabris ${version} not support`)
}

console.log(version,isVersion2,isVersion3)

export const contentView = isVersion2 ? tabris.ui.contentView : tabris.contentView;

if (!isVersion2) {
    contentView.on = () => {
        console.log("on app")
    }
}

if (isVersion2) {
    global.$ = function $(props, children) {
        if (!children) {
            return contentView.find(props);
        }
        return new tabris.WidgetCollection(children);
    };
    const gestures = Object.keys(tabris.Widget.prototype.gestures);
    gestures.forEach(gesture => {
        const name = 'on' + gesture.toCapitalize();
        Object.defineProperty(tabris.Widget.prototype, name, {
            value: function (fn) {
                return this.on(gesture, fn);
            }
        })
    })
    
    const { Action, SearchAction, CheckBox, Switch } = tabris;
  //  [Action, SearchAction, CheckBox, Switch].forEach(widget => {
        Object.defineProperty(tabris.Widget.prototype, 'onSelect', {
            get(){
                return (fn)=> this.on('select', fn);
            }
        })
   // })
}

export const stretch = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
}

export const stretchY = {
    top: 0,
    bottom: 0
}

export const stretchX = {
    right: 0,
    left: 0
}

export const layoutData = {
    stretch,
    stretchX,
    stretchY,
    centerX: isVersion2 ? 0 : true,
    centerY: isVersion2 ? 0 : true
}

Object.defineProperty(tabris.Widget.prototype, 'stretch', {
    set(val) {
        this.layoutData = stretch;
        return true;
    },
    get() {
        return this.layoutData;
    }
})

Object.defineProperty(tabris.Widget.prototype, 'stretchX', {
    set(val) {
        this.layoutData = stretchX;
        return true;
    },
    get() {
        return this.layoutData;
    }
})

Object.defineProperty(tabris.Widget.prototype, 'stretchY', {
    set(val) {
        this.layoutData = stretchY;
        return true;
    },
    get() {
        return this.layoutData;
    }
})

export const statusBar = isVersion2 ? tabris.ui.statusBar : tabris.statusBar;

export const navigationBar = isVersion2 ? tabris.ui.navigationBar : tabris.navigationBar;

export const drawer = isVersion2 ? tabris.ui.drawer : tabris.drawer;

export const Action = isVersion2 ?
    function Action(props = {}) {
        const v2ActionProps = {
            placementPriority: ['low', 'high', 'normal']
        }

        if ('placement' in props) {
            props.placementPriority =
                props.placement === 'overflow'
                    ? 'low'
                    : props.placement === 'default'
                        ? 'normal'
                        : 'high'
            delete props.placement;
        }

        if ('placementChanged' in props) {
            props.placementPriorityChanged = props.placementChanged;
            delete props.placementChanged;
        }
        
        return new tabris.Action(props);
    } : tabris.Action;

export const Row = isVersion2 ?
    class Row extends tabris.Composite {
        _initPrevent = false;
        
        get alignment() {
            return "alignment"
        }
        
        set alignment(val) {
            this._alignment = val;
           // Object.assign(this, layoutData[val]);
        }
        
        set layoutData(val) {
            super.layoutData = layoutData[val];
        }
        
        constructor(props){
            super(props)
        }
        
        _addChild(child) {
            child.left = `prev() ${child.left??0}`;
            child[this._alignment] = 0;
            return super._addChild(child)
        }
        
        append(...childs) {
            return super.append(...childs);
        }
    } : tabris.Row;

export const Listeners = isVersion2 ? class VListeners {
    constructor(target, event){
        this.target = target;
        this.event = event;
    }
    
    addListener(handler) {
        this.target.on(this.event, handler);
    }
} : tabris.Listeners;

export const LayoutData = isVersion2 ? class LayoutData {
    constructor(){
        
    }
} : tabris.LayoutData;

/*
class WigetCollection extends WidgetCollectionTabris {
    constructor(arrVal) {
        super(arrVal);
    }

    set(key, val) {
        super.set({ [key]: val });
    }

    get(val) {
        return this.first()[val];
    }
}
*/