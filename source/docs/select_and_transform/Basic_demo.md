title: HTML5 Canvas Shape select, resize and rotate
---

## WARNING! This feature is experimental.

`Transformer` is a special kind of `Konva.Group`. It allows you easily resize and rotate any shape.

To enable it you need to:

1. Create new instance with `new Konva.Transformer`
2. Add it to layer
3. attach to a node with `transformer.attachTo(node)`


*Note:* Transforming tool is not changing `width` and `height` properties of nodes when you resize them. Instead it changes `scaleX` and `scaleY` properties.

Instructions: select a rectangle. Try to resize and rotate it.

{% iframe /cn.konvajs/downloads/code/select_and_transform/Basic_demo.html %}

{% include_code Konva Shape transform and selection Demo select_and_transform/Basic_demo.html %}