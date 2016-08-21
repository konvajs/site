title: HTML5 Canvas Special Stage Events Konva
---

All events are starts from Shapes. So if you click on empty space on canvas `click` event will no trigger on `Layer` and even no trigger on `Stage` objects. But if you really need to listen `click` (or any other similar event) on `Konva.Stage` on empty space you can:
1. Create transparent rectange with the same size as Stage and add to to bottom of your shapes.
2. Or listen special "content" events.

Supported content events:
contentMouseover, contentMousemove, contentMouseout, contentMousedown, contentMouseup, contentClick, contentDblclick, contentTouchstart, contentTouchmove, contentTouchend, contentTap, contentDblTap

Instruction: click everywhere. see console.

{% iframe /downloads/code/events/Stage_Events.html %}

{% include_code Konva Stage Events Demo events/Stage_Events.html %}
