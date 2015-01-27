
#HTML5 Canvas Desktop and Mobile Events Support Tutorial

To add event handlers to shapes that work for both desktop and mobile applications with Konva, we can use the `on()` method and pass in paired events.
For example, in order for the mousedown event to be triggered on desktop and mobile applications, we can use the "mousedown touchstart" event pair to cover both mediums.
In order for the mouseup event to be triggered on both desktop and mobile applications, we can use the "mouseup touchend" event pair.
We can also use the "dblclick dbltap" event pair to bind a double click event that works for both desktop and mobile devices.

Instructions: Mousedown, mouseup, touchstart, or touchend the circle on either a desktop or mobile device to observe the same functionality.

<a class="jsbin-embed" href="http://jsbin.com/naxego/1/embed?js,output">Konva Desktop and Mobile Events Demo</a><script src="http://static.jsbin.com/js/embed.js"></script>