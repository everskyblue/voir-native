"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInstance = void 0;
function createInstance(props, $Class) {
    const children = props.children;
    delete props.children;
    const instance = new $Class(props);
    if (children)
        instance.append(children);
    return instance;
}
exports.createInstance = createInstance;
