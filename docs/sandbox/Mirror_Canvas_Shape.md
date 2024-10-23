title: How to flip shapes or image on canvas?
layout: demo_page
---

## Is it possible mirror shapes vertically or horizontally?

To flip any node with `Konva` you can use negative `scaleX` to flip it horizontally or `scaleY` to flip it vertically.

Remember that `scale` properties are working relative to origin of a node. For example for rectangle it will be top-left corner, for circle it will be its center. If you want to change origin of a node you can use `offsetX` and `offsetY` properties. To better understanding origin and offset, take a look into [Position vs Offset post](/docs/posts/Position_vs_Offset.html).

Depending on your use case, you may need to manually change `{x, y}` properties of the node to keep it on its original position after the scale.


*Instructions: click on flip button, see how they are mirrored.*


<!-- {% iframe /downloads/code/sandbox/Mirror_Canvas_Shape.html %} -->

<!-- {% include_code Konva Mirror Shape sandbox/Mirror_Canvas_Shape.html %} -->
