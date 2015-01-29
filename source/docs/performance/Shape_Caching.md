
#HTML5 Canvas Shape Caching with Konva

One way to drastically improve drawing performance for complex Konva shapes is to cache them as images.
This can be achieved by using the `cache()` method to convert a node into an image object.

This particular tutorial of drawing 10 cached stars rather than drawing 10 individual
stars sees about a 4x drawing performance boost.  Caching can be applied to any node,
including the stage, layers, groups, and shapes.

Note: The `cache()` method requires that the image is hosted on a web server with the same domain as the code executing it.

In same cases `cache()` function can not automatically detect size of node.
So you should be carefull for groups and shapes with shadows and strokes.
If you see unexpected result pass bound properties to `cache()` function with `x`, `y`, `width` and `height` properties.

{% iframe /downloads/code/performance/ShapeCaching.html %}

{% include_code Konva Shape Caching Demo performance/ShapeCaching.html %}
