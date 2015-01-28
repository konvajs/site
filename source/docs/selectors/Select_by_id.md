
#HTML5 Canvas Select Shape by Id with Konva

To select a shape by id with Konva, we can use the `find()` method using the # selector.
The `find()` method always returns an array of elements, even if we are expecting it to return one element.
if you need only one element you can use `findOne()` method.
The `find()` method works for any node, including the stage, layers, groups, and shapes.

Instructions: press the "Activate Rectangle" button to select the rectangle by id and perform a transition.  You can also drag and drop the rectangle.

<a class="jsbin-embed" href="http://jsbin.com/garuki/1/embed?js,output">Konva Select Shape by Id Demo</a><script src="http://static.jsbin.com/js/embed.js"></script>
