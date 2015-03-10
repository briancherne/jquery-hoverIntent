/*!
 * hoverIntent v1.8.1 // 2014.08.11 // jQuery v1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007, 2014 Brian Cherne
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
 * // basic usage ... with event data and/or event delegation!
 * .hoverIntent( handlerIn, handlerOut, selector, data )
 * .hoverIntent( handlerIn, handlerOut, data )
 * .hoverIntent( handlerInOut, selector, data )
 * .hoverIntent( handlerInOut, data )
 *
 * // using a basic configuration object
 * .hoverIntent( config )
 *
 * @param  handlerIn   function OR configuration object
 * @param  handlerOut  function OR selector OR data OR undefined
 * @param  selector    selector OR data OR undefined
 * @param  data        data OR undefined
 * @author Brian Cherne <brian(at)cherne(dot)net>
 */
(function ($) {

    // Variables Descriptions
    // x, y = current X and Y position of mouse, updated by mousemove event
    // i, j = previous X and Y position of mouse, set by mouseover and polling interval
    // t = contains the timer id.
    // s = indicates the hover state.

    // default configuration values
    var _cfg = {
        interval: 100,
        sensitivity: 6,
        timeout: 0
    };

    // A private function for getting mouse position
    function _track(ev) {
        ev.data.x = ev.pageX;
        ev.data.y = ev.pageY;
    };

    // A private function for comparing current and previous mouse position
    function _compare(ev, ob, cfg) {
        cfg.t = clearTimeout(cfg.t);

        // compare mouse positions to see if they've crossed the threshold
        if (Math.sqrt((cfg.i - cfg.x) * (cfg.i - cfg.x) + (cfg.j - cfg.y) * (cfg.j - cfg.y)) < cfg.sensitivity) {
            $(ob).off("mousemove.hoverIntent", cfg, _track);

            // set hoverIntent state to true (so mouseOut can be called)
            cfg.s = true;

            return cfg.over.apply(ob, [ev]);
        }
        else {
            // set previous coordinates for next time
            cfg.i = cfg.x;
            cfg.j = cfg.y;

            // use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
            cfg.t = setTimeout(function () {
                _compare(ev, ob, cfg);
            }, cfg.interval);
        }
    };

    // A private function for delaying the mouseOut function
    function _delay(ev, ob, cfg) {
        cfg.t = clearTimeout(cfg.t);
        cfg.s = false;

        return cfg.out.apply(ob, [ev]);
    };

    // jQuery extension
    $.fn.hoverIntent = function (cfg /* or handlerIn */, handlerOut, selector, data) {

        // re-align inputs
        if (typeof cfg !== "object") {
            if (typeof handlerOut === "string") {
                data = selector;
                selector = handlerOut;
                handlerOut = cfg;
            }
            else if (handlerOut == null) {
                handlerOut = cfg;
            }
            else if (!$.isFunction(handlerOut)) {
                data = handlerOut;
                handlerOut = cfg;
                selector = void 0;
            }

            if (typeof selector !== "string" && selector != null) {
                data = selector;
                selector = void 0;
            }

            cfg = {
                over: cfg,
                out: handlerOut,
                selector: selector,
                data: data
            };
        }

        cfg = $.extend({}, _cfg, cfg);

        // A private function for handling mouse 'hovering'
        function handleHover(e) {
            // copy objects to be passed into t (required for event object to be passed in IE)
            var ev = $.extend({}, e),
                ob = this;

            // cancel hoverIntent timer if it exists
            if (cfg.t) {
                cfg.t = clearTimeout(cfg.t);
            }

            // if e.type === "mouseenter"
            if (e.type === "mouseenter") {
                // set "previous" X and Y position based on initial entry point
                cfg.i = ev.pageX;
                cfg.j = ev.pageY;

                // update "current" X and Y position based on mousemove
                $(ob).on("mousemove.hoverIntent", cfg, _track);

                // start polling interval (self-calling timeout) to compare mouse coordinates over time
                if (!cfg.s) {
                    cfg.t = setTimeout(function () {
                        _compare(ev, ob, cfg);
                    }, cfg.interval);
                }
            }
            // else e.type == "mouseleave"
            else {
                // unbind expensive mousemove event
                $(ob).off("mousemove.hoverIntent", cfg, _track);

                // if hoverIntent state is true, then call the mouseOut function after the specified delay
                if (cfg.s) {
                    cfg.t = setTimeout(function () {
                        _delay(ev, ob, cfg);
                    }, cfg.timeout);
                }
            }
        };

        // listen for mouseenter and mouseleave
        return this.on({
            "mouseenter.hoverIntent": handleHover,
            "mouseleave.hoverIntent": handleHover
        }, cfg.selector, cfg.data);
    };

})(jQuery);