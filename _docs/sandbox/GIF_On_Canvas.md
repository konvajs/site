title: How to animate GIF on Canvas
layout: demo_page
---

You can't directly insert GIF image into the canvas. But we can use external library to parse the gif and then we can draw it into the layer as `Konva.Image` shape.

In this demo I will use [gifler](http://themadcreator.github.io/gifler/) to parse and draw the gif. You can use any other library.


{% iframe /downloads/code/sandbox/GIF_On_Canvas.html %}

{% include_code Konva GIF demo sandbox/GIF_On_Canvas.html %}
