title: HTML5 Canvas Simple Drag Bounds Tutorial
---

To restrict the movement of shapes being dragged and dropped with Konva,
we can use the `dragBoundsFunc` property which is a user defined function that
overrides the drag and drop position.  This function can be used to constrain
the drag and drop movement in all kinds of ways, such as constraining the motion
horizontally, vertically, diagonally, or radially, or even constrain the node
to stay inside of a box, circle, or any other path.

**Note: `dragBoundsFunc` is working with absolute position of a node. So it has a new absolute position as argument and you need to return a new absolute position. You can try to use `dragmove` event, if you want to operate with local position.**


Instructions: Drag and drop the the horizontal text and observe that it can only
move horizontally. Drag and drop the vertical text and observe that it can only move vertically.

{% iframe /downloads/code/drag_and_drop/Simple_Drag_Bounds.html %}

{% include_code Konva Simple Drag Bounds Demo drag_and_drop/Simple_Drag_Bounds.html %}