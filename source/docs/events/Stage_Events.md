title: HTML5 Canvas Special Stage Events Konva
---

All events are starts from Shapes. So if you click on empty space on canvas `click` event will not trigger on `Layer`  BUT it will trigger on `Stage` object.

In some cases you may want to listen special "content" events. This events will be triggered for Stage container interactions (like mouse or touch events).

Supported content events:
contentMouseover, contentMousemove, contentMouseout, contentMousedown, contentMouseup, contentClick, contentDblclick, contentTouchstart, contentTouchmove, contentTouchend, contentTap, contentDblTap

{% iframe /downloads/code/events/Stage_Events.html %}

{% include_code Konva Stage Events Demo events/Stage_Events.html %}
