
#HTML5 Canvas Mobile Touch Events Tutorial

To bind event handlers to shapes on a mobile device with Konva, we can use the `on()` method.
The `on()` method requires an event type and a function to be executed when the event occurs.
Konva supports `touchstart`, `touchmove`, `touchend`, `tap`, `dbltap`, `dragstart`, `dragmove`, and `dragend` mobile events.

*Note: This example only works on iOS and Android mobile devices because it makes use of touch events rather than mouse events.*

Instructions: move your finger across the triangle to see touch coordinates and touch start and touch end the circle.

{% iframe /downloads/code/events/Mobile_Events.html %}

{% include_code Konva Mobile_Events Demo events/Mobile_Events.html %}