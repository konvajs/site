title: HTML5 Canvas Custom Filter Tutorial - Border for Image around Non Transparent parts
---


## How do draw border around image with alpha channel?

This demo demonstrate how to use custom filters with Konva framework.

`Filter` is a function that have canvas ImageData as input and it should mutate it.

```javascript
function Filter(imageData) {
  // do something with image data
  imageData.data[0] = 0;
}
```

In this demo we will create custom filter that will draw solid border around image following its contour.
Since following contour is a complex thing we will use a hack. So we will use blurred shadow as a border foundation.
We will replace transparent/blurred pixels with our solid color that we want for border.

For all available filters go to [Filters Documentation](https://konvajs.github.io/api/Konva.Filters.html).

{% iframe /downloads/code/filters/Custom_Filter.html %}

{% include_code Konva Custom Filter Image Demo filters/Custom_Filter.html %}