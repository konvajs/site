title: 事件
---

我们可以用 `on()` 给节点绑定事件。`on()` 方法需要传入两个参数：事件类型、事件发生时执行的函数。

Konva 支持的事件类型有 `mouseover`, `mouseout`, `mouseenter`, `mouseleave`, `mousemove`, `mousedown`, `mouseup`, `wheel`, `click`, `dblclick`, `dragstart`, `dragmove`,`dragend`。

说明：尝试鼠标滑过下面的三角形和圆形看看。

{% iframe /downloads/code/events/Binding_Events.html %}

{% include_code Konva Binding_Events Demo events/Binding_Events.html %}
