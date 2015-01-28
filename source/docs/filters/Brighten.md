
#HTML5 Canvas Konva Brighten Image Tutorial

To apply filter to an `Konva.Image`, we have to cache it first with `cache()`
function. Then apply filter with `filter()` function.

To brighten or darken an image with Konva, we can use the `Konva.Filters.Brighten`
filter and set the brightness amount with the `brightness` property.
The `brightness` property can be set to any integer between -1 and 1.
Negative values darken the image, and positive values brighten the image.

Instructions: Slide the control to adjust the brightness

For all available filters go to [Filters Documentation](http://konva.github.io/api/Konva.Filters.html).

<a class="jsbin-embed" href="http://jsbin.com/qanur/1/embed?js,output">Konva Brighten Image Demo</a><script src="http://static.jsbin.com/js/embed.js"></script>