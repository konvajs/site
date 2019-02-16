title: Text editing in HTML5 canvas with Konva
layout: demo_page
---

User can't directly edit `Konva.Text` content for [many reasons](https://www.w3.org/TR/2dcontext/#best-practices). In fact canvas API is not designed for such purpose.
It is possible to emulate text editing on canvas (by drawing blinking cursor, emulate selection, etc).
Konva has not support for such case. We recommend to edit the user input outside of your canvas.

It may be textarea somewhere in your page.

Here we will create two demos. Basic demo for basic understanding of the technic. And the more complex one, used in real-word app that cover more edge cases.

Instructions: Double click on text to edit it. Type something. Press Enter.

Simple demo:

{% iframe /downloads/code/sandbox/Editable_Text.html %}

{% include_code Konva 20000 Nodes Demo sandbox/Editable_Text.html %}

Complex demo:

{% iframe /downloads/code/sandbox/Complex_Editable_Text.html %}

<details><summary>Show source code!</summary>
<p>
{% include_code Canvas Scrolling Drag /downloads/code/sandbox/Complex_Editable_Text.html %}
</p>
</details>
