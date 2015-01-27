
#HTML5 Canvas Cancel Event Bubble Propagation with Konva

To cancel event bubble propagation with Konva, we can set the `cancelBubble`
property of the Event object to true.

Instructions: Click on the circle to observe that only the circle event binding
is handled because the event propagation was canceled when the circle event was triggered,
therefore preventing the event object from bubbling upwards.

<a class="jsbin-embed" href="http://jsbin.com/xazasa/1/embed?js,output">Konva Cancel Event Bubble Propagation  Demo</a><script src="http://static.jsbin.com/js/embed.js"></script>