title: Fill and stroke order demo
---

If a shape has both fill and stroke, by default, `Konva` will draw filling first then stroke on top of it. That is the best behavior for most of the applications.

## How to draw fill part on top of the stroke?

In some rare cases you may need a shape that has stroke first, then a fill on top of it. For that use case you may use [fillAfterStrokeEnabled](https://konvajs.org/api/Konva.Shape.html#fillAfterStrokeEnabled) property.

```js
shape.fillAfterStrokeEnabled(true);
```

Instructions: Take a look into two example of different fill&stroke order.

{% iframe /downloads/code/styling/Fill_Stroke_Order.html %}

{% include_code Konva Fill Stroke Order Demo styling/Fill_Stroke_Order.html %}