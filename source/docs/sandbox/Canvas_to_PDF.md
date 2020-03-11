title: How to convert canvas to pdf
layout: demo_page
---

## Do you want to save Konva stage into a PDF file?

PDF is a complicated format. So we have to use an external library such as [jsPDF](https://parall.ax/products/jspdf).

The idea of saving canvas to pdf is simple:

1. Generate canvas content
2. Export canvas into the image
3. Add image into PDF document created with the PDF library
4. Save PDF file

Also I have two tips for you:

1. Thanks to [High quality Exports](/docs/data_and_serialization/High-Quality-Export.html), you can increase the quality of a PDF using `pixelRatio` attribute when you are converting a node into the image.

2. It is possible to make a text selectable in the PDF. Even if we are adding the canvas into the PDF as an image, we can insert texts manually. That is not trivial and it can be difficult if you have complex styles. Also text rendering on PDF is different from the text rendering with `Konva`. But we can try to make it as close as possible. For the demo, we will draw "hidden" text inside PDF file. The text will be places under the image, so it is no visible. But it is still selectable. As a demo of "complex styles" I will blur the text.

**Instructions: take a look into the canvas. Then try to save it as PDF.**

{% iframe /downloads/code/sandbox/Canvas_to_PDF.html %}

{% include_code Konva PDF demo sandbox/Canvas_to_PDF.html %}
