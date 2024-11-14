## title: HTML5 Canvas Complex Drag and Drop Bounds

## How to limit dragging ability with Konva?

To bound the movement of nodes being dragged and dropped inside regions with
Konva, we can use the `dragmove` event to define boundaries that the node cannot cross.

_Tip: you can use `shape.absolutePosition()` method to get/set absolute position of a node, instead of relative `x` and `y`._

Instructions: Drag and drop the the light blue rectangle and observe that it
is bound below an imaginary boundary at y = 50. Drag and drop the yellow
rectangle and observe that it is bound inside of an imaginary circle.

<!-- {% iframe /downloads/code/drag_and_drop/Complex_Drag_and_Drop.html %} -->

<!-- {% include_code Konva Complex Drag and Drop Bounds Demo drag_and_drop/Complex_Drag_and_Drop.html %} -->
