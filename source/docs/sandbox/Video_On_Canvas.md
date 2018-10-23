title: How to display video on Canvas
layout: demo_page
---

To draw a video on a canvas we can use `<video>` DOM element similar to `<img>` element, but we have to frequently redraw the layer. For the purpose we can use `Konva.Animation`. As alternative you can use `requestAnimationFrame` and just call `layer.draw()`.

Instructions: click "play" button. You can drag&drop the image.

{% iframe /downloads/code/sandbox/Video_On_Canvas.html %}

{% include_code Konva Video Demo sandbox/Video_On_Canvas.html %}
