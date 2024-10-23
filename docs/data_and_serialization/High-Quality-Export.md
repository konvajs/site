title: HTML5 Canvas Export to High Quality Image Tutorial
---

## How to export a high quality image from a stage?

If you need to export a stage as an image or as base64 then you can use the `stage.toDataURL()` or `stage.toImage()` methods.

By default in `Konva`, exported images have the `pixelRatio` attribute set to `1`. This means that if you export a stage with a size of `500x500`, then the exported image will have the same size of `500x500`.

In some cases you may want to export an image that is more suited to higher (or even smaller) resolutions. For instance, you may wish to export something as an image and then use that image on a canvas on HDPI devices (with a high pixel ratio, like a retina display). Another scenario may be that you need to export a user's drawing onto a computer running a high resolution.

If you were to do this with the default settings, then you would see a blurred image. You can read more about the global `pixelRatio` attribute here [MDN - devicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio). 

For both of these use cases, you can use:

```
stage.toDataURL({
  pixelRatio: 2 // or other value you need
})
```

Now, a stage with a size of `500x500` would be exported as an image with a size of `1000x1000`. Almost all nodes in `Konva` are stored as vector data, apart from bitmap images and cached nodes. This results in a high quality exported image.

**Usage: try to save stage as an image. You will see that it has a high resolution.**


<!-- {% iframe /downloads/code/data_and_serialization/High-Quality-Export.html %} -->

<!-- {% include_code Konva Pixel Ratio Demo data_and_serialization/High-Quality-Export.html %} -->
