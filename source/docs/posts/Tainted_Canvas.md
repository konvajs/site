title: Resolving "Tainted canvases may not be exported" with Konva
---


When you are trying to export a canvas you may have an error like:

> Unable to get data URL. Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.

> Unable to get image data from canvas because the canvas has been tainted by cross-origin data.

Or when you apply filters you can have this error:

> Unable to apply filter. Failed to execute 'getImageData' on 'CanvasRenderingContext2D': The canvas has been tainted by cross-origin data.

> Unable to apply filter. The operation is insecure.


## Why do we have that insecure error?

That is a [CORS error](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image). For security reasons, a browser can mark a canvas as tainted when you load images from another domain. In that case the browser blocks canvas exporting into `dataURL` or `imageData` (that is what we are doing on export or when filters are used).

## How to fix CORS issue?

First you may try to set `crossOrigin = Anonymous` attribute of the loading image. This approach will work only if requested domain has an `Access-Control-Allow-Origin` headers that allow shared requests.

```javascript
// 1
// native image loading:
const img = new Image();
img.onload = () => {
   // your code
};
img.crossOrigin = 'Anonymous';
img.src = url;

// 2
// you don't need to set that attribute if you use Konva.Image.fromURL API
// it sets Anonymous automatically
Konva.Image.fromURL(url, img => {
  layer.add(img);
});

// 3
// and if you use use-image hook for react-konva
const MyImage = ({ url }) => {
  const [image] = useImage(url, 'Anonymous');
  return <Image image={image} />;
}
```

**But it may not work for all cases. If it doesn't work, then you have to find a way to store images somewhere else. Like your own domain or a hosting that allows CORS requests.**



