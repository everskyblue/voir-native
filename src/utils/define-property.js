import { NativeObject } from "tabris";
export default (widget, name, props) => NativeObject.defineProperty(widget, name, props);