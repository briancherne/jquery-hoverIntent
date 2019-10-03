/***
 * 
 * This file is only to verify TypeScript compilation, it does not test the plugin functionnalities
 * 
 */

$(document).ready(() => {
    
    // strongly typed handlers
    const handlerIn: JQuery.EventHandlerBase<HTMLElement, JQuery.MouseEnterEvent<HTMLElement, null, HTMLElement, HTMLElement>> = function() {
        console.log( "test handler in" );
    };
    const handlerOut: JQuery.EventHandlerBase<HTMLElement, JQuery.MouseLeaveEvent<HTMLElement, null, HTMLElement, HTMLElement>> = function() {
        console.log( "test handler out" );
    };
    const handlerInOut: JQuery.EventHandlerBase<HTMLElement, JQuery.MouseLeaveEvent<HTMLElement, null, HTMLElement, HTMLElement> |
                                                  /* or */   JQuery.MouseEnterEvent<HTMLElement, null, HTMLElement, HTMLElement>> = function() {
        console.log( "test handler in-out" );
    };
    
    // generic handlers
    const handlerIn2 = function() {
        console.log( "test handler in 2" );
    }
    const handlerOut2 = function() {
        console.log( "test handler out 2" );
    }
    const handlerInOut2 = function() {
        console.log( "test handler in-out 2" );
    }

    // selector
    const selector: string = ".hover-intent";

    // basic usage
    $('.hover-intent').hoverIntent( handlerIn, handlerOut );
    $('.hover-intent').hoverIntent( handlerIn2, handlerOut2 );
    $('.hover-intent').hoverIntent( handlerInOut );
    $('.hover-intent').hoverIntent( handlerInOut2 );

    // basic usage with event delegation
    $('.hover-intent').hoverIntent( handlerIn, handlerOut, selector );
    $('.hover-intent').hoverIntent( handlerIn2, handlerOut2, selector );
    $('.hover-intent').hoverIntent( handlerInOut, selector );
    $('.hover-intent').hoverIntent( handlerInOut2, selector );

    // using configuration objects
    const config1: JQueryHoverIntent.Options = {
        interval : 100,
        sensivity: 6,
        timeout  : 0,
        over: handlerIn,
        out: handlerOut,
        selector: ".hover-intent"
    };
    const config2: JQueryHoverIntent.Options = {
        interval : 100,
        sensivity: 6,
        timeout  : 0,
        over: handlerIn2,
        out: handlerOut2,
        selector: ".hover-intent"
    };
    const config3: JQueryHoverIntent.Options = {
        over: handlerIn
    };
    const config4: JQueryHoverIntent.Options = {
        over: handlerInOut
    };
    $('.hover-intent').hoverIntent( config1 );
    $('.hover-intent').hoverIntent( config2 );
    $('.hover-intent').hoverIntent( config3 );
    $('.hover-intent').hoverIntent( config4 );
});