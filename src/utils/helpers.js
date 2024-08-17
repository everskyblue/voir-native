export function createInstance(props, $Class) {
    const children = props.children;

    delete props.children;
    
    const instance = new $Class(props);

    if (children) instance.append(children);

    return instance;
}
