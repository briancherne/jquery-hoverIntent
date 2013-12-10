hoverIntent jQuery Plug-in
==========================

hoverIntent is a plug-in that attempts to determine the user's intent... like a crystal ball, only with mouse movement! It is similar to [jQuery's hover method](http://api.jquery.com/hover/). However, instead of calling the handlerIn function immediately, hoverIntent waits until the user's mouse slows down enough before making the call.

Why? To delay or prevent the accidental firing of animations or ajax calls. Simple timeouts work for small areas, but if your target area is large it may execute regardless of intent. That's where hoverIntent comes in...

For more information, visit [http://cherne.net/brian/resources/jquery.hoverIntent.html](http://cherne.net/brian/resources/jquery.hoverIntent.html)

Specific to this fork intent is detected on mouseenter and mouseleave. Currently this is specifically designed to ensure that drop down menus don't close accidentally and improves upon the simple delay of the original script.

I intend to add separate parameters for the out event's interval and sensitivity then another to disable intent on out and revert to using the delay.