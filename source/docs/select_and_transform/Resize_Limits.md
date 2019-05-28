title: HTML5 Canvas Shape Resize and Transform Limits
---

### How to limit size changes of a shape?

To limit or change resize and transform behavior you can use `boundBoxFunc` property.
It works a bit similar to [dragBoundFunc](/docs/drag_and_drop/Simple_Drag_Bounds.html).

Instructions: Try to resize a shape. You will see that its width is limited to 200.

{% iframe /downloads/code/select_and_transform/Resize_Limits.html %}

{% include_code Konva Shape transform and selection Demo select_and_transform/Resize_Limits.html %}