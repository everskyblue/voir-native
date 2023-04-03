import { NavigationView, Properties as PropertiesTabris } from "tabris";
type TypeWidget = any[] | Array<any[]>;
/**
 * @description
 * utilizar en JSX <CoordinatePageComponent></CoordinatePageComponent>
 * encapsula la logica del menu de acciones del AppBar
 * cuando se añade un Page con Action o SearchAction
 * estas acciones desapareceran si la no es visible
 * haciendo que la nueva pagina no tenga los menus anteriores
 */
export declare class CoordinatePageComponent extends NavigationView {
    constructor(props: PropertiesTabris<CoordinatePageComponent>);
    append(...widgets: TypeWidget): this;
}
/**
 * @description
 * encapsula en un proxy cuando se ejecute como funcion o instancia
 */
export declare const CoordinatePage: import("../utils/proxy").Callback<CoordinatePageComponent>;
export {};
