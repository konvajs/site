title: HTML5 Canvas Drag and Drop the Stage
---

To drag and drop a stage with Konva, we can set the `draggable` property
of the config object to `true` when the group is instantiated, or we can use the `draggable()` method.

Unlike drag and drop for other nodes, such as shapes, groups, and layers,
we can drag the entire stage by dragging any portion of the stage.

{% iframe /downloads/code/drag_and_drop/Drag_a_Stage.html %}

{% include_code Konva Drag and Drop the Stage Demo drag_and_drop/Drag_a_Stage.html %}