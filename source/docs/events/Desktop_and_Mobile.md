title: 桌面/移动端事件支持
---

我们可以使用 `on()` 方法给图形添加桌面/移动端事件。例如：我们可以使用 "mousedown touchstart" 的事件组合，同时在桌面端和移动端绑定mousedown事件，同理 mouseup 可以使用 "mouseup touchend" 事件组合，双击可以使用 "dblclick dbltap" 事件组合。

说明：观察 mousedown、mouseup、touchstart、touchend 事件在桌面端和移动端的执行情况。

{% iframe /downloads/code/events/Desktop_and_Mobile.html %}

{% include_code Konva Desktop_and_Mobile Demo events/Desktop_and_Mobile.html %}
