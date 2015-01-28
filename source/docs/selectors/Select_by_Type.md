
#HTML5 Canvas Select Shapes by Type or Class Name with Konva

To select shapes by name with Konva, we can use the `find()` method with the name of the type or class name.
The `find()` method returns an array of nodes that match the selector string.
The return array is a `Konva.Collection` array, which is basically a typical JavaScript array with a special `each()` method.
The `each()` method enables us to quickly iterate through every node in the array.

<a class="jsbin-embed" href="http://jsbin.com/yicob/1/embed?js,output">Konva Select Shape by Type Demo</a><script src="http://static.jsbin.com/js/embed.js"></script>
