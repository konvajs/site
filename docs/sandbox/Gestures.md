title: Gesture Events on Canvas Shapes
layout: demo_page
---

## How to listen to swipe, pinch zoom, rotate and other multi-touch gesture events on canvas shapes?

By default `Konva` supports only basic touch events such as `touchstart`, `touchmove`, `touchend`.

You have to implement gesture events manually from that touch events.

If you are looking for pan and zoom logic for the whole stage take a look into [Multi-touch scale Stage demo](/docs/sandbox/Multi-touch_Scale_Stage.html).

But I was able to slightly change [Hammer.js](https://hammerjs.github.io/) to make it work with Konva!


You can find modified [hammer.js source code here](/js/hammer-konva.js).

Instructions: you can try different gestures on the rectangle such as swipe, rotate, zoom, drag&drop, press.

For desktop browsers you can hold `Shift` key to emulate touch events.

**Note: this demo is experimental.**


<!-- {% iframe /downloads/code/sandbox/Gestures.html %} -->

<!-- {% include_code Konva Touch Gestures Demo sandbox/Gestures.html %} -->
