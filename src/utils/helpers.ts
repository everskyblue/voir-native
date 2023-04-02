import type { CallbackInstance } from "./proxy";
import type { Composite } from "tabris";

export function createInstance<ClassType extends Composite>(
    props: any,
    $Class: CallbackInstance<ClassType>
): ClassType {
    const children = props.children;

    delete props.children;

    const instance = new $Class(props);

    if (children) instance.append(children);

    return instance;
}
