title: How to draw SVG image on canvas with Konva
layout: demo_page
---

## How to show SVG image on canvas?

It has not always been possible for browsers to draw `*.svg` images onto the canvas. However, the situation has improved and you currently have several options available if you want to render a vector image with `Konva`:

### Option 1: Use Konva.Path
Use [Konva.Path](/cn.konvajs/docs/shapes/Path.html). This method is good for simple path shapes. If you have a large SVG with many paths you, you may need to split it manually into several `Konva.Path` shapes.

### Option 2: Use Konva.Image
Use [Konva.Image](/cn.konvajs/docs/shapes/Image.html) shape with svg image
```
Konva.Image.fromURL('/image.svg', (image) => {
  layer.add(image);
  layer.draw();
})
```
This method works well in many cases, but is not fully cross-compatible. For example, some SVG may not be visible in the Firefox browser ([there is a workaround for that case](https://github.com/konvajs/konva/issues/677#issuecomment-504596837)).

### Option 3: Use an external library to render SVG to canvas
Use an external library (for example, [canvg](https://github.com/canvg/canvg)) to draw the SVG into the `<canvas>` element. And then use that canvas for [Konva.Image](/cn.konvajs/docs/shapes/Image.html). 

This method has been tested in at least one large production app, with proven reliability and rendering accuracy. 

### Demo
Below is a demo that shows drawing natively and with a library.

{% iframe /cn.konvajs/downloads/code/sandbox/SVG_On_Canvas.html %}

{% include_code Konva GIF demo sandbox/SVG_On_Canvas.html %}
