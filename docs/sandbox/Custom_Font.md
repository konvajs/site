title: How to use custom font for HTML5 canvas?
layout: demo_page
---

## How to draw external font on html5 canvas?

If you want to use custom font for `Konva.Text` you just need to:
1. Add font style to your page
2. Set `fontFamily` attribute to required font-face.

But there is one important thing here. When you set font for DOM elements (like `div` or `span`) browsers will automatically update that elements when font is loaded. But it doesn't work the same for canvas text. You need to redraw canvas again.

To detect that font is loaded you can use something like [FontObserver](https://fontfaceobserver.com/).

But for the demo I will use simpler font loading detection. It work ok for many fonts and much smaller in size.

Is even simpler solution you can redraw after delay with `setTimeout`, but it doesn't guarantee that font is loaded.

<!-- {% iframe /downloads/code/sandbox/Custom_Font.html %} -->

<!-- {% include_code Konva Custom Font sandbox/Custom_Font.html %} -->
