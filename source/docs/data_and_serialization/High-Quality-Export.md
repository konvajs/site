title: HTML5 Canvas Export to Hight Quality Image Tutorial
---

## How to get a better quality of an image on stage export?

If you need to export a stage to image or to base64 you can use `stage.toDataURL()` or `stage.toImage()` methods.

By default `Konva` exports into image with `pixelRatio = 1`. That means if you export stage with the size `500x500` you will have the image with the same size `500x500`.

But in some cases you may need an image with better quality or higher resolutions (or smaller). For instance you want to export something into image and then use that image on the canvas on HDPI devices (with high pixel ratio, like retina display). You can read more about `pixelRatio` here [MDN - devicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio). If you do this with default settings you will see blurred image.

Or you need to export user's drawing into computer with hight resolution. 

For that you can use:

```
stage.toDataURL({
  pixelRatio: 2 // or other value you need
})
```

In that case a stage with the size `500x500` will be exported into `1000x1000` image. Almost all nodes in `Konva` stored as vector data (except bitmap images and cached nodes). So you will have image with better quality.

**Usage: try to save stage as image. You will see that it have large resolution.**


{% iframe /cn.konvajs/downloads/code/data_and_serialization/High-Quality-Export.html %}

{% include_code Konva Pixel Ratio Demo data_and_serialization/High-Quality-Export.html %}
