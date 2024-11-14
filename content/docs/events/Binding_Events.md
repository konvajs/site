title: HTML5 Canvas Shape Events

---

To detect shape events with Konva, we can use the `on()` method to bind event handlers to a node.

The `on()` method requires an event type and a function to be executed when the event occurs.

Mouse events: `mouseover`, `mouseout`, `mouseenter`, `mouseleave`, `mousemove`, `mousedown`, `mouseup`, `wheel`, `click`, `dblclick`.

Touch events: `touchstart`, `touchmove`, `touchend`, `tap`, `dbltap`.

Pointer events: `pointerdown`, `pointermove`, `pointereup`, `pointercancel`, `pointerover`, `pointerenter`, `pointerout`,`pointerleave`, `pointerclick`, `pointerdblclick`.

Drag events: `dragstart`, `dragmove`, and `dragend`.

Transform events: `transformstart`, `transform`, `transformend`.

Instructions: Mouseover and mouseout of the triangle, and mouseover, mouseout, mousedown, and mouseup over the circle.

<!-- {% iframe /downloads/code/events/Binding_Events.html %} -->

<!-- {% include_code Konva Binding_Events Demo events/Binding_Events.html %} -->
