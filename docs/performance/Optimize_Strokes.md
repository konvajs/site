title: HTML5 Canvas Optimizing Strokes Performance Tip
---

### Disable shadow for stroke

By default `Konva` is making extra internal drawing when a shape has both stroke and shadow. It is doing that to make drawing result look expected. 

If you don't really need shadow for stroke you should set `shape.shadowForStrokeEnabled(false)`. Remember that shadow will be disable if you are using `Konva.Line` without fill (because it is just stroked shape). **Disabling shadow for stroke will increase rendering speed A LOT.**


### Remove stroke from hit

If you have a shape with fill and very small stroke you can set `shape.hitStrokeWidth(0)` to remove stroke from hit graph.
Don't use this property if your stroke is critical for hit detection (like non closed lines). By default, `Konva` is using strokes for hit graph - for detecting shapes under pointer for events. In some situations you may not need that.


**Instructions: take a look into very slow random movements of circles. Now try to toggle optimized rendering checkbox. Faster?**

<!-- {% iframe /downloads/code/performance/Optimize_Strokes.html %}

{% include_code Konva Optimizing Strokes Demo performance/Optimize_Strokes.html %} -->
