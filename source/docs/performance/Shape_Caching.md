
#HTML5 Canvas Konva Batch Draw

In some situations, we may want to update a Konva shape as fast as possible,
but without causing too many redraws.  For example, if we want to update an
element on the stage via mousemove, we don't want to redraw the layer with the
`draw()` method, because the mousemove event could be fired hundreds of times per
second, which would result in a forced frame rate of over a hundred frames per second.
Often times this can cause jumpy animations because browsers simply can't handle excessive redraws.

For situations like this, it's much better to use the `batchDraw()` method
which automatically hooks redraws into the Konva animation engine.
No matter how many times you call `batchDraw()`, Konva will automatically
limit the number of redraws per second based on the maximum number of frames
per second that the browser can handle at any given point in time.

Instructions: Move your mouse over the stage to spin the rectangle

<a class="jsbin-embed" href="http://jsbin.com/somaqa/1/embed?js,output">Konva Batch Draw Demo</a><script src="http://static.jsbin.com/js/embed.js"></script>
