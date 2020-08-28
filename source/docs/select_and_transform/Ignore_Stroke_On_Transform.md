title: How to resize shape on canvas without changing its stroke size?
---

### Do you want to change size of a shape without changing its stroke size?

Remember, that `Konva.Transformer` is changing `scaleX` and `scaleY` properties of a node.
By default, if you are transforming a shape, its stroke will be scaled too. It some cases that is not a good behavior.

There are two ways to prevent stroke scaling: (1) reset scale of a shape or (2) use combination of `shape.strokeScaleEnabled(false)` and `transformer.ignoreStroke(false)`.

**Instructions: there are two rectangles to resize. The green one will reset it scale. The red one will just disable stroke scaling.**

{% iframe /downloads/code/select_and_transform/Ignore_Stroke_On_Transform.html %}

{% include_code Konva ignore stroke  select_and_transform/Ignore_Stroke_On_Transform.html %}