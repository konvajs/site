
#HTML5 Canvas Image Events with Konva

To only detect events for non transparent pixels in an image with Konva, we can use the `drawHitFromCache()` method to generate a more precise image hit region.
By default, events can be triggered for any pixel inside of an image, even if it's transparent.  The `drawHitFromCache()` method also accepts an optional callback method to be executed whenever the image hit region has been created.

*Note: The `drawHitFromCache()` method requires that the image is hosted on a web server with the same domain as the code executing it.*

Instructions: Mouse over the monkey and the lion and observe the mouseover event bindings.  Notice that the event is triggered for the monkey if you mouseover any portion of the image, including transparent pixels.  Since we created an image hit region for the lion, transparent pixels are ignored, which enables more precise event detection.

{% iframe /downloads/code/events/Image_Events.html %}

{% include_code Konva Image_Events Demo events/Image_Events.html %}