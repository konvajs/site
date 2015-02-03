title: Shape Redraw Tip
---

Usually when you need to update your canvas you should call `layer.draw()`.

But in small set of cases it is possible to update `Konva.Node` without updating whole layer.
You can call `shape.draw()`, *BUT remember that in this case shape will be drawn OVER existing canvas*.
So it is not possible to use this tip if your node should be placed under other nodes or if it has an opacity.

Instructions: mouseover boxes to hightlight.

{% iframe /downloads/code/performance/Shape_Redraw.html %}

{% include_code Konva Shape Redraw Demo performance/Shape_Redraw.html %}
