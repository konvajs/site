title: 移动端的滚动和原生事件
---

为了防止拖放图形时发送意外页面滚动，Konva 默认禁止了所有与舞台交互的浏览器默认行为。如果你想保持浏览器的默认行为，可以给图形设置 `preventDefault = false`。 

说明： 如果你在移动设备上查看，你可以分别在两个矩形上滑动手指试试滚动页面看看。在绿色矩形上面页面不会滚动，红色的页面会发生滚动。

{% iframe /downloads/code/events/Mobile_Scrolling.html %}

{% include_code Konva Mobile Scrolling Demo events/Mobile_Scrolling.html %}
