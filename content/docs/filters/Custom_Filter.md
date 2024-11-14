title: HTML5 Canvas Custom Filter Tutorial
---


## How apply custom filter for Konva nodes?

This demo demonstrate how to use custom filters with `Konva` framework.

`Filter` is a function that have canvas ImageData as input and it should mutate it.

```javascript
function Filter(imageData) {
  // do something with image data
  imageData.data[0] = 0;
}
```

For all available filters go to [Filters Documentation](/api/Konva.Filters.html).

Also take a look into [Image Border Demo](/docs/sandbox/Image_Border.html) for custom filter example.

**In this demo we will remove all transparency from the image.**.

<!-- {% iframe /downloads/code/filters/Custom_Filter.html %} -->

<!-- {% include_code Konva Custom Filter Image Demo filters/Custom_Filter.html %} -->
