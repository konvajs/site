title: How to find relative mouse position?
layout: demo_page
---

In some cases you may need to find position of a point relative to a node. For purpose we can use mathematical `Konva.Transform` methods.

In this demo we have deep nesting transformed nodes: moved stage, scaled layer, rotated group.
Now we want to add circles into the group on click. But how to find position of that circles?
We can't use `stage.getPointerPosition()` directly because that is position relative to top-left corner of the stage.

The idea is simple. We just need to use inverted absolute transform.

{% iframe /cn.konvajs/downloads/code/sandbox/Relative_Pointer_Position.html %}

{% include_code Relative Pointer Position Demo sandbox/Relative_Pointer_Position.html %}