"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
const animation_1 = require("./animation");
class EventModal extends tabris_1.EventObject {
}
class Modal {
    constructor(attrs = {}) {
        const buttons = [];
        //- iteracion
        let buttonListenerAccept;
        let buttonListenerCancel;
        let isAddButtons = false;
        let isDetach = false;
        let isShow = false;
        // ui size
        const { width: contentWidth } = tabris_1.contentView.bounds;
        const { screenWidth: deviceWidth } = device;
        const maxSize = 560;
        const properties_modal_container = {
            elevation: 24,
            centerY: true,
            padding: 10,
            cornerRadius: 5,
            opacity: 0,
            background: "white",
            id: "modal-container",
        };
        if (maxSize > deviceWidth || maxSize > contentWidth) {
            Object.assign(properties_modal_container, {
                left: 24,
                right: 24,
            });
        }
        else {
            Object.assign(properties_modal_container, {
                width: maxSize,
            });
        }
        const modalWrap = new tabris_1.Composite({
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            opacity: 1,
            highlightOnTouch: false,
            background: new tabris_1.Color(0, 0, 0, 50),
        }).onTap((e) => e.preventDefault());
        const modal_container = new tabris_1.Composite(properties_modal_container).appendTo(modalWrap);
        if ("title" in attrs) {
            modal_container.append(new tabris_1.TextView({
                id: "modal-title",
                font: "medium 18px",
                padding: 10,
                left: 0,
                right: 0,
                text: attrs.title.toCapitalize(),
            }));
        }
        const modal_content = new tabris_1.Composite({
            top: "#modal-title",
            bottom: tabris_1.LayoutData.prev,
            right: 0,
            left: 0,
        });
        const modal_content_scrollable = new tabris_1.ScrollView({
            layoutData: "stretchX",
        }).appendTo(modal_content);
        modal_container.onBoundsChanged(({ value }) => {
            const { height: contentViewHeight } = tabris_1.contentView.bounds;
            if (contentViewHeight < value.height) {
                modal_container.layoutData = Object.assign(Object.assign({}, properties_modal_container), { height: value.height > contentViewHeight
                        ? maxSize -
                            (maxSize > contentViewHeight
                                ? 20 + maxSize - contentViewHeight
                                : 0)
                        : maxSize > value.height
                            ? value.height
                            : maxSize });
                modal_content.layoutData = Object.assign({}, modal_content.layoutData);
                modal_content_scrollable.layoutData = "stretch";
            }
        });
        Object.defineProperty(this, "setButtonAccept", {
            configurable: false,
            value: (text) => {
                if (!buttonListenerAccept) {
                    buttonListenerAccept = createButton("accept", text);
                }
                return buttonListenerAccept;
            },
        });
        Object.defineProperty(this, "setButtonCancel", {
            configurable: false,
            value: (text) => {
                if (!buttonListenerCancel) {
                    buttonListenerCancel = createButton("cancel", text);
                }
                return buttonListenerCancel;
            },
        });
        Object.defineProperty(this, "addView", {
            configurable: false,
            value: (...views) => modal_content_scrollable.append(views),
        });
        Object.defineProperty(this, "show", {
            configurable: false,
            value: () => {
                if (!isAddButtons) {
                    isAddButtons = true;
                    modal_container.append(new tabris_1.Composite({
                        layoutData: "stretchX",
                        id: "buttons-modal",
                        bottom: 0,
                    }).append(buttons));
                }
                if (!isShow || isDetach) {
                    isShow = true;
                    isDetach = false;
                    modal_container.append(modal_content);
                    tabris_1.contentView.append(modalWrap);
                    (0, animation_1.animateShow)(modal_container, 0, 100);
                }
            },
        });
        Object.defineProperty(this, "removeView", {
            configurable: false,
            value: () => {
                return modal_content_scrollable.children().dispose();
            },
        });
        Object.defineProperty(this, "removeButtons", {
            configurable: false,
            value: () => {
                buttonListenerAccept = buttonListenerCancel = null;
                buttons.forEach((button) => {
                    button.dispose();
                });
            },
        });
        Object.defineProperty(this, "remove", {
            configurable: false,
            value: () => {
                if (isDetach)
                    return;
                //para que se pueda usar en un contexto de mas alcanza a solo una llamada
                (0, animation_1.animateHidden)(modalWrap, 0, 250).then(() => {
                    isDetach = true;
                    isShow = false;
                    modalWrap.detach();
                });
            },
        });
        function createButton(type, text) {
            const btn = new tabris_1.Button({
                text,
                top: buttons.length === 0 ? "prev() 20" : "auto",
                right: buttons.length === 0 ? 0 : "prev()",
                bottom: 0,
                style: "text",
            });
            const event = new tabris_1.Listeners(btn, type);
            btn.onTap(() => event.trigger(new EventModal()));
            buttons.push(btn);
            return event;
        }
    }
}
exports.default = Modal;
