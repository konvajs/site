title: Scaling image to fit a fixed area on canvas
layout: demo_page
---

## How to scale image to fit available area without its stretching?

The demo demonstrate how to use [`crop`](/api/Konva.Image.html#crop) property of `Konva.Image` to emulate `object-fit: cover` of CSS.

The [`crop`](https://konvajs.org/api/Konva.Image.html#crop) property allows you to use only specified area of source image to draw into the canvas. If you do the correct calculations, then resulted image can be drawing without and stretching.

**Instructions: try to resize an image or change crop strategy**.

{% iframe /downloads/code/sandbox/Scale_Image_To_Fit.html %}

{% include_code Konva Crop Image sandbox/Scale_Image_To_Fit.html %}
