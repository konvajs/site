title: HTML5 Canvas Special Stage Events Konva
---

All events are started from Shapes. So if you click on an empty space within a canvas, a `click` event will not trigger on `Layer`  BUT it will trigger on the `Stage` object instead.

In some cases you may want to listen special "content" events. These events will be triggered for Stage container interactions (like mouse or touch events).

Supported content events:
contentMouseover, contentMousemove, contentMouseout, contentMousedown, contentMouseup, contentClick, contentDblclick, contentTouchstart, contentTouchmove, contentTouchend, contentTap, contentDblTap

{% iframe /downloads/code/events/Stage_Events.html %}

{% include_code Konva Stage Events Demo events/Stage_Events.html %}
