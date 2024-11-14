## title: Disable Listening Shapes Tip

You can set `listening(false)` to shape to remove it from hit graph. It means that shape will be invisible for hit detection (while visible on the canvas), so they never trigger any interactions with mouse or touch. Also such nodes will be ignored in `container.getIntersection()` and `container.getAllIntersections()` methods.

Setting `listening(false)` to nodes will increase performance.

For example we have a button (group) with rectangle and text. We need to listen click on button.
It this case we can remove text from hit graph and listen click only from rectangle.

<!-- {% iframe /downloads/code/performance/Listening_False.html %}

{% include_code Konva Disable Listening Shapes Demo performance/Listening_False.html %} -->
