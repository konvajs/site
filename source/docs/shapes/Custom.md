title: 自定义图形
---

我们可以通过实例化一个 `Konva.Shape()` 对象创建自定义图形。

当创建自定义图形时，我们需要定义一个绘图方法，绘图函数包含两个入参 [Konva.Context](/api/Konva.Context.html) 和 shape 实例：

```javascript
var rect = new Konva.Shape({
  x: 10,
  y: 20,
  fill: '#00D2FF',
  width: 100,
  height: 50,
  sceneFunc: function (context, shape) {
    context.beginPath();
    // 不用设置rect的位置，框架会自动处理
    context.rect(0, 0, shape.getAttr('width'), shape.getAttr('height'));
    // Konva 扩展的一个非常重要的方法
    // 绘制设置的样式
    context.fillStrokeShape(shape);
  }
});
```

`Konva.Context` 是对原生 2d canvas context 的包装，它除了和原生 context 有相同的属性和方法外还增加了一些额外的 API。

我们可以通过 `Konva.Context` 使用 HTML5 Canvas context，还可以使用一些特殊的方法，例如：使用 `context.fillStrokeShape(shape)` 自动填充、描边、添加阴影。这里提供了两个方法来绘制自定义图形：`sceneFunc` 和 `hitFunc`。

`sceneFunc` 用来定义图形可视的外观，`Konva` 使用 `sceneFunc` 绘制用于图形事件检测的图像。因此通常你只需要定义 `sceneFunc`。如果你想自己定义事件检测，请查看 [Custom Hit Region demo](/docs/events/Custom_Hit_Region.html)。

### 关于 `sceneFunc` 和 `hitFunc` 的最佳实践:

1. 因为这个方法每秒钟会调用很多次，所以优化很重要。在方法里不要创建 Image (`document.createElement('image')` or `new window.Image()`) 或者其它大型对象。

2. 方法里面不应该包含一些副作用，像移动图形，绑定事件或者改变应用状态等等。

3. 如果你想要手动添加复杂的样式或者绘制图片，记得定义自定义 `hitFunc`。

4. 在 `sceneFunc` 里不要手动改变图形位置或者缩放图形，因为只要你设置图形相关属性 `Konva` 将自动处理，例如： `shape.x(10)`。

5. 尽可能不要在 `sceneFunc` 里面手动添加样式，你只需要绘制一些路径，然后使用 `context.fillStrokeShape(shape)` 处理样式问题。

6. 更多示例请查看 [Konva core shapes implementations](https://github.com/konvajs/konva/tree/master/src/shapes)。

点击 [Konva.Shape documentation](/api/Konva.Shape.html) 查看详细属性和方法说明。

{% iframe /downloads/code/shapes/Custom.html %}

{% include_code Konva Custom Demo shapes/Custom.html %}
