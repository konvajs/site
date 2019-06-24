title: How do draw SVG image on canvas with Konva
layout: demo_page
---

## How do show SVG image on canvas?

Long time ago browsers were not able to draw `*.svg` images on canvas. But right now the situations is better.

So if you want to show a vector image with Konva you have several ways for that:

1. Use [Konva.Path](/docs/shapes/Path.html). That way is good for simple PATH shapes. If you have large svg with many paths you can split it manually into several `Konva.Path` shapes.

2. Use [Konva.Image] shape with svg

```
Konva.Image.fromURL('/image.svg', (image) => {
  layer.add(image);
  layer.draw();
})
```

That way works ok for many cases. But it is not fully cross capibale

You can't directly insert GIF image into the canvas. But we can use external library to parse the gif and then we can draw it into the layer as `Konva.Image` shape.

In this demo I will use [gifler](http://themadcreator.github.io/gifler/) to parse and draw the gif. You can use any other library.


{% iframe /downloads/code/sandbox/GIF_On_Canvas.html %}

{% include_code Konva GIF demo sandbox/GIF_On_Canvas.html %}
