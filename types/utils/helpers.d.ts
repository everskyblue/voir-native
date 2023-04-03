import type { CallbackInstance } from "./proxy";
import type { Composite } from "tabris";
export declare function createInstance<ClassType extends Composite>(props: any, $Class: CallbackInstance<ClassType>): ClassType;
