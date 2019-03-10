title: HTML5 Canvas Optimizing Strokes Performance Tip
---

### Remove stroke from hit

If you have a shape with fill and very small stroke you can set `shape.hitStrokeWidth(0)` to remove stroke from hit graph.
Don't use this property if your stroke is critical for hit detection (like non closed lines).

### Disable shadow for stroke

If you don't really need shadow for stroke you can set `shape.shadowForStrokeEnabled(false)`.
Remember that shadow will be disable if you are using `Konva.Line` without fill.


{% iframe /downloads/code/performance/Optimize_Strokes.html %}

{% include_code Konva Optimizing Strokes Demo performance/Optimize_Strokes.html %}
