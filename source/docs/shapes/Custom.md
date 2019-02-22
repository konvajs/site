title: HTML5 canvas Custom Shape Tutorial
---

To create a custom shape with Konva, we can instantiate a `Konva.Shape()` object.

When creating a custom shape, we need to define a drawing function that is passed a [Konva.Context](/api/Konva.Context.html) renderer and a shape instance:

```javascript
var rect = new Konva.Shape({
  x: 10,
  y: 20,
  fill: '#00D2FF',
  width: 100,
  height: 50,
  sceneFunc: function (context, shape) {
    context.beginPath();
    // don't need to set position of rect, Konva will handle it
    context.rect(0, 0, shape.getAttr('width'), shape.getAttr('height'));
    // (!) Konva specific method, it is very important
    // it will apply are required styles
    context.fillStrokeShape(shape);
  }
});
```

`Konva.Context` is a wrapper around native 2d canvas context that have the same properties and methods with some additional API.

We can use the renderer to access the HTML5 Canvas context, and to use special methods like `context.fillStrokeShape(shape)` which automatically handles filling, stroking, and applying shadows.

There are two properties that can be used for drawing custom shapes: `sceneFunc` and `hitFunc`.

`sceneFunc` should be used to define visual appearance of a shape. `Konva` will use `sceneFunc` for drawing its hit graph for events detecting. So in many cases you just need to define `sceneFunc` only. If you want to overwrite hit testing, take a look into [Custom Hit Region demo](/docs/events/Custom_Hit_Region.html).

### Some best practices for writing `sceneFunc` and `hitFunc`:

1. Make it as optimal, as possible because that function can be called many times per second. It is not ok to create images (`document.createElement('image')` or `new window.Image()`) or other large objects here.

2. The function should not have any side effects like moving shapes, attaching events or changing state of your app.

3. If you want to apply complex styles to the canvas manually or draw images, remember to define custom `hitFunc`.

4. Do not apply position and scaling in `sceneFunc` manually. `Konva` can handle it automatically if you set that properties into shape instance directly. Example: `shape.x(10)`.

5. If possible do not apply styles in `sceneFunc` manually. Just draw a shape with some paths. `context.fillStrokeShape(shape)` function at the and will do all styling work.

6. If you need more demos take a look into [Konva core shapes implementations](https://github.com/konvajs/konva/tree/master/src/shapes) in the repo.



For a full list of attributes and methods, check out the [Konva.Shape documentation](/api/Konva.Shape.html)

{% iframe /downloads/code/shapes/Custom.html %}

{% include_code Konva Custom Demo shapes/Custom.html %}
