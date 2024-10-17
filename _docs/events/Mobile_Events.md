title: HTML5 Canvas Mobile Touch Events Tutorial
---

To bind event handlers to shapes on a mobile device with Konva, we can use the `on()` method.
The `on()` method requires an event type and a function to be executed when the event occurs.
Konva supports `touchstart`, `touchmove`, `touchend`, `tap`, `dbltap`, `dragstart`, `dragmove`, and `dragend` mobile events.

For more complex gestures like `rotate` take a look into [Gestures Demo](/docs/sandbox/Gestures.html).

If you are looking for pan and zoom logic for the whole stage take a look into [Multi-touch scale Stage demo](/docs/sandbox/Multi-touch_Scale_Stage.html).

*Note: This example only works on mobile devices because it makes use of touch events rather than mouse events.*

Instructions: move your finger across the triangle to see touch coordinates and touch start and touch end the circle.

{% iframe /downloads/code/events/Mobile_Events.html %}

{% include_code Konva Mobile_Events Demo events/Mobile_Events.html %}
