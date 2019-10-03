// TypeScript types definitions for the JQuery plugin "jquery-hoverintent"
// Just add '/// <reference path="path/to/jquery.hoverIntent.d.ts" />' on top of your application entry point.

/// <reference types="jquery" />

declare namespace JQueryHoverIntent {
    interface Options {
        interval ?: number;
        sensivity?: number;
        timeout  ?: number;
        over      : JQuery.EventHandlerBase<HTMLElement, JQuery.MouseEnterEvent<HTMLElement, null, HTMLElement, HTMLElement>>;
        out      ?: JQuery.EventHandlerBase<HTMLElement, JQuery.MouseLeaveEvent<HTMLElement, null, HTMLElement, HTMLElement>>;
        selector ?: string;
    }
}
interface JQuery {
    hoverIntent( handlerIn: JQuery.EventHandlerBase<HTMLElement, JQuery.MouseEnterEvent<HTMLElement, null, HTMLElement, HTMLElement>>,
                 handlerOut: JQuery.EventHandlerBase<HTMLElement, JQuery.MouseLeaveEvent<HTMLElement, null, HTMLElement, HTMLElement>>,
                 selector?: string ): JQuery;
    hoverIntent( handlerInOut: JQuery.EventHandlerBase<HTMLElement, JQuery.MouseLeaveEvent<HTMLElement, null, HTMLElement, HTMLElement> |
                                                        /* or */    JQuery.MouseEnterEvent<HTMLElement, null, HTMLElement, HTMLElement>>,
                 selector?: string ): JQuery;
    hoverIntent( options: JQueryHoverIntent.Options): JQuery;
}