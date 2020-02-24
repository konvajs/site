title: Border for Image around Non Transparent parts
---


## How do draw a stroke around image with alpha channel?

This demo demonstrate how to use custom filters with `Konva` framework.

For more information about custom filters take a look into [Custom Filter Tutorial](/docs/filters/Custom_Filter.html).

In this demo we will create custom filter that will draw solid border around image following its contour.
Since following contour is a complex thing we will use a hack. So we will use blurred shadow as a border foundation.
We will replace transparent/blurred pixels with our solid color that we want for border.

For all available filters go to [Filters Documentation](/api/Konva.Filters.html).

{% iframe /downloads/code/sandbox/Image_Border.html %}

{% include_code Konva Custom Filter Image Demo sandbox/Image_Border.html %}