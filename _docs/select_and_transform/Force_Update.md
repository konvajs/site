title: HTML5 Canvas Force Update Tutorial
---

`Konva.Transformer` automatically track properties of attached nodes.
So it will adopt its own properties automatically.

But in some cases `Konva.Transformer` can't do this. Currently `Konva.Transformer` can not track deep changes inside `Konva.Group` node. In this case you will need to use `forceUpdate` method to reset transforming tools

Instructions: Click the button. See how transformer is changed.

{% iframe /downloads/code/select_and_transform/Force_Update.html %}

{% include_code Transformer Force Update Demo select_and_transform/Force_Update.html %}
