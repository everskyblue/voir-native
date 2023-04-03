import {
    Button,
    Color,
    Composite,
    EventObject,
    LayoutData,
    Listeners,
    ScrollView,
    TextView,
    contentView,
    Widget,
    AnyWidget,
    Properties,
} from "tabris";
import { animateHidden, animateShow } from "./animation";

class EventModal extends EventObject<any> {}

export default class Modal {
    [k: string]: any;

    remove: () => any;
    show: () => any;
    setButtonAccept: (text: string) => Listeners<{ target: Button }>;
    setButtonCancel: (text: string) => Listeners<{ target: Button }>;
    addView: (...view: Widget<any>[]) => any;
    removeView: () => any;
    removeButtons: () => any;

    constructor(attrs: any = {}) {
        const buttons: Button[] = [];
        //- iteracion
        let buttonListenerAccept: Listeners<{ target: Button }>;
        let buttonListenerCancel: Listeners<{ target: Button }>;

        let isAddButtons = false;
        let isDetach = false;
        let isShow = false;

        // ui size
        const { width: contentWidth } = contentView.bounds;
        const { screenWidth: deviceWidth } = device;
        const maxSize = 560;

        const properties_modal_container: Properties<Composite> = {
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
        } else {
            Object.assign(properties_modal_container, {
                width: maxSize,
            });
        }

        const modalWrap = new Composite({
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            opacity: 1,
            highlightOnTouch: false,
            background: new Color(0, 0, 0, 50),
        }).onTap((e: any) => e.preventDefault());

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
            bottom: LayoutData.prev,
            right: 0,
            left: 0,
        });

        const modal_content_scrollable = new ScrollView({
            layoutData: "stretchX",
        }).appendTo(modal_content);

        modal_container.onBoundsChanged(({ value }) => {
            const { height: contentViewHeight } = contentView.bounds;

            if (contentViewHeight < value.height) {
                modal_container.layoutData = {
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
                };
                modal_content.layoutData = {
                    ...(modal_content.layoutData as any),
                };
                modal_content_scrollable.layoutData = "stretch";
            }
        });

        Object.defineProperty(this, "setButtonAccept", {
            configurable: false,
            value: (text: string) => {
                if (!buttonListenerAccept) {
                    buttonListenerAccept = createButton("accept", text);
                }
                return buttonListenerAccept;
            },
        });

        Object.defineProperty(this, "setButtonCancel", {
            configurable: false,
            value: (text: string) => {
                if (!buttonListenerCancel) {
                    buttonListenerCancel = createButton("cancel", text);
                }
                return buttonListenerCancel;
            },
        });

        Object.defineProperty(this, "addView", {
            configurable: false,
            value: (...views: Widget<any>[]) =>
                modal_content_scrollable.append(views),
        });

        Object.defineProperty(this, "show", {
            configurable: false,
            value: () => {
                if (!isAddButtons) {
                    isAddButtons = true;
                    modal_container.append(
                        new Composite({
                            layoutData: "stretchX",
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

        function createButton(type: string, text: string) {
            const btn = new Button({
                text,
                top: buttons.length === 0 ? "prev() 20" : "auto",
                right: buttons.length === 0 ? 0 : "prev()",
                bottom: 0,
                style: "text",
            });
            const event = new Listeners<{ target: Button }>(btn, type);
            btn.onTap(() => event.trigger(new EventModal()));
            buttons.push(btn);
            return event;
        }
    }
}
