title: HTML5 Canvas Blur Image Filter Tutorial
---

To apply filter to an `Konva.Image`, we have to cache it first with `cache()`
function. Then apply filter with `filter()` function.

To blur an image with Konva, we can use the `Konva.Filters.Blur` filter
and set the blur amount with the `blurRadius` property.

Instructions: Slide the control to adjust the blur radius.

For all available filters go to [Filters Documentation](/cn.konvajs/api/Konva.Filters.html).

{% iframe /cn.konvajs/downloads/code/filters/Blur.html %}

{% include_code Konva Blur Image Demo filters/Blur.html %}