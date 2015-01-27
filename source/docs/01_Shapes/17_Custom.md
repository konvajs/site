
#HTML5 Canvas Konva Custom S Tutorial

To create a custom shape with Konva, we can instantiate a `Konva.Shape()` object.

When creating a custom shape, we need to define a drawing function that is passed a Konva.Canvas renderer.

We can use the renderer to access the HTML5 Canvas context, and to use special methods like `context.fillStrokeShape(this)` which automatically handles filling, stroking, and applying shadows.

For a full list of attributes and methods, check out the [Konva.Shape documentation](http://konva.github.io/api/Konva.Shape.html)

<a class="jsbin-embed" href="http://jsbin.com/retafi/1/embed?js,output">Konva Custom Shape Demo</a><script src="http://static.jsbin.com/js/embed.js"></script>