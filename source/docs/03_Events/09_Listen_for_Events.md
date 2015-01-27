
#HTML5 Canvas Listen or Don’t Listen to Events with Konva

To listen or don't listen to events with Konva, we can set the listening
property of the config object to true or false when a shape is instantiated,
or we can set the listening property with the `setListening()` method.
Once we've set the listening property for one or more nodes, we'll also need
to redraw the hit graph for each affected layer with the `drawHit()` method.

Instructions: Mouseover the oval to observe that the event handler is not executed.
Click on "Listen" to start listening for events and observe that the event handler is now executed.

<a class="jsbin-embed" href="http://jsbin.com/vacero/1/embed?js,output">Konva Listen or Don’t Listen to Events Demo</a><script src="http://static.jsbin.com/js/embed.js"></script>