"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
let navigation;
tabris_1.contentView.on("addChild", ({ child }) => {
    if (child instanceof tabris_1.NavigationView && !navigation) {
        navigation = child;
    }
});
function addView(...widgets) {
    return navigation.append(...widgets);
}
exports.default = addView;
__exportStar(require("./navigation"), exports);
__exportStar(require("./preference"), exports);
