hoverIntent jQuery Plug-in
==========================

hoverIntent is a plug-in that attempts to determine the user's intent... like a crystal ball, only with mouse movement! It is similar to [jQuery's hover method](http://api.jquery.com/hover/). However, instead of calling the handlerIn function immediately, hoverIntent waits until the user's mouse slows down enough before making the call.

Why? To delay or prevent the accidental firing of animations or ajax calls. Simple timeouts work for small areas, but if your target area is large it may execute regardless of intent. That's where hoverIntent comes in...

For more information, visit [http://cherne.net/brian/resources/jquery.hoverIntent.html](http://cherne.net/brian/resources/jquery.hoverIntent.html)

## mouseleave fork
Specific to this fork the user's intent is detected on mouseenter ***and mouseleave***.
This was specifically designed ensuring drop down menus don't close accidentally but should work in any similar scenario.
- Added detection of user's intent on mouseleave
- Added config parma for the mouseleave interval (defaults to using the mouseenter interval if not specified)
- Added detectIntentOnMouseLeave param which when set to false disables the detection of intent on mouseleave and reverts to the original delay function