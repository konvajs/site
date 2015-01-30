
#HTML5 Canvas Remove Event Listener by Name with Konva

To remove an event listener by name with Konva,
we can namespace the event type with the `on()` method so that we can later
remove the event listener by the same namespace with the `off()` method.

Instructions: Click on the circle to see two alerts triggered from two different
onclick event bindings.  Remove the event listeners using the buttons to
the left, and again click on the circle to observe the new onclick bindings.

{% iframe /downloads/code/shapes/Remove_By_Name.html %}

{% include_code Konva Remove_By_Name Demo shapes/Remove_By_Name.html %}