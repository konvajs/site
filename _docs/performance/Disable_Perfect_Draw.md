title: HTML5 Canvas Disable Perfect Drawing Tip
---



In some case drawing on canvas has unexpected result.
For example let's draw shape with fill, stroke and opacity.
As stroke are drawn on top of fill. There's a line of half the size of the stroke inside the shape which is darker
because it's the intersection of the fill and the stroke.

Probably that is not expected for you. So `Konva` fixes such behavior with using buffer canvas.

In this case `Konva` is doing these:

1. Draw shape on buffer canvas
2. Fill and stroke it WITHOUT opacity
3. Apply opacity on layer's canvas
4. Then draw on layer canvas result from buffer

But using buffer canvas might drop performance. So you can disable such fixing:

```javascript
shape.perfectDrawEnabled(false);
```

See difference here:

{% iframe /downloads/code/performance/Disable_Perfect_Draw.html %}

{% include_code Konva Disable Perfect Drawing Demo performance/Disable_Perfect_Draw.html %}
