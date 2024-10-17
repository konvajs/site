title: HTML5 Canvas Shape select, resize and rotate
---

`Transformer` is a special kind of `Konva.Group`. It allows you easily resize and rotate any node or set of nodes.

To enable it you need to:

1. Create new instance with `new Konva.Transformer()`
2. Add it to layer
3. attach to node with `transformer.nodes([shape]);`
4. Update the layer with `layer.batchDraw()`


*Note:* Transforming tool is not changing `width` and `height` properties of nodes when you resize them. Instead it changes `scaleX` and `scaleY` properties.

**Instructions: Try to resize and rotate shapes. Click on empty area to remove selection. Use SHIFT or CTRL to add/remove shapes into/from selection. Try to select area on a canvas.**

{% iframe /downloads/code/select_and_transform/Basic_demo.html %}

{% include_code Konva Shape transform and selection Demo select_and_transform/Basic_demo.html %}