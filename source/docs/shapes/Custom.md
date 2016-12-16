title: Custom Shape Tutorial
---

To create a custom shape with Konva, we can instantiate a `Konva.Shape()` object.

When creating a custom shape, we need to define a drawing function that is passed a Konva.Canvas renderer.

We can use the renderer to access the HTML5 Canvas context, and to use special methods like `context.fillStrokeShape(this)` which automatically handles filling, stroking, and applying shadows.

For a full list of attributes and methods, check out the [Konva.Shape documentation](https://konvajs.github.io/api/Konva.Shape.html)

{% iframe /downloads/code/shapes/Custom.html %}

{% include_code Konva Custom Demo shapes/Custom.html %}
