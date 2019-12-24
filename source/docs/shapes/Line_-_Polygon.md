title: Polygon 多边形

---

我们可以通过实例化一个 `Konva.Line()` 对象创建多边形，并且设置属性 `closed = true`。

我们使用 `points` 属性创建线的路径，如果线包含三个点（坐标：`x`, `y`），你需要这样定义 `points` 属性: `[x1, y1, x2, y2, x3, y3]`。

之所以使用简单的一维数字数组，因为相对于对象（例如： [{x: 0, y: 0}, {x: 0, y: 0}]）运行起来更快而且需要的内存也更少。

点击 [Konva.Line documentation](/api/Konva.Line.html) 查看详细属性和方法说明。

{% iframe /downloads/code/shapes/Line_-_Polygon.html %}d

{% include_code Konva Polygon Demo shapes/Line_-_Polygon.html %}
