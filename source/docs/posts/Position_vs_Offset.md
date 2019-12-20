title: 定位 (Position)  和 偏移 (Offset) 的区别
---

定位和偏移有许多相似的属性，看起来容易混淆，但是它们对图形有不同的影响和作用。

本文将来解释定位 (x and y coordinates) 和 偏移 (offsetX and offsetY) 的区别。

属性 x 和 y 定义了节点在画布的位置，如果你设置了 `draggable = true` 并且开始拖拽，Konva 将修改节点的 x 和 y 属性，这个逻辑适用于所有节点（包括 Konva.Line）。

矩形的定位原点定义在它的左上角，圆形的定位远点在它的圆心。

{% iframe /cn.konvajs/downloads/code/posts/Position_vs_Offset_Basic_x_y.html %}


## 为什么我们还需要偏移这个属性？

当你修改偏移属性时看起来和修改位置效果时一样的，但是实际上你在修改图形的原点。

什么时原点呢，你可以把它当作“绘制图形的起始点”或者“图形的中心”或者“旋转图形时的轴点”。

Konva 曾经把偏移 (offset) 叫做中心 (center), 这个 center 源于 KineticJS 项目。后来重构以后就改成偏移了。

请看这个例子 [animation tutorial](/cn.konvajs/docs/animations/Rotation.html)，所有矩形的位置 `y` 都是相同的，但是偏移都不一样。

{% iframe /cn.konvajs/downloads/code/animations/Rotation.html %}

Konva 有两种主要的方法定义图形的原点，类似圆形的图形 (Circle, Ellipse, Wedge, Star, Ring 等等) 的原点在它们的中心，当你设置圆形的 {x, y} 时实际上就是设置的它们中心的位置。
类似矩形的图形 (Rectangle, Sprite, Text, Image 等等)，当你设置图形的 {x, y} 时实际上时设置的它们左上角的位置。

一个图形将围绕它的原点旋转，因此你设置星形旋转45度，它将绕着它的中心旋转。

如果你让一个矩形旋转45度，它将绕着左上角旋转。但是有些需求实现起来就不太方便了，比方说你想绕着它的中心旋转，这时你就可以设置 `offset` 属性，它将告诉 Konva 将这个位置作为图形新的原点。

## 怎么去设置图形的旋转点

现在假设你绘制了一个 100x100 的矩形，位置坐标 `x = 0, y = 0`，然后你想让它绕着中心旋转。如果你没有使用偏移，你得先重新计算它的位置 （需要用到你在学校学过的三角函数）。

你可能要这样计算:

```javascript
const rotatePoint = ({ x, y }, rad) => {
  const rcos = Math.cos(rad);
  const rsin = Math.sin(rad);
  return { x: x * rcos - y * rsin, y: y * rcos + x * rsin };
};

// will work for shapes with top-left origin, like rectangle
function rotateAroundCenter(node, rotation) {
  //current rotation origin (0, 0) relative to desired origin - center (node.width()/2, node.height()/2)
  const topLeft = { x: -node.width() / 2, y: -node.height() / 2 };
  const current = rotatePoint(topLeft, Konva.getAngle(node.rotation()));
  const rotated = rotatePoint(topLeft, Konva.getAngle(rotation));
  const dx = rotated.x - current.x,
    dy = rotated.y - current.y;

  node.rotation(rotation);
  node.x(node.x() + dx);
  node.y(node.y() + dy);
}

// then use it
rotateAroundCenter(rect, 180);
```

或者你只需设置 `offsetX = width / 2` and `offsetY = height / 2`，但是矩形得位置会发生偏移（因为原点发生了变换），所以你要重新校准位置。

Still have a question? Ask in comments.