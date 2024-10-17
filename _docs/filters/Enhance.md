title: HTML5 Canvas Enhance Image Filter Tutorial
---

To apply filter to an `Konva.Image`, we have to cache it first with `cache()`
function. Then apply filter with `filters()` function.

To enhance an image with Konva, we can use the `Konva.Filters.Enhance` filter
and set the enhance amount with the `enhance` property.

Instructions: Slide the control to adjust the enhance value.

For all available filters go to [Filters Documentation](/api/Konva.Filters.html).

{% iframe /downloads/code/filters/Enhance.html %}

{% include_code Konva Enhance Image Demo filters/Enhance.html %}