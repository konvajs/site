title: Text editing in HTML5 canvas with Konva
layout: demo_page
---

User can't directly edit `Konva.Text` content for [many reasons](https://www.w3.org/TR/2dcontext/#best-practices). In fact canvas API is not designed for such purpose.
It is possible to emulate text editing on canvas (by drawing blinking cursor, emulate selection, etc).
Konva has not support for such case. We recommend to edit the user input outside of your canvas with native DOM elements such as `input` or `textarea`.

Here we will create two demos. Basic demo for general understanding of the technic. And the more complex one, used in real-word app that cover more edge cases.

If you want to enable full rich text editing features see [Rich Text Demo](/docs/sandbox/Rich_Text.html).

Instructions: Double click on text to edit it. Type something. Press Enter.

Simple demo:

<!-- {% iframe /downloads/code/sandbox/Editable_Text.html %} -->

<!-- <details><summary>Show source code of simple demo!</summary>
<p>
{% include_code Konva Editable text Demo sandbox/Editable_Text.html %}
</p>
</details> -->

Complex demo:

<!-- {% iframe /downloads/code/sandbox/Complex_Editable_Text.html %} -->

<!-- <details><summary>Show source code of complex demo!</summary>
<p>
{% include_code Canvas Complex Text Demo sandbox/Complex_Editable_Text.html %}
</p>
</details> -->
