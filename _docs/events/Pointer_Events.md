title: HTML5 Canvas Pointer Events Tutorial

---

Pointer events can be useful to handle both mobile and desktop events with one handler.

To bind pointer event handlers to shapes with Konva, we can use the `on()` method.
The `on()` method requires an event type and a function to be executed when the event occurs.
Konva supports `pointerdown`, `pointermove`, `pointerup`, `pointercancel`, `pointerover`, `pointerenter`, `pointerout`,`pointerleave`, `pointerclick`, `pointerdblclick` events.

_Note: This example works on both mobile and desktop devices._

Instructions: move your mouse/finger across the triangle to see pointer coordinates.

{% iframe /downloads/code/events/Pointer_Events.html %}

{% include_code Konva Pointer Events Demo events/Pointer_Events.html %}
