title: HTML5 Canvas Shape Events
---

To detect shape events with Konva, we can use the `on()` method to bind event handlers to a node.

The `on()` method requires an event type and a function to be executed when the event occurs.
Konva supports `mouseover`, `mouseout`, `mouseenter`, `mouseleave`, `mousemove`, `mousedown`, `mouseup`, `wheel`, `click`, `dblclick`, `dragstart`, `dragmove`, and `dragend` desktop events.

Instructions: Mouseover and mouseout of the triangle, and mouseover, mouseout, mousedown, and mouseup over the circle.

{% iframe /cn.konvajs/downloads/code/events/Binding_Events.html %}

{% include_code Konva Binding_Events Demo events/Binding_Events.html %}
