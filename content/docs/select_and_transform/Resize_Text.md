title: How to resize text on canvas?
---

### How to change width of the text with transforming tool?

Remember, that `Konva.Transformer` is changing `scaleX` and `scaleY` properties of a node.
If you want to change width of the text, without changing its size, you should reset scale of a text back to 1 and adjust `width` accordantly. 

You can use `transform` event to update text's properties as you need it.

Instructions: Try to resize a text.

<!-- {% iframe /downloads/code/select_and_transform/Resize_Text.html %} -->

<!-- {% include_code Konva Text resize Demo select_and_transform/Resize_Text.html %} -->