import {
    Button,
    Composite,
    ScrollView,
    TextView,
    EventObject
} from "tabris";
import { Listeners, layoutData, isVersion2, contentView } from "../support";
import { animateHidden, animateShow } from "./animation";

class EventModal extends EventObject {}

export default class Modal {
    /*remove: () => {};
    show: () => any;
    setButtonAccept: (text: string) => typeof Listeners<{ target: Button }>;
    setButtonCancel: (text: string) => typeof Listeners<{ target: Button }>;
    addView: (...view: Widget[]) => any;
    removeView: () => any;
    removeButtons: () => any;*/
    
    constructor(attrs = {}) {
        const buttons = [];
        //- iteracion
        let buttonListenerAccept;
        let buttonListenerCancel;

        let isAddButtons = false;
        let isDetach = false;
        let isShow = false;

        // ui size
        const { width: contentWidth } = contentView.bounds;
        const { screenWidth: deviceWidth } = tabris.device;
        const maxSize = 560;

        const properties_modal_container = {
            elevation: 24,
            centerY: layoutData.centerY,
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
        } else {
            Object.assign(properties_modal_container, {
                width: maxSize,
            });
        }

        const modalWrap = new Composite({
            ...layoutData.stretch,
            opacity: 1,
            highlightOnTouch: false,
            background: 'rgba(0, 0, 0, 0.50)',
        }).onTap((e) => e.preventDefault());

        const modal_container = new Composite(
            properties_modal_container
        ).appendTo(modalWrap);

        if ("title" in attrs) {
            modal_container.append(
                new TextView({
                    id: "modal-title",
                    font: "medium 18px",
                    padding: 10,
                    left: 0,
                    right: 0,
                    text: attrs.title.toCapitalize(),
                })
            );
        }

        const modal_content = new Composite({
            top: "#modal-title",
            bottom: 'prev()',
            ...layoutData.stretchX
        });

        const modal_content_scrollable = new ScrollView({
            layoutData: layoutData.stretchX,
            id: 'modal_content_scrollable'
        }).appendTo(modal_content);

        modal_container.on('boundsChanged', ({ value }) => {
            const { height: contentViewHeight } = contentView.bounds;
            console.log(modal_container.layoutData)
            if (contentViewHeight < value.height) {
                modal_container.set({
                    ...properties_modal_container,
                    height:
                        value.height > contentViewHeight
                            ? maxSize -
                              (maxSize > contentViewHeight
                                  ? 20 + maxSize - contentViewHeight
                                  : 0)
                            : maxSize > value.height
                            ? value.height
                            : maxSize,
                });
                console.log(modal_container.layoutData)
                modal_content.set({
                    ...(modal_content.layoutData),
                });
                modal_content_scrollable.set(layoutData.stretch);
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
            value: (...views) =>
                modal_content_scrollable.append(views),
        });

        Object.defineProperty(this, "show", {
            configurable: false,
            value: () => {
                if (!isAddButtons) {
                    isAddButtons = true;
                    modal_container.append(
                        new Composite({
                            layoutData: layoutData.stretchX,
                            id: "buttons-modal",
                            bottom: 0,
                        }).append(buttons)
                    );
                }

                if (!isShow || isDetach) {
                    isShow = true;
                    isDetach = false;
                    modal_container.append(modal_content);
                    contentView.append(modalWrap);
                    animateShow(modal_container, 0, 100);
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
                if (isDetach) return;
                //para que se pueda usar en un contexto de mas alcanza a solo una llamada
                animateHidden(modalWrap, 0, 250).then(() => {
                    isDetach = true;
                    isShow = false;
                    modalWrap.detach();
                });
            },
        });

        function createButton(type, text) {
            const btn = new Button({
                text,
                top: "#modal_content_scrollable",
                right: "prev()",
                bottom: 0,
                style: "text",
            });
            const event = new Listeners(btn, type);
            btn.on('tap', () => event.trigger(new EventModal()));
            buttons.push(btn);
            return event;
        }
    }
}
