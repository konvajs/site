title: HTML5 canvas Polygon Tutorial

---

To create a polygon with `Konva`, we can instantiate a `Konva.Line()` object with `closed = true` attribute.

To define the path of the line you should use `points` property. If you have three points with `x` and `y` coordinates you should define `points` property as: `[x1, y1, x2, y2, x3, y3]`.

Flat array of numbers should work faster and use less memory than array of objects.

For a full list of attributes and methods, check out the [Konva.Line documentation](/api/Konva.Line.html).

{% iframe /downloads/code/shapes/Line_-_Polygon.html %}

{% include_code Konva Polygon Demo shapes/Line_-_Polygon.html %}
