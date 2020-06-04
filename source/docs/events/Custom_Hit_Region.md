title: 自定义事件监听范围
---

我们可以使用 `hitFunc` 和 `hitStrokeWidth` 改变事件响应区域

## 1. 什么是 `hitFunc`?

我们可以通过设置 `hitFunc` 属性来创建一个定义事件响应区域函数。Konva 通过这个函数绘制一个区域用于监听事件被响应。使用自定义的函数的好处有很多，比方说：扩大一个图形交互的响应区域、让一个图形的局部相应事件而其它部分不能、或者运用简单的函数提高渲染性能。

查看自定义 `sceneFunc` 的[最佳实践](/docs/shapes/Custom.html) 同样也适用于 `hitFunc`。

`hitFunc` 包含两个入参：[Konva.Context](/api/Konva.Context.html) 和 图形的实例。

通过 `hitFunc` 你可以完全掌控响应区域的绘制。

## 2. 什么是 `hitStrokeWidth`?

对于某些图形，像 `Konva.Line` 重写它的 `hitFunc` 会比较困难。某些情况下你仅仅知识像让事件响应的区域更粗一点。
这种情况更适合使用 `hitStrokeWidth`。

说明：尝试鼠标 mouseover, mouseout, mousedown, 和 mouseup 图形，观察响应区域已经超过了图形范围；

Also you can toggle hit canvas too see how it looks. It may be useful for debugging.


{% iframe /downloads/code/events/Custom_Hit_Region.html %}

{% include_code Konva Custom_Hit_Region Demo events/Custom_Hit_Region.html %}
