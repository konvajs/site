title: 移动端事件
---
我们可以用 `on()` 给节点绑定事件。`on()` 方法需要传入两个参数：事件类型、事件发生时执行的函数。

Konva 支持的移动端事件类型有 `touchstart`, `touchmove`, `touchend`, `tap`, `dbltap`, `dragstart`, `dragmove`, `dragend`。

复杂手势（例如：`rotate`）的实现，请查看 [手势 Demo](/docs/sandbox/Gestures.html)

*注意：因为下面例子使用了 touch events ，所以只能在 iOS 和 Android 设备查看。

说明: 手指滑过三角形会显示触摸点的坐标，手指按住圆形然后松开。

{% iframe /downloads/code/events/Mobile_Events.html %}

{% include_code Konva Mobile_Events Demo events/Mobile_Events.html %}
