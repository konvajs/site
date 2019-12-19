title: HTML5 Canvas Event Delegation with Konva
---

To get the event target with Konva, we can access the `target` property
of the Event object.  This is particularly useful when using event delegation,
in which we can bind an event handler to a parent node, and listen to events
that occur on its children.

Instructions: Click on the star and observe that the layer event binding
correctly identifies the shape that was clicked on.

{% iframe /cn.konvajs/downloads/code/events/Event_Delegation.html %}

{% include_code Konva Event_Delegation Demo events/Event_Delegation.html %}
