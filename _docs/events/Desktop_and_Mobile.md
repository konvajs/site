title: HTML5 Canvas Desktop and Mobile Events Support Tutorial

---

_Note: this demo may be outdate, because modern browsers support pointer events. And you can use pointer events in Konva too. See [Pointer Events Demo](/docs/events/Pointer_Events.html). But if you prefer not to use pointer events, keep reading..._

To add event handlers to shapes that work for both desktop and mobile applications with Konva, we can use the `on()` method and pass in paired events.
For example, in order for the `mousedown` event to be triggered on desktop and mobile applications, we can use the `"mousedown touchstart"` event pair to cover both mediums.
In order for the `mouseup` event to be triggered on both desktop and mobile applications, we can use the `"mouseup touchend"` event pair.
We can also use the `"dblclick dbltap"` event pair to bind a double click event that works for both desktop and mobile devices.

Instructions: Mousedown, mouseup, touchstart, or touchend the circle on either a desktop or mobile device to observe the same functionality.

{% iframe /downloads/code/events/Desktop_and_Mobile.html %}

{% include_code Konva Desktop_and_Mobile Demo events/Desktop_and_Mobile.html %}
