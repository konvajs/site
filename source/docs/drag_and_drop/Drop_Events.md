title: HTML5 Canvas Drop Events
---

Konva does not support drop events. But you can write your own drop events detections.
To detect drop target shape you have to move dragging object into another layer.

In this example you can see implementation of `drop`, `dragenter`, `dragleave`, `dragover` events.

Instructions: drag one shape over another. Or drag and drop one shape into another.

{% iframe /cn.konvajs/downloads/code/drag_and_drop/Drop_Events.html %}

{% include_code Konva Drop Events Demo drag_and_drop/Drop_Events.html %}