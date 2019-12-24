title: How to show rich html on canvas with Konva
layout: demo_page
---

# How to show complex styles (like bold) and enable rich text editing features?

Canvas's text API is very limited. [Konva.Text](/docs/shapes/Text.html) allows you to add many different styles, support multiline text, etc. But at the current moment it has limitations. You can't use different styles for different parts of `Konva.Text`. For that case you have to use several `Konva.Text` instances.

If you want show complex styles on canvas we can do a hacky workaround. The idea is simple:

1. Create DOM element and put styled text in it
2. Convert DOM element into image with [html2canvas](https://html2canvas.hertzen.com/).
3. Use that image for `Konva.Image`.


Instructions: try to type a text into the editor

{% iframe /downloads/code/sandbox/Rich_Text.html %}

{% include_code Konva Rich Text Demo sandbox/Rich_Text.html %}
