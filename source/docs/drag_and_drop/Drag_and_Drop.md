title: Drag and Drop Tutorial
---

To drag and drop shapes with Konva, we can set the `draggable` property
to true when we instantiate a shape, or we can use the `draggable()` method.
The `draggable()` method enables drag and drop for both desktop and mobile
applications automatically.

To detect drag and drop events with Konva, we can use the `on()` method to
bind `dragstart`, `dragmove`, or `dragend` events to a node.
The `on()` method requires an event type and a function to be executed when the event occurs.

{% iframe /downloads/code/drag_and_drop/Drag_and_Drop.html %}

{% include_code Konva Drag and Drop Demo drag_and_drop/Drag_and_Drop.html %}