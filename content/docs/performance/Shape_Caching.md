title: HTML5 Canvas Shape Caching Performance Tip

---

## HTML5 Canvas Shape Caching Performance Tip

One way to drastically improve drawing performance for complex Konva shapes is to cache them as images.
This can be achieved by using the `cache()` method to convert a node into an image object.

This particular tutorial of drawing 10 cached stars rather than drawing 10 individual
stars sees about a 4x drawing performance boost. Caching can be applied to layers, groups, and shapes.

Note: The `cache()` method requires that the image is hosted on a web server with the same domain as the code executing it.

## How caching works?

When you call `cache()` method, Konva creates a new canvas element in memory and draws the node on it. Next time, when layer is redrawn, Konva just draws cached canvas element instead of drawing the node itself. You don't need to re-cache the shape if you change its opacity or transform (position, rotation, scale). In other cases you may need to re-cache the shape manually. Based on the logic above, there are several recommendations for caching:

1. Try not to cache many shapes individually. It is better to cache a group of shapes.
2. Try not to cache shapes that are changing frequently. It is better to cache static shapes.
3. Caching simple shapes, like a rectangle, is not recommended. It is better to cache complex shapes with many styles. Measure the performance before and after caching to see if it is worth it.
4. You can use `pixelRatio` property to increase or decrease the quality of the cached image. Decreasing the quality will improve performance.

<!-- {% iframe /downloads/code/performance/Shape_Caching.html %}

{% include_code Konva Shape Caching Demo performance/Shape_Caching.html %} -->
