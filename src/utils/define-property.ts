//@ts-nocheck
import { NativeObject, AnyWidget } from "tabris";
export default (widget: AnyWidget, name: string, props: any) => NativeObject.defineProperty(widget, name, props);