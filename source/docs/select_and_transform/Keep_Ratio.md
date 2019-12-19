title: HTML5 Canvas Shape Resize With Ratio Preserved
---

## How to resize shape with savings its proportion?

By default when you resize with corner anchors (`top-left`, `top-right`, `bottom-left` or `bottom-right`) Transformer will save ratio of a node.

You can set `keepRatio` to `false` if you don't need that behavior.

Event if you set `keepRatio` to `false` you can hold `SHIFT` to still keep ratio.

Instructions: Try to resize texts.

{% iframe /cn.konvajs/downloads/code/select_and_transform/Keep_Ratio.html %}

{% include_code Konva Shape transform and selection Demo select_and_transform/Keep_Ratio.html %}