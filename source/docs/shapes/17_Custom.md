
#HTML5 Canvas KineticJS Custom S Tutorial

To create a custom shape with KineticJS, we can instantiate a `Kinetic.Shape()` object. 

When creating a custom shape, we need to define a drawing function that is passed a Kinetic.Canvas renderer.

We can use the renderer to access the HTML5 Canvas context, and to use special methods like `context.fillStrokeShape(this)` which automatically handles filling, stroking, and applying shadows.

For a full list of attributes and methods, check out the [Kinetic.Shape documentation](http://lavrton.github.io/KineticJS/api/Kinetic.Shape.html)

<a class="jsbin-embed" href="http://jsbin.com/retafi/1/embed?js,output">KineticJS Custom Shape Demo</a><script src="http://static.jsbin.com/js/embed.js"></script>