title: HTML5 Canvas Keyboard events with Konva
---

## HTML5 Canvas Keyboard events with Konva

There are no build-in keyboards events like `keydown` or `keyup` in Konva.

### But how to listen keydown or keyup events on canvas?

You can easily add them by two ways:

1. Listen global events on `window` object
2. Or make stage container focusable with `tabIndex` property and listen events on it.

Instructions: click on stage to focus it, move a shape with arrows

{% iframe /cn.konvajs/downloads/code/events/Keyboard_Events.html %}

{% include_code HTML5 Canvas Keyboard events events/Keyboard_Events.html %}
