title: HTML5 Canvas Shape Caching Performance Tip
---

One way to drastically improve drawing performance for complex Konva shapes is to cache them as images.
This can be achieved by using the `cache()` method to convert a node into an image object.

This particular tutorial of drawing 10 cached stars rather than drawing 10 individual
stars sees about a 4x drawing performance boost.  Caching can be applied to layers, groups, and shapes.

Note: The `cache()` method requires that the image is hosted on a web server with the same domain as the code executing it.

{% iframe /downloads/code/performance/Shape_Caching.html %}

{% include_code Konva Shape Caching Demo performance/Shape_Caching.html %}
