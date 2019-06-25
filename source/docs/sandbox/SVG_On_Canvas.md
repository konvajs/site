title: How to draw SVG image on canvas with Konva
layout: demo_page
---

## How to show SVG image on canvas?

Long time ago browsers were not able to draw `*.svg` images on canvas. But right now the situations is better.

So if you want to show a vector image with `Konva` you have several ways for that:

1. Use [Konva.Path](/docs/shapes/Path.html). That way is good for simple path shapes. If you have large svg with many paths you can split it manually into several `Konva.Path` shapes.

2. Use [Konva.Image](/docs/shapes/Image.html) shape with svg image

```
Konva.Image.fromURL('/image.svg', (image) => {
  layer.add(image);
  layer.draw();
})
```

That way works ok for many cases. But it is not fully cross capable. At the time of writing this post some SVG are not visible in the Firefox browser ([the is a workaround for that case](https://github.com/konvajs/konva/issues/677#issuecomment-504596837)).

3. Use external library to draw svg into `<canvas>` element. And then use that canvas for [Konva.Image](/docs/shapes/Image.html).

We can use [canvg](https://github.com/canvg/canvg) to parse SVG and draw it into `<canvas>`.

I was using that method in a large production app to have a predictable SVG result on the canvas.

Here is the demo that shows drawing natively and with a library.

{% iframe /downloads/code/sandbox/SVG_On_Canvas.html %}

{% include_code Konva GIF demo sandbox/SVG_On_Canvas.html %}
