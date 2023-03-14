//@ts-nocheck
import { NativeObject } from "tabris";
import type { AnyWidget } from "tabris";
export default (widget: AnyWidget, name: string, props: any) => NativeObject.defineProperty(widget, name, props);