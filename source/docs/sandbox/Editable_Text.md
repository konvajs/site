title: Text editing in HTML5 canvas with Konva
layout: demo_page
---

User can't directly edit `Konva.Text` content. In fact canvas API is not designed for such purpose.
It is possible to emulate text editing on canvas (by drawing blinking cursor, emulate selection, etc).
Konva has not support for such case. We recommend to edit the user input outside of your canvas.
It may be textarea somewhere in your page.

Instructions: Double click on text to edit it. Type something. Press Enter.

{% iframe /downloads/code/sandbox/Editable_Text.html %}

{% include_code Konva 20000 Nodes Demo sandbox/Editable_Text.html %}
