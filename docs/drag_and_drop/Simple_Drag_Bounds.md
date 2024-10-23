## title: HTML5 Canvas Simple Drag Bounds Tutorial

To restrict the movement of shapes being dragged and dropped with Konva,
we can use the `dragmove` event and overrides the drag and drop position inside of it.

This event can be used to constrain the drag and drop movement in all kinds of ways, such as constraining the motion horizontally, vertically, diagonally, or radially, or even constrain the node
to stay inside of a box, circle, or any other path.

```js
shape.on('dragmove', () => {
  // lock position of the shape on x axis
  // keep y position as is
  shape.x(0);
});
```

_Tip: you can use `shape.absolutePosition()` method to get/set absolute position of a node, instead of relative `x` and `y`._

Instructions: Drag and drop the the horizontal text and observe that it can only
move horizontally. Drag and drop the vertical text and observe that it can only move vertically.

<!-- {% iframe /downloads/code/drag_and_drop/Simple_Drag_Bounds.html %} -->

<!-- {% include_code Konva Simple Drag Bounds Demo drag_and_drop/Simple_Drag_Bounds.html %} -->
