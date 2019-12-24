title: How to access native 2d context
layout: demo_page
---

# How to access native 2d canvas context from Konva

Konva gives you object model for drawing shapes on canvas. Your app is starting from a stage (div wrapper) and then the stage have one or many layers (canvas DOM elements) inside.

You can hijack into Konva internals (or DOM internals) and draw into canvas directly without creating any shapes. But that is not recommended. Because Konva has full control over drawing and may reset your manual drawings or lost them on any export such as `stage.toDataURL()`.

There are two recommended ways if you want to draw something manually:

1. [Use custom shape](https://konvajs.org/docs/shapes/Custom.html)
2. Create a new canvas element manually and then use it for `Konva.Image`.



{% iframe /downloads/code/sandbox/Native_Context_Access.html %}

{% include_code Konva 20000 Nodes Demo sandbox/Native_Context_Access.html %}
