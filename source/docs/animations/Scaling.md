title: Scale Animation
---

To animate a shape's scale with Konva, we can create a new animation with
`Konva.Animation`, and define a function which modifies the shape's scale with each animation frame.

In this tutorial, we'll scale the x and y component of a blue hexagon, the y component
of a yellow hexagon, and the x component of a red hexagon about an axis positioned on the right side of the shape.

Instructions: drag and drop the hexagons as they animate

For a full list of attributes and methods, check out the [Konva.Animation documentation](http://konvajs.github.io/api/Konva.Animation.html).

{% iframe /downloads/code/animations/Scaling.html %}

{% include_code Konva Scale Animation Demo animations/Scaling.html %}