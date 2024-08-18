import * as tabris from "tabris";

export declare const isVersion2: boolean;
export declare const contentView: tabris.ContentView;
export declare const stretch: {
    left: number;
    right: number;
    top: number;
    bottom: number;
};
export declare const stretchY: {
    top: number;
    bottom: number;
};
export declare const stretchX: {
    right: number;
    left: number;
};
export declare const layoutData: {
    stretch: typeof stretch,
    stretchX: typeof stretchX;
    stretchY: typeof stretchY;
    centerX: number | boolean;
    centerY: number | boolean;
};

export declare const Action: typeof tabris.Action | ((props?: any) => typeof tabris.Action);

declare class RowMake extends tabris.Composite {
    get alignment(): string
    set alignment(value: string);
    //@ts-ignore
    layoutData: 'center' | keyof typeof layoutData;
}

export declare const Row: typeof RowMake | typeof tabris.Row;

export declare const Listeners: {
    new (target: tabris.Widget, event: string): {
        addListener(handler: (event: any)=> typeof Listeners): void;
        trigger(eventObject: any): typeof Listeners;
    };
} | typeof tabris.Listeners;

export declare const LayoutData: typeof tabris.LayoutData | {
    new (): {};
};

export const statusBar = tabris.statusBar //| typeof tabris.ui.statusBar;
