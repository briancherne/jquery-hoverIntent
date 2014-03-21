/*!
 * hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007, 2013 Brian Cherne
 *
 * This is a forked version!!
 * https://github.com/moefinley/jquery-hoverIntent
 */

/* hoverIntent is similar to jQuery's built-in "hover" method except that
 * instead of firing the handlerIn function immediately, hoverIntent checks
 * to see if the user's mouse has slowed down (beneath the sensitivity
 * threshold) before firing the event. The handlerOut function is only
 * called after a matching handlerIn.
 *
 * // basic usage ... just like .hover()
 * .hoverIntent( handlerIn, handlerOut )
 * .hoverIntent( handlerInOut )
 *
 * // basic usage ... with event delegation!
 * .hoverIntent( handlerIn, handlerOut, selector )
 * .hoverIntent( handlerInOut, selector )
 *
 * // using a basic configuration object
 * .hoverIntent( config )
 *
 * @param  handlerIn   function OR configuration object
 * @param  handlerOut  function OR selector for delegation OR undefined
 * @param  selector    selector OR undefined
 *
 * @author Brian Cherne <brian(at)cherne(dot)net>
 *
 */

/*
 * Specific to this branch intent is detected on mouseenter and mouseleave.
 * Currently this is specifically designed to ensure that drop down menus don't
 * close accidentally and improves upon the simple delay of the original script.
 * Separate config param can now set for the out interval.
 * Added a config param to flag if to detect intent on mouseleave.
 */
(function($) {
    $.fn.hoverIntent = function(handlerIn,handlerOut,selector) {

        // default configuration values
        var cfg = {
            interval: 100,
            sensitivity: 7,
            timeout: 0,
            detectIntentOnMouseLeave: true
        };

        cfg.outInterval = cfg.interval;

        /*
        * Try and discern what arguments have been passed
        */
        if ( typeof handlerIn === "object" ) {
            cfg = $.extend(cfg, handlerIn ); //Presumes all config params passed in object
        } else if ($.isFunction(handlerOut)) {
            cfg = $.extend(cfg, { over: handlerIn, out: handlerOut, selector: selector } ); //Presumes func, func, selector because second arg was func
        } else {
            cfg = $.extend(cfg, { over: handlerIn, out: handlerIn, selector: handlerOut } ); //Presumes func, selector because second arg wasn't func
        }

        // instantiate variables
        // cX, cY = current X and Y position of mouse, updated by mousemove event
        // pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
        var cX, cY, pX, pY;

        // A private function for getting mouse position
        var track = function(mouseMoveEventObject) {
            cX = mouseMoveEventObject.pageX;
            cY = mouseMoveEventObject.pageY;
        };

        // A private function for comparing current and previous mouse position
        var compare = function(eventObject, htmlElement, callback, desiredStatus, interval) {
            htmlElement.hoverIntentTimeout = clearTimeout(htmlElement.hoverIntentTimeout);
            // compare mouse positions to see if they've crossed the threshold
            if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
                $(htmlElement).off("mousemove.hoverIntent",track);
                // set hoverIntent state to true (so mouseOut can be called)
                htmlElement.hoverIntentCurrentStatus = desiredStatus;
                return callback.apply(htmlElement,[eventObject]);
            } else {
                // set previous coordinates for next time
                pX = cX; pY = cY;
                // use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
                htmlElement.hoverIntentTimeout = setTimeout( function(){compare(eventObject, htmlElement, callback, desiredStatus, interval);} , interval );
            }
        };

        // A private function for delaying the mouseOut function
        var delay = function(eventObject,htmlElement) {
            htmlElement.hoverIntentTimeout = clearTimeout(htmlElement.hoverIntentTimeout);
            htmlElement.hoverIntentCurrentStatus = 0;
            return cfg.out.apply(htmlElement,[eventObject]);
        };

        // A private function for handling mouse 'hovering'
        var handleHover = function(e) {
            // copy objects to be passed into t (required for event object to be passed in IE)
            var eventObject = jQuery.extend({},e);
            var htmlElement = this;

            // cancel hoverIntent timer if it exists
            if (htmlElement.hoverIntentTimeout) { htmlElement.hoverIntentTimeout = clearTimeout(htmlElement.hoverIntentTimeout); }

            // if e.type == "mouseenter"
            if (e.type == "mouseenter") {
                // set "previous" X and Y position based on initial entry point
                pX = eventObject.pageX; pY = eventObject.pageY;
                // update "current" X and Y position based on mousemove
                $(htmlElement).on("mousemove.hoverIntent",track);
                // start polling interval (self-calling timeout) to compare mouse coordinates over time
                if (typeof htmlElement.hoverIntentCurrentStatus === "undefined" || htmlElement.hoverIntentCurrentStatus !== "hovering") {
                    htmlElement.hoverIntentTimeout = setTimeout(function () {
                        compare(eventObject, htmlElement, cfg.over, "hovering", cfg.interval);
                    }, cfg.interval);
                }
            } else { // else e.type == "mouseleave"
                $("body").on("mousemove.hoverIntent",track);
                if (htmlElement.hoverIntentCurrentStatus === "hovering") {
                    if(cfg.detectIntentOnMouseLeave){
                        /*
                         * Track the intent of the user on mouseleave
                         */
                        htmlElement.hoverIntentTimeout = setTimeout(function () {
                            compare(eventObject, htmlElement, cfg.out, "out", cfg.outInterval);
                        }, cfg.outInterval);
                    } else {
                        /*
                         * Don't track the intent of the user.
                         * Delay the mouseleave event by the timeout amount.
                         */
                        htmlElement.hoverIntentTimeout = setTimeout(function () {
                            delay(eventObject, htmlElement);
                        }, cfg.timeout);
                    }

                }
            }
        };

        // listen for mouseenter and mouseleave
        return this.on({'mouseenter.hoverIntent':handleHover,'mouseleave.hoverIntent':handleHover}, cfg.selector);
    };
})(jQuery);