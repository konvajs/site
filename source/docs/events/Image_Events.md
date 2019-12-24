title: 图片事件
---

## 图片事件

如果只需要检测图片非透明像素区域触发的事件，我们可以使用 `drawHitFromCache()` 方法生成一个精确的事件检测区域。默认情况下图片的任何像素都会促发事件，也包括透明的像素。`drawHitFromCache()` 方法可以传入一个回调函数，当检测区域被创建后会执行这个函数。

*注意：`drawHitFromCache()` 方法需要图片和当前执行的代码在同一个域下。

说明：鼠标滑过猴子和狮子图片，观察 mouseover 事件的绑定。你可以发现在猴子图片上，所有区域包括透明像素都触发了事件。而狮子图片我们创建了一个事件检测区域，忽略了透明像素，因此事件检测可以精确到非透明像素。

{% iframe /downloads/code/events/Image_Events.html %}

{% include_code Konva Image_Events Demo events/Image_Events.html %}
