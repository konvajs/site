
#HTML5 Canvas Simple Drag Bounds Tutorial with Konva

To restrict the movement of shapes being dragged and dropped with Konva,
we can use the `dragBoundsFunc` property which is a user defined function that
overrides the drag and drop position.  This function can be used to constrain
the drag and drop movement in all kinds of ways, such as constraining the motion
horizontally, vertically, diagonally, or radially, or even constrain the node
to stay inside of a box, circle, or any other path.

Instructions: Drag and drop the the horizontal text and observe that it can only
move horizontally. Drag and drop the vertical text and observe that it can only move vertically.

<a class="jsbin-embed" href="http://jsbin.com/caguhi/1/embed?js,output">Konva Simple Drag Bounds Demo</a><script src="http://static.jsbin.com/js/embed.js"></script>