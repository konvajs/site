title: 取消事件冒泡
---

我们可以通过设置 Event 的 `cancelBubble` 属性为 true，来取消事件冒泡

说明：点击图中的圆，只有圆绑定的事件被执行，因为当圆绑定的事件被触发时事件传播被取消了，阻止了事件向上冒泡；

{% iframe /downloads/code/events/Cancel_Propagation.html %}

{% include_code Konva Cancel_Propagation Demo events/Cancel_Propagation.html %}
