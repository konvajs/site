title: HTML5 Canvas Complex Drag and Drop Bounds
---

## How to limit dragging ability with Konva?

To bound the movement of nodes being dragged and dropped inside regions with
Konva, we can use the `dragBoundFunc` property to define boundaries that
the node cannot cross.

**Note: `dragBoundsFunc` is working with absolute position of a node. So it has a new absolute position as argument and you need to return a new absolute position. You can try to use `dragmove` event, if you want to operate with local position.**

Instructions: Drag and drop the the light blue rectangle and observe that it
is bound below an imaginary boundary at y = 50. Drag and drop the yellow
rectangle and observe that it is bound inside of an imaginary circle.

{% iframe /downloads/code/drag_and_drop/Complex_Drag_and_Drop.html %}

{% include_code Konva Complex Drag and Drop Bounds Demo drag_and_drop/Complex_Drag_and_Drop.html %}